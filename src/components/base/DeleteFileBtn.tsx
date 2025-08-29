"use client";

import { setEntryStatus } from "@/db/actions/setEntryStatus";
import {
  TrashIcon,
  ArrowLeftStartOnRectangleIcon,
  XCircleIcon,
} from "@heroicons/react/16/solid";

import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import deleteFileEntry from "@/db/actions/deleteFileEntry";

export default function DeleteFileBtn({
  id,
  callback,
  defaultSx,
  status,
}: {
  id: number;
  callback?: (newStatus: number) => void;
  defaultSx?: boolean;
  status?: number;
}) {
  const handleMarkDeleted = (fileId: number) => {
    const newStatus = status === 4 ? 0 : 4;
    setEntryStatus({ id: fileId, status: newStatus });
    if (typeof callback === "function") {
      callback(newStatus);
    }
  };
  const handleRemoveFromDB = async (fileId: number) => {
    deleteFileEntry(fileId);
    if (typeof callback === "function") {
      callback(5);
    }
  };
  return (
    <>
      {status === 4 && (
        <Tooltip>
          <TooltipTrigger>
            <Button
              size={defaultSx ? "default" : "iconSm"}
              variant={"destructive"}
              onClick={() => {
                handleRemoveFromDB(id);
              }}
            >
              <XCircleIcon className="size-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Delete from DB</p>
          </TooltipContent>
        </Tooltip>
      )}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size={defaultSx ? "default" : "iconSm"}
            variant={status === 4 ? "success" : "destructive"}
            onClick={() => {
              handleMarkDeleted(id);
            }}
          >
            {status === 4 ? (
              <ArrowLeftStartOnRectangleIcon className="size-3" />
            ) : (
              <TrashIcon className="size-3" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {status === 4 ? <p>Restore</p> : <p>Remove</p>}
        </TooltipContent>
      </Tooltip>
    </>
  );
}
