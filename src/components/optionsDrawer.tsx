"use client";
import { ReactNode } from "react";
import { Cog6ToothIcon } from "@heroicons/react/16/solid";
import DefaultDialogContent from "./base/DefaultDialogContent";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";

export default function OptionsDrawer({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Cog6ToothIcon className="size-3" />
        </Button>
      </DialogTrigger>
      <DefaultDialogContent title="Options" className={className}>
        {children}
      </DefaultDialogContent>
    </Dialog>
  );
}
