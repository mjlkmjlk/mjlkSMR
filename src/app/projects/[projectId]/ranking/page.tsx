import { ProjectsType } from "@/db/schema";
import { fetchProject } from "@/db/actions";
import path from "path";
import ProjectRankingContent from "./projectRankingContent";

export default async function ProjectFileRanking({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project: ProjectsType[] = await fetchProject(parseInt(projectId));
  const BASE_DIR = path.join("user-folders", project[0].projectPath);

  return (
    <div>
      <ProjectRankingContent
        id={parseInt(projectId)}
        name={project[0].name}
        projectPath={BASE_DIR}
      />
    </div>
  );
}
