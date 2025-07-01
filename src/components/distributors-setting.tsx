import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import DistributorForm from "./form-components/distributor-form";
import DistributorList from "./distributor-list";

export default function DistributorsSetting({ value }: { value: string }) {
  const [tab, setTab] = useState<"form" | "list">("form");
  const [editDistributorId, setEditDistributorId] = useState<string | null>(null);

  return (
    <TabsContent value={value} className="space-y-6">
      <Tabs value={tab} onValueChange={(value) => setTab(value as "form" | "list")} className="w-full">
        <TabsList className="mb-6 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 gap-2">
          <TabsTrigger
            value="form"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white px-6 py-2 rounded-lg text-sm font-medium"
          >
            Add Distributor
          </TabsTrigger>
          <TabsTrigger
            value="list"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white px-6 py-2 rounded-lg text-sm font-medium"
          >
            List Distributors
          </TabsTrigger>
        </TabsList>

        <TabsContent value="form">
          <DistributorForm
            distributorId={editDistributorId!}
            onDone={() => {
              setEditDistributorId(null);
              setTab("list");
            }}
          />
        </TabsContent>

        <TabsContent value="list">
          <DistributorList
            onEditDistributor={(id: string) => {
              setEditDistributorId(id);
              setTab("form");
            }}
          />
        </TabsContent>
      </Tabs>
    </TabsContent>
  );
}
