"use server";
import { and, count, eq, not, sql } from "drizzle-orm";
import { db } from "..";
import { fileEntries, fileRelations, projects, ProjectsType } from "../schema";

export interface ProjectMetaType extends ProjectsType {
  filesInProject: number;
  relationsInProject: number;
}

export async function getProjectMeta(projectId: number) {
  const fileEntriesMeta = await db
    .select({
      filesAmount: count().as("filesAmount"),
    })
    .from(fileEntries)
    .where(
      and(eq(fileEntries.projectId, projectId), not(eq(fileEntries.status, 4)))
    )
    .as("fileEntriesMeta");
  const fileRelationsMeta = await db
    .select({
      relAmount: count().as("relAmount"),
    })
    .from(fileRelations)
    .where(eq(fileRelations.projectId, projectId))
    .as("fileRelationsMeta");

  const projectMeta = await db
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
    .leftJoin(fileEntriesMeta, eq(projects.id, projectId))
    .leftJoin(fileRelationsMeta, eq(projects.id, projectId));

  return projectMeta[0];
}
