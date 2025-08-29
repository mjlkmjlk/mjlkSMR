"use client";

import { useCallback, useEffect, useState } from "react";
import DefaultDialogContent from "./base/DefaultDialogContent";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { getFileMeta, GetFileMetaReturnType } from "@/db/actions/getFileMeta";
import FileEntryTile, { IFileEntryTile } from "./fileEntryTile";
import FileEntryList from "./fileEntryList";
import MediaWithModal from "./base/MediaWithModal";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

import { Button } from "./ui/button";
import { Typography } from "./ui/typography";

interface IFileDetailsBtn extends IFileEntryTile {
  defaultSx?: boolean;
}

export default function FileDetailsBtn(props: IFileDetailsBtn) {
  const { id, projectPath, filePath, projectId, defaultSx } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [fileData, setFileData] = useState<GetFileMetaReturnType>();

  const handleGetFileMeta = useCallback(async () => {
    const newFileData: GetFileMetaReturnType = await getFileMeta(projectId, id);
    setFileData(newFileData);
  }, [id, projectId]);

  useEffect(() => {
    if (isOpen === true) {
      handleGetFileMeta();
    }
  }, [handleGetFileMeta, isOpen]);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={defaultSx ? "default" : "iconSm"}
              variant={defaultSx ? "default" : "outline"}
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <DocumentMagnifyingGlassIcon className="size-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Details</p>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DefaultDialogContent
        className="h-full"
        title={
          <span>
            {"File: "}
            <span className="font-light">{filePath}</span>
          </span>
        }
      >
        <div className="grid grid-cols-[1fr_3fr_1fr] grid-rows-1 h-full">
          <div className="flex flex-col pr-4 border-r-1 ">
            <Typography variant="h4">
              {"Wins: "}
              <span className="font-light">
                {fileData && fileData.wins.length ? fileData.wins.length : 0}
              </span>
            </Typography>
            <div className=" grow h-1 overflow-auto ">
              {fileData?.wins.length ? (
                <FileEntryList>
                  {fileData.wins.map((item) => (
                    <FileEntryTile
                      key={"details-wins-file-entry-tile-" + item.fileId}
                      {...item}
                      id={item.fileId}
                      projectId={projectId}
                      projectPath={projectPath}
                      ratio={0}
                      wins={0}
                      totals={0}
                      mode="small"
                      status={0}
                    />
                  ))}
                </FileEntryList>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="grow flex flex-col">
            <div className="relative grow bg-black/15">
              <MediaWithModal
                src={"/" + projectPath + "/" + filePath}
                alt={filePath}
                className="p-0"
              />
            </div>
          </div>

          <div className="flex flex-col pl-4 border-l-1">
            <Typography variant="h4">
              {"Losses: "}
              <span className="font-light">
                {fileData && fileData.losses.length
                  ? fileData.losses.length
                  : 0}
              </span>
            </Typography>

            <div className=" grow h-1 overflow-auto ">
              {fileData?.losses.length ? (
                <FileEntryList>
                  {fileData.losses.map((item) => (
                    <FileEntryTile
                      key={"details-wins-file-entry-tile-" + item.fileId}
                      {...item}
                      id={item.fileId}
                      projectId={projectId}
                      projectPath={projectPath}
                      ratio={0}
                      wins={0}
                      totals={0}
                      status={0}
                      mode="small"
                    />
                  ))}
                </FileEntryList>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </DefaultDialogContent>
    </Dialog>
  );
}
