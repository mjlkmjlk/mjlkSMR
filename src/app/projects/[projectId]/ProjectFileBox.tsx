import DeleteFileBtn from "@/components/base/DeleteFileBtn";
import MediaWithModal from "@/components/base/MediaWithModal";
import FileDetailsBtn from "@/components/FileDetailsBtn";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

interface IProjectFileBox {
  id: number;
  projectId: number;
  filePath: string;
  projectPath: string;
  label: string;
  itemKey: 1 | 2;
  sessionResult: number;
  handleVoteForEntry: (result: number) => void;
  handleMarkDeleted: () => void;
}

export default function ProjectFileBox({
  id,
  projectId,
  filePath,
  projectPath,
  label,
  itemKey,
  handleVoteForEntry,
  sessionResult,
  handleMarkDeleted,
}: IProjectFileBox) {
  return (
    <div className="relative w-full h-full group">
      <MediaWithModal
        src={"/" + projectPath + "/" + filePath}
        alt={label}
        autoplay={true}
      />
      <div
        className={clsx(
          `flex  justify-between gap-2 ${
            itemKey === 2 ? "flex-row" : "flex-row-reverse"
          } delay-200 transition-opacity duration-200 absolute top-0 w-full px-1 opacity-1 group-hover:opacity-20`
        )}
        //opacity-0 group-hover:opacity-100 delay-hover-in-only
      >

        <Button
          size="default"
          variant="default"
          className={clsx(
            sessionResult && sessionResult === itemKey
              ? "bg-emerald-500"
              : sessionResult
              ? "bg-rose-700"
              : "",
            "grow"
          )}
          onClick={() => {
            handleVoteForEntry(itemKey);
          }}
        >
          <CheckIcon className="size-6" />
        </Button>
        <div className={clsx(`flex gap-2 ${
          itemKey === 2 ? "flex-row" : "flex-row-reverse"
        } `)}>
          <FileDetailsBtn
          defaultSx={true}
          projectPath={projectPath}
          projectId={projectId}
          id={id}
          filePath={filePath}
          wins={0}
          totals={0}
          ratio={0}
          status={0}
          />
          <DeleteFileBtn defaultSx={true} id={id} callback={handleMarkDeleted} />
        </div>
      </div>
    </div>
  );
}
