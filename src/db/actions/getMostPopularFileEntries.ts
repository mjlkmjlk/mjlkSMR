"use server";
import { and, asc, desc, eq, not, or, sql } from "drizzle-orm";
import { db } from "..";
import { fileEntries, fileRelations } from "../schema";

export type FileListItemType = {
  id: number;
  filePath: string;
  wins: number;
  totals: number;
  ratio: number;
  status: number;
};
export async function getMostPopularFileEntries({
  projectId,
  order = "DESC",
  deleted,
}: {
  projectId: number;
  order?: "ASC" | "DESC";
  deleted?: boolean;
}): Promise<FileListItemType[]> {
  const fileStats = db.$with("fileStats").as(
    db
      .select({
        id: fileEntries.id,
        filePath: fileEntries.filePath,
        status: fileEntries.status,
        wins: sql<number>`
        count(
          case 
            when ${fileRelations.key1} = ${fileEntries.id} and ${fileRelations.result} = 1 
              then 1
            when ${fileRelations.key2} = ${fileEntries.id} and ${fileRelations.result} = 2 
              then 1
            else null
          end
        )
      `.as("wins"),
        totals: sql<number>`
        count(
          case 
            when ${fileRelations.key1} = ${fileEntries.id} 
              then 1
            when ${fileRelations.key2} = ${fileEntries.id} 
              then 1
            else null
          end
        )
      `.as("totals"),
      })
      .from(fileEntries)
      .where(
        and(
          eq(fileEntries.projectId, projectId),
          deleted ? eq(fileEntries.status, 4) : not(eq(fileEntries.status, 4))
        )
      )
      .leftJoin(
        fileRelations,
        or(
          eq(fileRelations.key1, fileEntries.id),
          eq(fileRelations.key2, fileEntries.id)
        )
      )

      .groupBy(fileEntries.id, fileEntries.filePath)
  );
  const result = await db
    .with(fileStats)
    .select({
      id: fileStats.id,
      filePath: fileStats.filePath,
      status: fileStats.status,
      wins: fileStats.wins,
      totals: fileStats.totals,
      ratio: sql<number>`
      nullif(${fileStats.wins}, 0) / cast(${fileStats.totals} as float)
    `.as("ratio"),
    })
    .from(fileStats)
    .orderBy(
      order === "ASC"
        ? asc(sql.identifier("ratio"))
        : desc(sql.identifier("ratio"))
    )
    .limit(100)
    .all();

  return result;
}
