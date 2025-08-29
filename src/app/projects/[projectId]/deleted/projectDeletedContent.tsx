"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { IProjectContent } from "../projectContent";
import FileEntryTile from "@/components/fileEntryTile";
import FileEntryList from "@/components/fileEntryList";
import {
  FileListItemType,
  getMostPopularFileEntries,
} from "@/db/actions/getMostPopularFileEntries";
import ProjectNav from "@/components/base/ProjectNav";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import SortDirectionBtn from "@/components/base/SortDirectionBtn";
import { SettingsContext } from "@/providers/settingsProvider";

export default function ProjectDeletedContent({
  id,
  projectPath,
  name,
}: IProjectContent) {
  const [fileList, setFileList] = useState<FileListItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { sortDirection } = useContext(SettingsContext);

  const handleGetDeletedFileEntries = useCallback(async () => {
    setIsLoading(true);
    const newFileList = await getMostPopularFileEntries({
      projectId: id,
      deleted: true,
      order: sortDirection,
    });
    setFileList(newFileList);
    setIsLoading(false);
  }, [id, sortDirection]);

  useEffect(() => {
    handleGetDeletedFileEntries();
  }, [handleGetDeletedFileEntries]);

  return (
    <div className="px-1 py-1 flex flex-col gap-y-4 grow">
      <div className="grid grid-cols-[1fr_auto_1fr] grid-areas border-b-1">
        <div className="flex items-center gap-x-3">
          <ProjectNav name={name} projectId={id} />
        </div>

        <SortDirectionBtn />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner variant="infinite" />
        </div>
      ) : (
        <FileEntryList>
          {fileList.length ? (
            fileList.map((item) => (
              <FileEntryTile
                key={"file-entry-tile-" + item.id}
                {...item}
                projectId={id}
                projectPath={projectPath}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center">
              <span>{"Nothing here :("}</span>
              <span>Go delete something.</span>
            </div>
          )}
        </FileEntryList>
      )}
    </div>
  );
}
