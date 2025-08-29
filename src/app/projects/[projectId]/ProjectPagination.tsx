"use client";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

interface IProjectPagination {
  idx: number;
  maxIdx: number;
  setter: (idx: number) => void;
}
export function next({ idx, maxIdx, setter }: IProjectPagination) {
  let newIdx = idx + 1;
  if (newIdx > maxIdx - 1) {
    newIdx = maxIdx - 1;
  }
  setter(newIdx);
}
export default function ProjectPagination({
  idx,
  maxIdx,
  setter,
}: IProjectPagination) {
  function first() {
    setter(0);
  }
  function prev() {
    let newIdx = idx - 1;
    if (newIdx < 0) {
      newIdx = 0;
    }
    setter(newIdx);
  }
  function last() {
    setter(maxIdx - 1);
  }
  const prevDisabled = idx <= 0;
  const nextDisabled = idx >= maxIdx - 1;
  const prevIconStyle = clsx(
    "size-4",
    prevDisabled ? "text-gray-600" : "text-white"
  );
  const nextIconStyle = clsx(
    "size-4",
    nextDisabled ? "text-gray-600" : "text-white"
  );
  return (
    <div className="flex items-center justify-center gap-x-2">
      <button
        onClick={first}
        disabled={prevDisabled}
        className={"cursor-pointer disabled:cursor-auto"}
      >
        <ChevronDoubleLeftIcon className={prevIconStyle} />
      </button>
      <button
        onClick={prev}
        disabled={prevDisabled}
        className={"cursor-pointer disabled:cursor-auto"}
      >
        <ChevronLeftIcon className={prevIconStyle} />
      </button>
      <span>
        {idx + 1}/{maxIdx}
      </span>
      <button
        onClick={() => {
          next({ idx, maxIdx, setter });
        }}
        disabled={nextDisabled}
        className={"cursor-pointer disabled:cursor-auto"}
      >
        <ChevronRightIcon className={nextIconStyle} />
      </button>
      <button
        onClick={last}
        disabled={nextDisabled}
        className={"cursor-pointer disabled:cursor-auto"}
      >
        <ChevronDoubleRightIcon className={nextIconStyle} />
      </button>
    </div>
  );
}
