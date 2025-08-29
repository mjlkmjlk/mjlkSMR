import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactNode } from "react";
import { SettingsProvider } from "./settingsProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SettingsProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </SettingsProvider>
  );
}
