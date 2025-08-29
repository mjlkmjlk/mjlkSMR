"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import { createNewProject } from "@/db/actions";
import { createProjectDir } from "@/actions/folderActions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Typography } from "../ui/typography";

interface IFormNewProject {
  handleUpdate: () => void;
}
export const FormNewProject = ({ handleUpdate }: IFormNewProject) => {
  const [name, setName] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleCreateNewProject = async () => {
    console.log();
    try {
      const dir = await createProjectDir(name);
      await createNewProject(name, dir.path);
      setName("");
      handleUpdate();
    } catch (error) {
      if (error instanceof Error) {
        console.warn(error.message);

        if (error.message.indexOf("tProjects.project_path") > -1) {
          setErrorMsg("Path already exists.");
        } else if (error.message.indexOf("tProjects.name") > -1) {
          setErrorMsg("Name already exists.");
        }
      }
    }
  };

  useEffect(() => {
    setErrorMsg("");
  }, [name]);

  return (
    <div>
      <div className="w-full max-w-md flex flex-row gap-4 items-end">
        <Typography className="text-sm/6 font-medium text-white">
          New Project
        </Typography>
        <Input
          type="text"
          name="project_name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <Button disabled={!name} onClick={handleCreateNewProject}>
          <PlusIcon className="size-4" />
        </Button>
      </div>
      <span className="text-sm/3 font-medium text-red-500">{errorMsg}</span>
    </div>
  );
};
