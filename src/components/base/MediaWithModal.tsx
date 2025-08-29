import MediaElement from "./MediaElement";
import { Dialog, DialogTrigger } from "../ui/dialog";
import DefaultDialogContent from "./DefaultDialogContent";
import clsx from "clsx";

export default function MediaWithModal({
  src,
  alt,
  autoplay,
  className,
}: {
  src: string;
  alt: string;
  autoplay?: boolean;
  className?: string;
}) {
  const mediaElement = (
    <MediaElement key={src} src={src} alt={alt} autoplay={autoplay} />
  );
  return (
    <Dialog>
      <div
        className={clsx(
          "relative w-full h-full cursor-pointer flex flex-col grow justify-center items-center",
          className
        )}
      >
        <DialogTrigger className="w-full flex flex-col grow">
          {mediaElement}
        </DialogTrigger>
      </div>
      <DefaultDialogContent
        className="p-0 h-full w-full rounded-none flex flex-col grow"
        title={"Media " + src}
        showHeader={false}
      >
        <DialogTrigger className="w-full flex flex-col grow">
          {mediaElement}
        </DialogTrigger>
      </DefaultDialogContent>
    </Dialog>
  );
}
//<div className="w-[90vw] h-[90vh] relative"></div>
