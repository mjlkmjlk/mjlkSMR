"use client";
import { usePathname } from "next/navigation";
import {
  ArrowUturnLeftIcon,
  ChartBarIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import LinkButton from "./LinkButton";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface IProjectNav {
  projectId: number;
  name?: string;
}

export default function ProjectNav({ projectId, name }: IProjectNav) {
  const pathname = usePathname();
  const navArr = [
    {
      href: `/projects/${projectId}`,
      icon: <ArrowUturnLeftIcon className="size-3" />,
      label: "Overview",
    },
    {
      href: `/projects/${projectId}/ranking`,
      icon: <ChartBarIcon className="size-3" />,
      label: "Ranking",
    },
    {
      href: `/projects/${projectId}/deleted`,
      icon: <TrashIcon className="size-3" />,
      label: "Deleted",
    },
  ];

  return (
    <div className="flex">
      {name && (
        <Tooltip>
          <TooltipTrigger>
            <LinkButton href={"/projects"} className="uppercase max-w-20  ">
              <span className="overflow-ellipsis overflow-hidden">{name}</span>
            </LinkButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>{name}</p>
          </TooltipContent>
        </Tooltip>
      )}
      {navArr.map((item, idx) => {
        if (item.href === pathname) {
          return <div key={"nav-item-" + item.label + "--" + idx}></div>;
        }
        return (
          <LinkButton
            key={"nav-item-" + item.label + "--" + idx}
            href={item.href}
          >
            {item.icon}
            <span>{item.label}</span>
          </LinkButton>
        );
      })}
    </div>
  );
}
