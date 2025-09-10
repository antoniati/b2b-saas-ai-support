import type { ReactNode } from "react";

export const MainContainer = ({ children }: { children: ReactNode }) => {
  return <main className="max-w-7xl mx-auto p-4">{children}</main>;
};
