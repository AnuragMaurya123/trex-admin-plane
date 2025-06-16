"use client";

import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState, ReactNode } from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { Loader2 } from "lucide-react";

interface AuthCheckWrapperProps {
  children: ReactNode;
}

export default function AuthCheckWrapper({ children }: AuthCheckWrapperProps) {
  const { isAuthenticated } = useAppSelector((state) => state.admin);
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!checked) {
      setChecked(true);
    } else if (!isAuthenticated) {
      router.push("/");
    }
  }, [checked, isAuthenticated, router]);

  if (!checked) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
        <div className="flex items-center space-x-4 rounded-xl border border-purple-100 bg-white/80 p-6 backdrop-blur-sm shadow-lg dark:border-purple-800/30 dark:bg-gray-800/80">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600 dark:text-purple-400" />
          <span className="text-lg font-medium text-gray-700 dark:text-gray-200">
            Checking authentication...
          </span>
        </div>
      </div>
    );
  }

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
