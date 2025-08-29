import { ProjectsType } from "@/db/schema";
import ProjectContent from "./projectContent";
import { fetchProject } from "@/db/actions";
import path from "path";

export default async function PageProject({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project: ProjectsType[] = await fetchProject(parseInt(projectId));
  const BASE_DIR = path.join("user-folders", project[0].projectPath);

  return (
    <ProjectContent
      id={parseInt(projectId)}
      name={project[0].name}
      projectPath={BASE_DIR}
    />
  );
}
