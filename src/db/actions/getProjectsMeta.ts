"use server";
import { count, eq, sql } from "drizzle-orm";
import { db } from "..";
import { fileEntries, fileRelations, projects } from "../schema";
import { ProjectMetaType } from "./getProjectMeta";

export async function getProjectsMeta(): Promise<ProjectMetaType[]> {
  const fileEntriesMeta = await db
    .select({
      projectId: fileEntries.projectId,
      filesAmount: count().as("filesAmount"),
    })
    .from(fileEntries)
    .as("fileEntriesMeta");
  const fileRelationsMeta = await db
    .select({
      projectId: fileRelations.projectId,
      relAmount: count().as("relAmount"),
    })
    .from(fileRelations)
    .as("fileRelationsMeta");

  return await db
    .select({
      id: projects.id,
      name: projects.name,
      projectPath: projects.projectPath,
      filesInProject:
        sql<number>`COALESCE(${fileEntriesMeta.filesAmount},0)`.as(
          "filesAmount"
        ),
      relationsInProject:
        sql<number>`COALESCE(${fileRelationsMeta.relAmount},0)`.as("relAmount"),
    })
    .from(projects)
    .leftJoin(fileEntriesMeta, eq(projects.id, fileEntriesMeta.projectId))
    .leftJoin(fileRelationsMeta, eq(projects.id, fileRelationsMeta.projectId));
}
