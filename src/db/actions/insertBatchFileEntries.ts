"use server";

import { db } from "..";
import { fileEntries } from "../schema";
import { v4 as uuidv4 } from "uuid";

export async function insertBatchFileEntries(
  projectId: number,
  fileArr: string[]
) {
  const newFileEntriesArr = fileArr.map((file) => ({
    guid: uuidv4(),
    filePath: file,
    projectId: projectId,
  }));
  await db.insert(fileEntries).values(newFileEntriesArr);
}
