import DeleteFileBtn from "../base/DeleteFileBtn";
import clsx from "clsx";
import FileDetailsBtn from "../FileDetailsBtn";
import { FileListItemType } from "@/db/actions/getMostPopularFileEntries";

import MediaWithModal from "../base/MediaWithModal";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useState } from "react";

export interface IFileEntryTile extends FileListItemType {
  projectPath: string;
  projectId: number;
  mode?: "default" | "small";
}

export default function FileEntryTile(props: IFileEntryTile) {
  const { id, projectPath, filePath, ratio, mode, status } = props;
  const [tempStatus, setTempStatus] = useState<number>(status);
  const formattedRatio = Math.floor(ratio * 100);
  if (tempStatus === 5) {
    return <></>;
  }
  return (
    <div
      className={clsx(
        mode === "small" ? "w-40 h-30" : "w-80 h-60",
        "flex relative grow bg-white/15 shadow-inner shadow-white/10 data-hover:bg-white/20 "
      )}
    >
      <MediaWithModal src={"/" + projectPath + "/" + filePath} alt={filePath} />
      <div className="absolute top-0 w-full flex items-center justify-between">
        <div className="flex gap-1">
          <div className="relative flex bg-black/50 h-full rounded-br-sm ">
            {ratio ? (
              <Tooltip>
                <TooltipTrigger>
                  <div className="relative left-0 w-1 h-full bg-rose-800">
                    <div
                      className="absolute left-0 right-0 w-1 bottom-0 bg-emerald-500"
                      style={{ height: ratio * 100 + "%" }}
                    ></div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Win ratio {formattedRatio}%</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <div></div>
            )}
            <div className="p-1">
              <FileDetailsBtn {...props} />
            </div>
          </div>
        </div>
        <div className="flex gap-2 bg-black/50 h-full p-1 rounded-bl-sm ">
          <DeleteFileBtn id={id} status={tempStatus} callback={setTempStatus} />
        </div>
      </div>
      <div className="absolute bottom-0 w-full bg-black/50  p-1 flex items-center justify-between"></div>
    </div>
  );
}
