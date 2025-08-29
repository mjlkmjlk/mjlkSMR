"use server";
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

const BASE_DIR = path.join(process.cwd(), "public", "user-folders");

export async function createProjectDir(dirName: string) {
  if (!dirName || typeof dirName !== "string") {
    throw new Error("Invalid folder name");
  }

  const cleanDirName = dirName
    .replaceAll(".", "_")
    .replaceAll("/", "_")
    .replaceAll("\\", "_");

  const targetDir = path.join(BASE_DIR, cleanDirName);
  console.log("targetDir", targetDir);

  if (!fs.existsSync(BASE_DIR)) {
    fs.mkdirSync(BASE_DIR, { recursive: true });
  }

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  revalidatePath("/");
  return { success: true, path: cleanDirName };
}
