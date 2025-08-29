"use server";

import { eq } from "drizzle-orm";
import { projects } from "../schema";
import { db } from "..";

export default async function getProjectDirById(projectId: number) {
  const dirName = await db
    .select({ projectPath: projects.projectPath })
    .from(projects)
    .where(eq(projects.id, projectId));
  return dirName;
}
