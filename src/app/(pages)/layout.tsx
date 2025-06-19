"use client";


import { useState, ReactNode } from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

interface AuthCheckWrapperProps {
  children: ReactNode;
}

export default function AuthCheckWrapper({ children }: AuthCheckWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 to-purple-50/30 dark:from-gray-900 dark:to-purple-900/10">
  {/* Sidebar */}
  <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

  {/* Right Side Content */}
  <div className="flex flex-col flex-1 min-h-screen overflow-hidden">
    
    {/* Header */}
    <header className="flex-shrink-0">
      <Header />
    </header>

    {/* Main content area */}
    <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gradient-to-b from-white/50 to-purple-50/20 transition-all duration-300 dark:from-gray-900/50 dark:to-purple-900/10">
      <div className="min-h-full">{children}</div>
    </main>
  </div>
</div>

  );
}
