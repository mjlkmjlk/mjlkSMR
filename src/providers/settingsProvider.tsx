"use client";
import React, { createContext, ReactNode, useState } from "react";

export enum SortDirectionEnum {
  ASC = "ASC",
  DESC = "DESC",
}

interface ISettingsContext {
  sortDirection: SortDirectionEnum;
  setSortDirection: React.Dispatch<React.SetStateAction<SortDirectionEnum>>;
  isAutoRefetch: boolean;
  setIsAutoRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  isAutoNext: boolean;
  setIsAutoNext: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SettingsContext = createContext<ISettingsContext>({
  sortDirection: SortDirectionEnum.DESC,
  setSortDirection: () => {},
  isAutoRefetch: true,
  setIsAutoRefetch: () => {},
  isAutoNext: true,
  setIsAutoNext: () => {},
});

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [sortDirection, setSortDirection] = useState<SortDirectionEnum>(
    SortDirectionEnum.DESC
  );
  const [isAutoRefetch, setIsAutoRefetch] = useState<boolean>(true);
  const [isAutoNext, setIsAutoNext] = useState<boolean>(true);

  const contextValue: ISettingsContext = {
    sortDirection,
    setSortDirection,
    isAutoRefetch,
    setIsAutoRefetch,
    isAutoNext,
    setIsAutoNext,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};
