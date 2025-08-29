"use server";
import { and, eq, getTableColumns, or } from "drizzle-orm";
import { db } from "..";
import { fileEntries, fileRelations, FileRelationsType } from "../schema";

export interface FileRelationEntry extends FileRelationsType {
  fileId: number;
  filePath: string;
}
export type GetFileMetaReturnType = {
  relCount: number;
  wins: FileRelationEntry[];
  losses: FileRelationEntry[];
};

export async function getFileMeta(
  projectId: number,
  fileId: number
): Promise<GetFileMetaReturnType> {
  const fileRels: FileRelationEntry[] = await db
    .select({
      ...getTableColumns(fileRelations),
      fileId: fileEntries.id,
      filePath: fileEntries.filePath,
    })
    .from(fileRelations)
    .where(
      and(
        eq(fileRelations.projectId, projectId),
        or(eq(fileRelations.key1, fileId), eq(fileRelations.key2, fileId))
      )
    )
    .innerJoin(
      fileEntries,
      or(
        and(
          eq(fileRelations.key1, fileId),
          eq(fileRelations.key2, fileEntries.id)
        ),
        and(
          eq(fileRelations.key2, fileId),
          eq(fileRelations.key1, fileEntries.id)
        )
      )
    );
  const wins: typeof fileRels = [];
  const losses: typeof fileRels = [];

  fileRels.forEach((row) => {
    const didWin =
      (row.key1 === fileId && row.result === 1) ||
      (row.key2 === fileId && row.result === 2);
    if (didWin) {
      wins.push(row);
    } else {
      losses.push(row);
    }
  });

  return {
    relCount: fileRels.length,
    wins: wins,
    losses: losses,
  };
}
