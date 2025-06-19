"use client"

import React from "react"
// assumes you already have a toggle
import ModeToggle from "./mode-toggle"

export default function Header() {
  return (
    <div className="
      flex items-center justify-end w-full p-4 
     bg-gradient-to-r from-violet-500/10 to-purple-500/10 backdrop-blur-sm
      border-b border-purple-200/30 dark:border-purple-700/30
     
    ">
    

      {/* Right side controls */}
      <div className="flex items-center  gap-5 ml-6">

       
        {/* Welcome Message & User Menu */}
        <div className="flex items-center gap-3 ml-2">
          <div className="hidden sm:block text-right">
            <div className="text-sm font-medium bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              Welcome back,
            </div>
            <div className="text-lg font-bold text-slate-800 dark:text-slate-200">
              { "User"}
            </div>
          </div>

         
        </div>

         {/* Mode Toggle */}
        <ModeToggle />

      </div>

      {/* Mobile welcome message */}
      <div className="sm:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="text-center">
          <div className="text-xs font-medium bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
            Welcome
          </div>
          <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
            { "User"}
          </div>
        </div>
      </div>
    </div>
  );
}
