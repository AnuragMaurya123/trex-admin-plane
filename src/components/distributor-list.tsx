"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Edit,
  Trash2,
  Users,
  Search,
  Plus,
  Mail,
  Phone,
  MapPin,
  Building,
  CheckCircle,
  XCircle,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Distributor } from "@/lib/types/orderType";
import { useGetDistributors } from "@/hooks/useGetDistributor";
import PageLoading from "./page-loading";
import PageError from "./page-error";
import { useDebounce } from "use-debounce";
import { useDeleteDistributor } from "@/hooks/useDeleteDistributor";
import { toast } from "react-toastify";

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-gradient-to-r from-green-400 to-green-500 text-white border-0";
    case "inactive":
      return "bg-gradient-to-r from-red-400 to-red-500 text-white border-0";
    default:
      return "bg-gradient-to-r from-gray-400 to-gray-500 text-white border-0";
  }
};

export default function DistributorList({
  onEditDistributor,
}: {
  onEditDistributor: (id: string) => void;
}) {
  const { data, isLoading, isError } = useGetDistributors();
  const [distributorToDelete, setDistributorToDelete] =
    useState<Distributor | null>(null);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  // debounce the search term so we only filter after typing pauses
  const [debounced] = useDebounce(searchTerm.trim(), 500);
  const isDebouncing = searchTerm.trim() !== debounced;

  // Filter distributors based on search term
  const filteredData =
    data?.filter((distributor) => {
      if (!searchTerm) return true;

      const searchLower = searchTerm.toLowerCase();
      return (
        distributor.name.toLowerCase().includes(searchLower) ||
        distributor.email.toLowerCase().includes(searchLower) ||
        distributor.city.toLowerCase().includes(searchLower) ||
        distributor.phone.toLowerCase().includes(searchLower) ||
        distributor.state.toLowerCase().includes(searchLower)
      );
    }) || [];

  const { mutate: deleteDistributor, isPending: isDeleting } =
    useDeleteDistributor();

  const handleDeleteDistributor = async (distributorId: string) => {
    deleteDistributor(distributorId, {
      onSuccess: () => {
        toast.success("Distributor deleted successfully");
        setDistributorToDelete(null); // Close dialog on success
      },
      onError: () => {
        toast.error("Failed to delete distributor");
        console.error("Failed to delete distributor");
      },
    });
  };

  if (isLoading || isDeleting) return <PageLoading />;
  if (isError) return <PageError />;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20 p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
                Distributor Management
              </h1>
              <p className="text-slate-600 mt-2 text-sm sm:text-base">
                Manage and monitor all your distribution partners
              </p>
            </div>
          </div>

          {/* Search Section */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  placeholder="Search distributors by name, email, city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 bg-white/80 border-purple-200 focus:border-purple-400 focus:ring-purple-400 text-slate-700 placeholder:text-slate-400"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Card */}
        {isDebouncing ? (
          <PageLoading />
        ) : (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl pt-0">
            <CardHeader className="bg-gradient-to-r pt-6 from-purple-600/10 to-indigo-600/10 border-b border-purple-100">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-800">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
                Distributor Directory
                {data && (
                  <Badge className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 border-0 ml-auto">
                    {searchTerm
                      ? `${filteredData.length} of ${data.length}`
                      : `${data.length} Total`}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-slate-50 to-purple-50/30 border-b border-purple-100">
                      <TableHead className="text-slate-700 font-semibold py-4 px-6">
                        Distributor
                      </TableHead>
                      <TableHead className="text-slate-700 font-semibold py-4">
                        Contact Info
                      </TableHead>
                      <TableHead className="text-slate-700 font-semibold py-4">
                        Location
                      </TableHead>
                      <TableHead className="text-slate-700 font-semibold py-4">
                        Capacity
                      </TableHead>
                      <TableHead className="text-slate-700 font-semibold py-4">
                        Status
                      </TableHead>
                      <TableHead className="text-slate-700 font-semibold py-4 text-center">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((distributor) => (
                      <TableRow
                        key={distributor._id}
                        className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-indigo-50/30 transition-all duration-200"
                      >
                        <TableCell className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {distributor.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-800">
                                {distributor.name}
                              </div>
                              <div className="text-sm text-slate-500">
                                ID: {distributor._id}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Mail className="h-3 w-3 text-purple-500" />
                              {distributor.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Phone className="h-3 w-3 text-indigo-500" />
                              {distributor.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-emerald-500" />
                            <div>
                              <div className="font-medium text-slate-800">
                                {distributor.city}
                              </div>
                              <div className="text-sm text-slate-500">
                                {distributor.state}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-orange-500" />
                            <div className="font-semibold text-slate-800 bg-gradient-to-r from-orange-100 to-amber-100 px-3 py-1 rounded-full text-sm">
                              {distributor.capacity} orders
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <Badge className={getStatusColor(distributor.status)}>
                            <div className="flex items-center gap-1">
                              {distributor.status === "active" ? (
                                <CheckCircle className="h-3 w-3" />
                              ) : (
                                <XCircle className="h-3 w-3" />
                              )}
                              {distributor.status.charAt(0).toUpperCase() +
                                distributor.status.slice(1)}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center justify-center">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="h-8 w-8 p-0 hover:bg-purple-100 hover:text-purple-600 transition-colors duration-200"
                                >
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="bg-white/95 backdrop-blur-sm border-purple-200 shadow-xl"
                              >
                                <DropdownMenuLabel className="text-slate-700 font-semibold">
                                  Actions
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-purple-100" />

                                <DropdownMenuItem
                                  className="text-slate-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                                  onClick={() =>
                                    onEditDistributor(distributor._id)
                                  }
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>

                                <DropdownMenuSeparator className="bg-purple-100" />
                                <DropdownMenuItem
                                  className="text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
                                  onClick={() =>
                                    setDistributorToDelete(distributor)
                                  }
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Empty State */}
              {filteredData.length === 0 && data && data.length > 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">
                    No distributors found
                  </h3>
                  <p className="text-slate-500 mb-4">
                    Try adjusting your search terms
                  </p>
                  <Button
                    onClick={() => setSearchTerm("")}
                    variant="outline"
                    className="border-purple-200 text-purple-600 hover:bg-purple-50"
                  >
                    Clear Search
                  </Button>
                </div>
              )}

              {data && data.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">
                    No distributors found
                  </h3>
                  <p className="text-slate-500 mb-4">
                    Get started by adding your first distributor
                  </p>
                  <Button
                    onClick={() => router.push("/distributors/form")}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Distributor
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          open={!!distributorToDelete}
          onOpenChange={() => setDistributorToDelete(null)}
        >
          <AlertDialogContent className="bg-white/95 backdrop-blur-sm border-red-200">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-slate-800 flex items-center gap-2">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="h-4 w-4 text-red-600" />
                </div>
                Confirm Deletion
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-600">
                This action will permanently delete the distributor{" "}
                <span className="font-semibold text-slate-800">
                  &apos;{distributorToDelete?.name}&apos;
                </span>
                . This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="hover:bg-slate-100 transition-colors duration-200">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  distributorToDelete &&
                  handleDeleteDistributor(distributorToDelete._id)
                }
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Distributor
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
