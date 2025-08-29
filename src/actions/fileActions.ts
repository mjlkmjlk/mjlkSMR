"use server";
import { fetchProject, fetchProjectEntries } from "@/db/actions";
import { insertBatchFileEntries } from "@/db/actions/insertBatchFileEntries";
import { ProjectsType } from "@/db/schema";
import fs from "fs";
import path from "path";
import { BASE_DIR } from "./helper";

export async function readFolderContents(dirName: string): Promise<string[]> {
  const targetDir = path.join(BASE_DIR, dirName);

  if (!fs.existsSync(targetDir)) {
    throw new Error("Folder does not exist.");
  }
  return fs.readdirSync(targetDir);
}

export async function parseProjectFolderEntries(projectId: number) {
  const project: ProjectsType[] = await fetchProject(projectId);
  const targetDir = path.join(BASE_DIR, project[0].projectPath);
  if (!fs.existsSync(targetDir)) {
    throw new Error("Folder does not exist.");
  }
  const combinedFileFormats =
    process.env.NEXT_PUBLIC_FILE_TYPES_IMG +
    "|" +
    process.env.NEXT_PUBLIC_FILE_TYPES_VID;
  const regex = new RegExp(String.raw`\.(${combinedFileFormats})$`, "i");

  //Get all filenames from the target directory
  const projectFilesArr = fs.readdirSync(targetDir);
  //Remove all filenames that do not match the regex
  const cleanedProjectFilesArr = projectFilesArr.filter((file) =>
    regex.test(file)
  );
  //Get all file entries already in the project
  const projectEntriesArr = await fetchProjectEntries(projectId);
  //Make a flat set all filepaths/filenames of the project files
  const entriesPathSet = new Set(
    projectEntriesArr.map((item) => item.filePath)
  );
  //Remove all filenames that already exist in the set of filenames
  const filteredFilesArr = cleanedProjectFilesArr.filter(
    (file) => !entriesPathSet.has(file)
  );

  console.log(filteredFilesArr);
  //Insert all remaining filenames if there are any
  if (filteredFilesArr.length) {
    insertBatchFileEntries(projectId, filteredFilesArr);
  }
}

export async function moveFileIntoDeleted(
  dirName: string,
  fileName: string
): Promise<boolean> {
  const targetDir = path.join(BASE_DIR, dirName);
  const deletedDir = path.join(targetDir, "deleted");
  const filePath = path.join(targetDir, fileName);
  const newFilePath = path.join(deletedDir, fileName);
  if (!fs.existsSync(targetDir)) {
    throw new Error("Folder does not exist.");
  }
  if (!fs.existsSync(deletedDir)) {
    fs.mkdirSync(deletedDir, { recursive: true });
  }
  try {
    fs.renameSync(filePath, newFilePath);
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
}
