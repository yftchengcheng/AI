"use client";

import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { useSidebarStore } from "@/lib/store";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebarStore();

  return (
    <div className="flex min-h-full">
      <Sidebar />
      <div
        className="flex flex-1 flex-col transition-[margin] duration-200"
        style={{ marginLeft: collapsed ? "4rem" : "15rem" }}
      >
        <Header />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
