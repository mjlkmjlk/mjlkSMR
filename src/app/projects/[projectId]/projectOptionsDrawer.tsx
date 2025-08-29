"use client";

import { parseProjectFolderEntries } from "@/actions/fileActions";
import FileUploader from "@/components/FileUploader";
import OptionsDrawer from "@/components/optionsDrawer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SettingsContext } from "@/providers/settingsProvider";
import {
  ArrowPathRoundedSquareIcon,
  ArrowUpOnSquareStackIcon,
} from "@heroicons/react/16/solid";
import { useContext } from "react";

export interface IProjectOptionsDrawer {
  projectId: number;
  isAutoRefetch: boolean;
  isAutoNext: boolean;
  setIsAutoRefetch: (checked: boolean) => void;
  setIsAutoNext: (checked: boolean) => void;
  handleGetProjectMeta: () => void;
  handleGetFilePairs: () => void;
}

export default function ProjectOptionsDrawer({
  projectId,
  handleGetProjectMeta,
  handleGetFilePairs,
}: IProjectOptionsDrawer) {
  const { isAutoNext, isAutoRefetch, setIsAutoRefetch, setIsAutoNext } =
    useContext(SettingsContext);

  async function handleParseProjectFolderEntries() {
    await parseProjectFolderEntries(projectId);

    handleGetProjectMeta();
  }
  return (
    <OptionsDrawer className="max-w-lg">
      <div className="flex justify-center gap-4">
        <div className=" flex flex-col gap-2 ">
          <FileUploader projectId={projectId} />
          <Button
            size="sm"
            variant="default"
            onClick={handleParseProjectFolderEntries}
          >
            <ArrowUpOnSquareStackIcon className="size-3" /> Scan Files
          </Button>

          <Button size="sm" variant="default" onClick={handleGetFilePairs}>
            <ArrowPathRoundedSquareIcon className="size-3" /> Get New Pairs
          </Button>
        </div>
        <div className=" flex flex-col gap-2 rounded-md bg-black/50 p-2 text-sm/6 font-semibold text-white  shadow-black/20 shadow-inner ">
          <div className="flex items-center gap-1">
            <Checkbox
              checked={isAutoRefetch}
              onCheckedChange={(checked) => {
                if (checked !== "indeterminate") {
                  setIsAutoRefetch(checked);
                }
              }}
            />
            <span className="text-nowrap">Auto Fetch Pairs</span>
          </div>
          <div className="flex items-center gap-1">
            <Checkbox
              checked={isAutoNext}
              onCheckedChange={(checked) => {
                if (checked !== "indeterminate") {
                  setIsAutoNext(checked);
                }
              }}
            />
            <span className="text-nowrap">Auto Forward</span>
          </div>
        </div>
      </div>
    </OptionsDrawer>
  );
}
