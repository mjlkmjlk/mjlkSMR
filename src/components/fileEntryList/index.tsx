import { ReactNode } from "react";

export default function FileEntryList({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-2 w-full flex-wrap justify-center">{children}</div>
  );
}
