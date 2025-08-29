import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import clsx from "clsx";
import { ReactNode } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface IDefaultDialogContent {
  // isOpen: boolean;
  // handleClose: () => void;
  children: ReactNode;
  title: string | ReactNode;
  showHeader?: boolean;
  desc?: string;
  className?: string;
}
export default function DefaultDialogContent({
  // isOpen,
  // handleClose,
  children,
  title,
  desc,
  className,
  showHeader = true,
}: IDefaultDialogContent) {
  const dialogHeader = (
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      {desc && <DialogDescription>{desc}</DialogDescription>}
    </DialogHeader>
  );

  return (
    <DialogContent
      className={clsx(
        "flex flex-col overflow-hidden max-h-[99vh]  max-w-[99vw] w-full transition rounded-xl bg-white/5 p-4 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0",
        className
      )}
    >
      {!showHeader ? (
        <VisuallyHidden>{dialogHeader}</VisuallyHidden>
      ) : (
        <>{dialogHeader}</>
      )}

      {children}
    </DialogContent>
  );
}
