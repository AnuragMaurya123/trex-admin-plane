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
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 to-purple-50/30 dark:from-gray-900 dark:to-purple-900/10">
      {/* Sidebar */}
      <div className="flex-shrink-0">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>

      {/* Right Side Content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <header className="flex-shrink-0 w-full">
          <Header />
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 transition-all duration-300 bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
          <div className="min-h-full w-full max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
