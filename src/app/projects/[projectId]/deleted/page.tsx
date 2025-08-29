import { ProjectsType } from "@/db/schema";
import { fetchProject } from "@/db/actions";
import path from "path";
import ProjectDeletedContent from "./projectDeletedContent";

export default async function ProjectDeletedFiles({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project: ProjectsType[] = await fetchProject(parseInt(projectId));
  const BASE_DIR = path.join("user-folders", project[0].projectPath);

  return (
    <div>
      <ProjectDeletedContent
        id={parseInt(projectId)}
        name={project[0].name}
        projectPath={BASE_DIR}
      />
    </div>
  );
}
