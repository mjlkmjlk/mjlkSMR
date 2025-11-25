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
  isVideoPlayerMute: boolean;
  setIsVideoPlayerMute: React.Dispatch<React.SetStateAction<boolean>>;
  defaultVideoPlayerVolume: number;
  setDefaultVideoPlayerVolume: React.Dispatch<React.SetStateAction<number>>;
}

export const SettingsContext = createContext<ISettingsContext>({
  sortDirection: SortDirectionEnum.DESC,
  setSortDirection: () => {},
  isAutoRefetch: true,
  setIsAutoRefetch: () => {},
  isAutoNext: true,
  setIsAutoNext: () => {},
  isVideoPlayerMute: true,
  setIsVideoPlayerMute: () => {},
  defaultVideoPlayerVolume: .5,
  setDefaultVideoPlayerVolume: () => {},
});

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [sortDirection, setSortDirection] = useState<SortDirectionEnum>(
    SortDirectionEnum.DESC
  );
  const [isAutoRefetch, setIsAutoRefetch] = useState<boolean>(true);
  const [isAutoNext, setIsAutoNext] = useState<boolean>(true);
  const [isVideoPlayerMute, setIsVideoPlayerMute] = useState<boolean>(true);
  const [defaultVideoPlayerVolume, setDefaultVideoPlayerVolume] = useState<number>(.5);

  const contextValue: ISettingsContext = {
    sortDirection,
    setSortDirection,
    isAutoRefetch,
    setIsAutoRefetch,
    isAutoNext,
    setIsAutoNext,
    isVideoPlayerMute,
    setIsVideoPlayerMute,
    defaultVideoPlayerVolume,
    setDefaultVideoPlayerVolume
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};
