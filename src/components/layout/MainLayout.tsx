
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <aside className="hidden h-[calc(100vh-4rem)] w-64 border-r border-gaming-darkPurple/20 md:block">
          <Sidebar />
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
