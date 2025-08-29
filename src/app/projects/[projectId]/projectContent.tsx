"use client";

import { parseProjectFolderEntries } from "@/actions/fileActions";
import {
  ArrowPathRoundedSquareIcon,
  ArrowUpOnSquareStackIcon,
} from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";
import ProjectPagination, { next } from "./ProjectPagination";
import ProjectFileBox from "./ProjectFileBox";
import { triangular } from "@/lib/helper";
import {
  fetchFilePairs,
  FetchFilePairsReturnType,
} from "@/db/actions/fetchFilePairs";
import { getProjectMeta, ProjectMetaType } from "@/db/actions/getProjectMeta";
import { voteForEntry } from "@/db/actions/voteForEntry";
import OptionsDrawer from "@/components/optionsDrawer";
import { PhotoIcon, Square2StackIcon } from "@heroicons/react/16/solid";
import ProjectNav from "@/components/base/ProjectNav";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/FileUploader";
import { Checkbox } from "@/components/ui/checkbox";
import ProjectOptionsDrawer from "./projectOptionsDrawer";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export interface IProjectContent {
  id: number;
  projectPath: string;
  name: string;
}
export default function ProjectContent({
  id,
  projectPath,
  name,
}: IProjectContent) {
  const [filePairs, setFilePairs] = useState<FetchFilePairsReturnType[]>([]);
  const [fileIndex, setFileIndex] = useState<number>(0);
  const [projectMeta, setProjectMeta] = useState<ProjectMetaType>();
  const [sessionResults, setSessionResults] = useState<number[]>([]);
  const [isAutoNext, setIsAutoNext] = useState<boolean>(true);
  const [isAutoRefetch, setIsAutoRefetch] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleGetProjectMeta = useCallback(async () => {
    const newProjectMeta = await getProjectMeta(id);
    setProjectMeta(newProjectMeta);
  }, [id]);

  const handleGetFilePairs = useCallback(async () => {
    setIsLoading(true);
    setFilePairs([]);
    setFileIndex(0);
    const newFilePairs = await fetchFilePairs(id);
    setFilePairs(newFilePairs);
    handleGetProjectMeta();
    setSessionResults([]);
    setIsLoading(false);
  }, [id, handleGetProjectMeta]);

  const handleVoteForEntry = async (result: number) => {
    const relData = {
      projectId: id,
      key1: filePairs[fileIndex].key1,
      key2: filePairs[fileIndex].key2,
      result,
    };
    voteForEntry(relData);
    handleUpdateSessionResults(result);

    handleAutomatisms();
  };
  const handleUpdateSessionResults = (result: number) => {
    const newResults = [...sessionResults];
    newResults[fileIndex] = result;
    setSessionResults(newResults);
  };
  const handleMarkDeleted = () => {
    handleAutomatisms();
  };
  const handleAutomatisms = () => {
    if (isAutoNext && fileIndex < filePairs.length - 1) {
      next({
        idx: fileIndex,
        maxIdx: filePairs.length,
        setter: setFileIndex,
      });
    } else if (isAutoRefetch && fileIndex >= filePairs.length - 1) {
      handleGetFilePairs();
    }
  };

  useEffect(() => {
    handleGetFilePairs();
  }, [handleGetFilePairs]);

  return (
    <div className="px-1 py-1 flex flex-col gap-y-4 grow">
      <div className="grid grid-cols-[1fr_auto_1fr] grid-areas border-b-1">
        <div className="flex items-center gap-x-3">
          <ProjectNav name={name} projectId={id} />
        </div>
        {isLoading ? (
          <div></div>
        ) : filePairs.length ? (
          <ProjectPagination
            idx={fileIndex}
            maxIdx={filePairs.length}
            setter={setFileIndex}
          />
        ) : (
          <div className="flex items-center justify-center">
            <FileUploader projectId={id} />
          </div>
        )}
        <div className="flex justify-end gap-2 items-center">
          {(projectMeta?.filesInProject || projectMeta?.filesInProject === 0) &&
            (projectMeta?.relationsInProject ||
              projectMeta?.relationsInProject === 0) && (
              <>
                <div className="flex gap-0.5 items-center">
                  <span>{projectMeta?.filesInProject}</span>
                  <PhotoIcon className="size-3" />
                </div>
                <div className="flex gap-0.5 items-center">
                  <span>
                    {projectMeta?.relationsInProject}/
                    {triangular(projectMeta?.filesInProject - 1)}
                  </span>
                  <Square2StackIcon className="size-3" />
                </div>
              </>
            )}
          <ProjectOptionsDrawer
            projectId={id}
            isAutoRefetch={isAutoRefetch}
            isAutoNext={isAutoNext}
            setIsAutoRefetch={setIsAutoRefetch}
            setIsAutoNext={setIsAutoNext}
            handleGetProjectMeta={handleGetProjectMeta}
            handleGetFilePairs={handleGetFilePairs}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner variant="infinite" />
        </div>
      ) : filePairs.length ? (
        <div className="flex w-max-100 grow ">
          <div className="grow w-50 relative border-r-1">
            <ProjectFileBox
              key={"file-id--" + filePairs[fileIndex].key1}
              id={filePairs[fileIndex].key1}
              label={filePairs[fileIndex].file1}
              itemKey={1}
              handleVoteForEntry={handleVoteForEntry}
              sessionResult={sessionResults[fileIndex]}
              handleMarkDeleted={handleMarkDeleted}
              projectId={id}
              filePath={filePairs[fileIndex].file1}
              projectPath={projectPath}
            />
          </div>
          <div className="grow w-50 relative">
            <ProjectFileBox
              key={filePairs[fileIndex].key2}
              id={filePairs[fileIndex].key2}
              label={filePairs[fileIndex].file2}
              itemKey={2}
              handleVoteForEntry={handleVoteForEntry}
              sessionResult={sessionResults[fileIndex]}
              handleMarkDeleted={handleMarkDeleted}
              projectId={id}
              filePath={filePairs[fileIndex].file2}
              projectPath={projectPath}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <span>{"Nothing here :("}</span>
          <span>Go add something.</span>
        </div>
      )}
    </div>
  );
}
