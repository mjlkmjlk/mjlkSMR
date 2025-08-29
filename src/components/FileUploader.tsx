"use client";
import { ArrowUpTrayIcon } from "@heroicons/react/16/solid";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { importNewFiles } from "@/actions/importNewFiles";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { Spinner } from "./ui/shadcn-io/spinner";

export default function FileUploader({ projectId }: { projectId: number }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formattedFileString = useMemo(
    () =>
      (
        process.env.NEXT_PUBLIC_FILE_TYPES_IMG +
        "|" +
        process.env.NEXT_PUBLIC_FILE_TYPES_VID
      )
        .split("|")
        .map((item) => "." + item)
        .join(","),
    []
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append("projectId", projectId.toString());
    console.log("formData", formData);

    const response = await importNewFiles(projectId, formData);
    console.log("importNewFiles", response);
    if (response.success) {
      toast("Success");
    } else {
      toast(response.error);
    }
    setIsLoading(false);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <Input
        type="file"
        name="files"
        multiple
        required
        accept={formattedFileString}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? <Spinner variant="infinite" /> : <ArrowUpTrayIcon />}
      </Button>
    </form>
  );
}
