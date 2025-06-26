"use client";

import LoginForm from "@/components/login-form";
import ModeToggle from "@/components/mode-toggle";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 transition-all px-4 py-8 overflow-hidden text-gray-900 dark:text-gray-100">
      
      {/* Theme Toggle */}
      <div className="absolute right-4 top-4 z-10">
        <ModeToggle />
      </div>

      {/* Background Decorative Blobs - visible only in dark mode */}
      <div className="hidden dark:block absolute -top-24 -left-16 h-56 w-56 sm:h-72 sm:w-72 rounded-full bg-purple-bright/30 blur-3xl animate-pulse" />
      <div className="hidden dark:block absolute -bottom-24 -right-16 h-56 w-56 sm:h-72 sm:w-72 rounded-full bg-purple-button/30 blur-3xl animate-pulse" />

      {/* Centered Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-sm sm:max-w-md rounded-3xl bg-background p-6 sm:p-8 ring-1 ring-white/10 dark:ring-white/5 backdrop-blur-sm shadow-xl shadow-purple-300 dark:shadow-none"
      >
        <div className="mb-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-700 dark:text-purple-400">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
            Login to your dashboard
          </p>
        </div>
        <LoginForm />
      </motion.div>

      {/* Footer */}
      <footer className="relative z-10 mt-6 text-center text-xs sm:text-sm text-gray-700 dark:text-gray-400 px-2">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
}
