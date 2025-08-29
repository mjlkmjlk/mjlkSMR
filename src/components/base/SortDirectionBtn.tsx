import { BarsArrowDownIcon, BarsArrowUpIcon } from "@heroicons/react/16/solid";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useContext } from "react";
import {
  SettingsContext,
  SortDirectionEnum,
} from "@/providers/settingsProvider";

export default function SortDirectionBtn() {
  const { sortDirection, setSortDirection } = useContext(SettingsContext);

  const handleClick = () => {
    if (sortDirection === "ASC") {
      setSortDirection(SortDirectionEnum.DESC);
    } else {
      setSortDirection(SortDirectionEnum.ASC);
    }
  };
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="iconSm" variant="secondary" onClick={handleClick}>
          {sortDirection === "ASC" ? (
            <BarsArrowUpIcon className="size-3" />
          ) : (
            <BarsArrowDownIcon className="size-3" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>
          Currently sorting{" "}
          {sortDirection === "ASC" ? "ascending" : "descending"}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
