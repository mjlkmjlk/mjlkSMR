"use server";
import { sql } from "drizzle-orm";
import { db } from "..";

export type FetchFilePairsReturnType = {
  key1: number;
  key2: number;
  file1: string;
  file2: string;
};
export async function fetchFilePairs(
  projectId: number,
  amount: number = 100
): Promise<FetchFilePairsReturnType[]> {
  // STEP 0: Clean up any prior temp tables
  await db.run(sql`DROP TABLE IF EXISTS KeyUsage;`);
  await db.run(sql`DROP TABLE IF EXISTS MinUsage;`);
  await db.run(sql`DROP TABLE IF EXISTS LeastUsedKeys;`);
  await db.run(sql`DROP TABLE IF EXISTS LeastUsedPairs;`);

  // STEP 1: Build usage count per file entry (in project)
  await db.run(sql`
    CREATE TEMP TABLE KeyUsage AS
      SELECT fe.id, fe.file_path,
             COALESCE(u.count, 0) AS usage_count
      FROM tFileEntries fe
      LEFT JOIN (
        SELECT key, COUNT(*) AS count
        FROM (
          SELECT key1 AS key FROM tFileRelations WHERE project_id = ${projectId}
          UNION ALL
          SELECT key2 AS key FROM tFileRelations WHERE project_id = ${projectId}
        )
        GROUP BY key
      ) u ON fe.id = u.key
      WHERE fe.project_id = ${projectId} AND fe.status != 4;
  `);

  //const selKeyUsage = await db.all(sql`SELECT * FROM KeyUsage;`);
  //console.log("KeyUsage", selKeyUsage);

  // STEP 2: Find the minimum usage count
  await db.run(sql`
    CREATE TEMP TABLE MinUsage AS
      SELECT MIN(usage_count) AS min_usage
      FROM KeyUsage;
  `);
  //const selMinUsage = await db.all(sql`SELECT * FROM MinUsage;`);
  //console.log("MinUsage", selMinUsage);

  // STEP 3: Select only least-used keys
  /*CREATE TEMP TABLE LeastUsedKeys AS
      SELECT id, file_path, usage_count
      FROM KeyUsage
      WHERE usage_count = (SELECT min_usage FROM MinUsage); */
  await db.run(sql`
    CREATE TEMP TABLE LeastUsedKeys AS
      SELECT id, file_path, usage_count
      FROM KeyUsage
      ORDER BY usage_count;
  `);
  //const selLeastUsedKeys = await db.all(sql`SELECT * FROM LeastUsedKeys;`);
  //console.log("LeastUsedKeys", selLeastUsedKeys);

  // STEP 4: Generate all unique key pairs within project
  await db.run(sql`
    CREATE TEMP TABLE LeastUsedPairs AS
      SELECT k1.id AS key1, k2.id AS key2, k1.file_path as file1, k2.file_path as file2
      FROM LeastUsedKeys k1
      JOIN LeastUsedKeys k2 ON k1.id < k2.id;
   
  `); // LIMIT ${amount};
  //const selLeastUsedPairs = await db.all(sql`SELECT * FROM LeastUsedPairs;`);
  //console.log("LeastUsedPairs", selLeastUsedPairs.length);

  // STEP 5: Remove any pairs that already exist in TFileRelation
  await db.run(sql`
    DELETE FROM LeastUsedPairs
    WHERE EXISTS (
      SELECT ${projectId}
      FROM tFileRelations r
      WHERE r.project_id = ${projectId}
        AND ((r.key1 = LeastUsedPairs.key1 AND r.key2 = LeastUsedPairs.key2)
          OR (r.key1 = LeastUsedPairs.key2 AND r.key2 = LeastUsedPairs.key1))
    );
  `);
  //const selLeastUsedPairs2 = await db.all(sql`SELECT * FROM LeastUsedPairs;`);
  //console.log("LeastUsedPairs2", selLeastUsedPairs2);

  // STEP 6: Select N random pairs
  const result: FetchFilePairsReturnType[] = await db.all(sql`
    SELECT key1, key2, file1, file2
    FROM LeastUsedPairs
    ORDER BY RANDOM()
    LIMIT ${amount};
  `);
  //console.log("result", result);

  // STEP 7: Cleanup just to be sure - Duplicate of Step 0
  /*  await db.run(sql`DROP TABLE IF EXISTS KeyUsage;`);
  await db.run(sql`DROP TABLE IF EXISTS MinUsage;`);
  await db.run(sql`DROP TABLE IF EXISTS LeastUsedKeys;`);
  await db.run(sql`DROP TABLE IF EXISTS LeastUsedPairs;`);
 */
  return result;
}
