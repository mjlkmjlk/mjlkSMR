"use server";
import { db } from "..";
import { fileRelations, FileRelationsType } from "../schema";

export async function voteForEntry({
  projectId,
  key1,
  key2,
  result,
}: FileRelationsType) {
  const newRelation: FileRelationsType = {
    key1,
    key2,
    result,
    projectId,
  };

  await db
    .insert(fileRelations)
    .values(newRelation)
    .onConflictDoUpdate({
      target: [fileRelations.key1, fileRelations.key2],
      set: {
        result: newRelation.result,
      },
    })
    .run();
}
