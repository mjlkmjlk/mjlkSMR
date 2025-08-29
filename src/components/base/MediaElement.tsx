import Image from "next/image";

export interface IMediaElement {
  src: string;
  alt?: string;
  autoplay?: boolean;
}

export default function MediaElement({ src, alt, autoplay }: IMediaElement) {
  const fileEnding = src.split(".").pop()?.toLocaleLowerCase();
  const videoFormats = process.env.NEXT_PUBLIC_FILE_TYPES_VID?.split("|") || [];

  if (fileEnding && videoFormats.indexOf(fileEnding) > -1) {
    return (
      <div className="flex flex-col items-center justify-center h-1 relative w-full grow">
        <video
          controls
          autoPlay={autoplay}
          loop
          muted={false}
          className=" w-full h-full object-contain"
        >
          <source src={src} type={"video/" + fileEnding} />
        </video>
      </div>
    );
  }
  return <Image src={src} alt={alt || src} fill={true} objectFit="contain" />;
} // <div className="object-contain">
