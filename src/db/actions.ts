"use server";

import { eq } from "drizzle-orm";
import { db } from ".";
import { fileEntries, projects } from "./schema";

export async function fetchProjects() {
  return await db.select().from(projects);
}
export async function fetchProject(projectId: number) {
  return await db.select().from(projects).where(eq(projects.id, projectId));
}
export async function createNewProject(name: string, path: string) {
  const newProject: typeof projects.$inferInsert = {
    name: name,
    projectPath: path,
  };

  await db.insert(projects).values(newProject).run();
}

export async function deleteProject(projectId: number) {
  await db.delete(projects).where(eq(projects.id, projectId));
}

export async function fetchProjectEntries(projectId: number) {
  return await db
    .select()
    .from(fileEntries)
    .where(eq(fileEntries.projectId, projectId));
}
