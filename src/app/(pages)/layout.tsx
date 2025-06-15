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

/**
 * Responsive layout wrapper that:
 * 1. Guards routes by redirecting unauthenticated users to the landing page ("/").
 * 2. Shows the sidebar as a permanent column.
 */
export default function AuthCheckWrapper({ children }: AuthCheckWrapperProps) {
  const { isAuthenticated } = useAppSelector((state) => state.admin);
  const router = useRouter();

  const [checked, setChecked] = useState(false);

  /* -------------------------------------------------- */
  /* Auth guard                                         */
  /* -------------------------------------------------- */
  useEffect(() => {
    if (!checked) {
      setChecked(true);
    } else if (!isAuthenticated) {
      router.push("/");
    }
  }, [checked, isAuthenticated, router]);

  /* -------------------------------------------------- */
  /* Loading screen                                     */
  /* -------------------------------------------------- */
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

  /* -------------------------------------------------- */
  /* Layout                                             */
  /* -------------------------------------------------- */
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-purple-50/30 dark:from-gray-900 dark:to-purple-900/10">
      {/* Sidebar */}
      <aside className="hidden md:block shrink-0 border-r border-purple-200/50 bg-white/90 backdrop-blur-sm shadow-lg dark:border-purple-800/30 dark:bg-gray-800/90">
        <div className="h-full">
          <Sidebar />
        </div>
      </aside>

      {/* Content area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex-shrink-0">
          <Header />
        </header>

        {/* Main */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-white/50 to-purple-50/20  transition-[background] duration-300 dark:from-gray-900/50 dark:to-purple-900/10">
          <div className="mx-auto h-full max-w-full">{children}</div>
        </main>
      </div>

      {/* Decorative blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute right-20 top-20 h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-purple-300/10 to-indigo-300/10 blur-3xl" />
        <div
          className="absolute bottom-20 left-20 h-48 w-48 animate-pulse rounded-full bg-gradient-to-tr from-indigo-300/10 to-purple-300/10 blur-2xl"
          style={{ animationDelay: "3s" }}
        />
      </div>
    </div>
  );
}
