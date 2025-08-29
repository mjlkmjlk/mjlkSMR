"use server";
import { eq, getTableColumns } from "drizzle-orm";
import { db } from "..";
import { fileEntries, projects } from "../schema";
import { moveFileIntoDeleted } from "@/actions/fileActions";

export default async function deleteFileEntry(id: number) {
  console.log("id", id);

  const fileData = await db
    .select({
      ...getTableColumns(fileEntries),
      ...getTableColumns(projects),
    })
    .from(fileEntries)
    .where(eq(fileEntries.id, id))
    .innerJoin(projects, eq(fileEntries.projectId, projects.id));
  console.log("fileData", fileData);

  if (fileData?.[0]) {
    const fileMove = await moveFileIntoDeleted(
      fileData[0].projectPath,
      fileData[0].filePath
    );
    if (fileMove === true) {
      await db.delete(fileEntries).where(eq(fileEntries.id, id)).run();
    }
  }
}
