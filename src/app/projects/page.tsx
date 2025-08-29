"use client";

import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { FormNewProject } from "@/components/FormNewProject";
import Link from "next/link";
import { deleteProject } from "@/db/actions";
import { ProjectMetaType } from "@/db/actions/getProjectMeta";
import { getProjectsMeta } from "@/db/actions/getProjectsMeta";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LinkButton from "@/components/base/LinkButton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PageProjects() {
  const [projectsArr, setProjectsArr] = useState<ProjectMetaType[]>([]);

  const handleFetchProjects = async () => {
    const newProjects: ProjectMetaType[] = await getProjectsMeta();

    setProjectsArr(newProjects);
  };

  const handleDeleteProject = async (projectId: number) => {
    await deleteProject(projectId);
    handleFetchProjects();
  };
  useEffect(() => {
    handleFetchProjects();
  }, []);

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <div className="flex justify-between">
        <h2>Projects</h2>
        <FormNewProject handleUpdate={handleFetchProjects} />
      </div>

      {!projectsArr.length && <span>There are no projects.</span>}
      <Table>
        <TableCaption>Your current projects.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30]">Name</TableHead>
            <TableHead>Path</TableHead>
            <TableHead className="text-right">File count</TableHead>
            <TableHead className="text-right">Vote count</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projectsArr.map((project: ProjectMetaType) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <LinkButton
                      variant="outline"
                      href={`/projects/${encodeURIComponent(project.id)}`}
                      className="uppercase max-w-50 "
                    >
                      <span className="overflow-ellipsis overflow-hidden">
                        {project.name}
                      </span>
                    </LinkButton>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{project.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell>
                <span>{project.projectPath}</span>
              </TableCell>
              <TableCell className="text-right">
                <span>{project.filesInProject}</span>
              </TableCell>
              <TableCell className="text-right">
                <span>{project.relationsInProject}</span>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDeleteProject(project.id);
                  }}
                >
                  <TrashIcon className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
