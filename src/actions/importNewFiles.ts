"use server";
import getProjectDirById from "@/db/actions/getProjectDirById";
import fs from "fs/promises";
import path from "path";
import { BASE_DIR } from "./helper";

export async function importNewFiles(projectId: number, formData: FormData) {
  try {
    const projectDirs = await getProjectDirById(projectId);

    if (!projectDirs[0] || !projectDirs[0].projectPath) {
      throw new Error("Invalid Project Id or Path");
    }
    const targetDir = path.join(BASE_DIR, projectDirs[0].projectPath);

    const dirExists = await fs
      .stat(targetDir)
      .then(() => true)
      .catch(() => false);
    if (!dirExists) {
      throw new Error("Target directory does not exist");
    }
    console.log("projectId", projectId);
    console.log("projectDir", projectDirs[0].projectPath);
    console.log("formData", formData);

    const files = formData.getAll("files") as File[];
    console.log("files", files);
    console.log("targetDir", targetDir);

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const filePath = path.join(targetDir, file.name);
      console.log("filePath", filePath);

      await fs.writeFile(filePath, buffer, { flag: "wx" });
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: (error as Error).message };
  }
}
/*   try {
    const { files } = await parseForm();

    // Ensure target directory exists


    const uploadedFiles = Array.isArray(files.files)
      ? files.files
      : [files.files];

    for (const file of uploadedFiles) {
      const tempPath = file.filepath;
      const fileName = file.originalFilename || "unnamed-file";
      const targetPath = path.join(targetDir, fileName);

      fs.copyFileSync(tempPath, targetPath);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  } */
