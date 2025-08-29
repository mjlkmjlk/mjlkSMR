"use client";

import { setEntryStatus } from "@/db/actions/setEntryStatus";

import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/16/solid";
import { Button } from "../ui/button";

export default function RestoreFileBtn({
  id,
  callback,
}: {
  id: number;
  callback?: () => void;
}) {
  const handleRemoveMarkDeleted = (fileId: number) => {
    setEntryStatus({ id: fileId, status: 0 });
    if (typeof callback === "function") {
      callback();
    }
  };
  return (
    <Button
      size="iconSm"
      variant="secondary"
      onClick={() => {
        handleRemoveMarkDeleted(id);
      }}
    >
      <ArrowLeftStartOnRectangleIcon className="size-3" />
    </Button>
  );
}
