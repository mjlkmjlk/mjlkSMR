"use client";

import { parseProjectFolderEntries } from "@/actions/fileActions";
import FileUploader from "@/components/FileUploader";
import OptionsDrawer from "@/components/optionsDrawer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Typography } from "@/components/ui/typography";
import { Slider } from "@/components/ui/slider"
import { SettingsContext } from "@/providers/settingsProvider";
import {
  ArrowPathRoundedSquareIcon,
  ArrowUpOnSquareStackIcon,
} from "@heroicons/react/16/solid";
import { useContext } from "react";

export interface IProjectOptionsDrawer {
  projectId: number;
  projectPath: string;
  handleGetProjectMeta: () => void;
  handleGetFilePairs: () => void;
}

export default function ProjectOptionsDrawer({
  projectId,
  projectPath,
  handleGetProjectMeta,
  handleGetFilePairs,
}: IProjectOptionsDrawer) {
  const { isAutoNext, isAutoRefetch, setIsAutoRefetch, setIsAutoNext, isVideoPlayerMute, setIsVideoPlayerMute,
    defaultVideoPlayerVolume,
    setDefaultVideoPlayerVolume } =
    useContext(SettingsContext);

  async function handleParseProjectFolderEntries() {
    await parseProjectFolderEntries(projectId);

    handleGetProjectMeta();
  }

  return (
    <OptionsDrawer className="max-w-2xl">
      <div className="flex justify-center gap-4">
        <div className="flex flex-col border-1 rounded-md p-2">
          <Typography variant="h4" className="p-0">
            How to start
          </Typography>
          <ol className="text-xs flex flex-col gap-2 list-decimal ml-4">
            <li>
              Choose files to import. <br />
              You can also just drop your files in .../mjlkSMR/public/
              {projectPath}
            </li>
            <li className="text-xs">
              When there are new files in your folder press {'"Scan Files"'} to
              load them into the Database.
            </li>
            <li className="text-xs">
              Press {'"Get New Pairs"'} or F5 to start!
            </li>
          </ol>
        </div>
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
            <div className="flex items-center gap-1">
            <Checkbox
            checked={isVideoPlayerMute}
            onCheckedChange={(checked) => {
              if (checked !== "indeterminate") {
                setIsVideoPlayerMute(checked);
              }
            }}
            />
            <span className="text-nowrap">Mute Video</span>
            </div>
            <div className="flex items-center gap-1">
            <Slider defaultValue={[defaultVideoPlayerVolume]} max={1} min={0} step={0.01} onValueChange={val=>{setDefaultVideoPlayerVolume(val[0])}}/>

            <span className="text-nowrap">Vol {Math.round(defaultVideoPlayerVolume*1000)/10}%</span>
            </div>
        </div>
      </div>
    </OptionsDrawer>
  );
}
