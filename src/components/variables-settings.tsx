"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import VariablesForm from "./variables-form"; // Make sure this exists
import ListOfVariables from "./list-of-variables";

export default function VariablesSettings() {
  return (
    <div>
      {/* Page Title */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Product Settings
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
              Manage your product variables and categories
            </p>
          </div>
        </div>
      </div>

      {/* Card with Tabs */}
      <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-500/10 via-violet-500/10 to-indigo-500/10 border-b border-purple-200/30 dark:border-purple-700/30 pt-4">
          <CardTitle className="text-2xl text-slate-800 dark:text-slate-200">
            Variable Management
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Add and organize your product attributes across different categories
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8">
          <Tabs defaultValue="form" className="w-full">
            <TabsList className="mb-6 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 flex justify-start gap-2">
              <TabsTrigger
                value="form"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600
                 data-[state=active]:text-white dark:data-[state=active]:text-white
                 px-6 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
              >
                Add Variables
              </TabsTrigger>

              <TabsTrigger
                value="list"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600
                 data-[state=active]:text-white dark:data-[state=active]:text-white
                 px-6 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
              >
                List Variables
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="form"
              className="animate-fade-in data-[state=active]:animate-slide-in"
            >
              <VariablesForm />
            </TabsContent>

            <TabsContent
              value="list"
              className="animate-fade-in data-[state=active]:animate-slide-in"
            >
              <ListOfVariables />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
