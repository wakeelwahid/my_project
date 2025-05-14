import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { SearchIcon, FilterIcon, CheckIcon, XIcon } from "lucide-react";
import { formatCurrency, formatDateTime } from "@/lib/utils/format";
import { Skeleton } from "@/components/ui/skeleton";
import TransactionApprovalDialog from "@/components/transactions/TransactionApprovalDialog";

export default function DepositRequests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>("pending");
  const [approvalDialog, setApprovalDialog] = useState<{
    open: boolean;
    transaction: any | null;
    action: "approve" | "reject";
  }>({
    open: false,
    transaction: null,
    action: "approve",
  });
  
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["/api/transactions"],
    select: (data) => data.filter((t: any) => t.type === "deposit"),
  });
  
  const filteredTransactions = transactions?.filter((transaction: any) => {
    // Apply search filter
    const matchesSearch = searchQuery === "" || 
      transaction.userId.toString().includes(searchQuery) ||
      (transaction.reference || "").toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter
    const matchesStatus = !statusFilter || transaction.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const openApprovalDialog = (transaction: any, action: "approve" | "reject") => {
    setApprovalDialog({
      open: true,
      transaction,
      action,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Deposit Requests</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Deposits</CardTitle>
          <CardDescription>View and process user deposit requests.</CardDescription>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-4">
            <div className="relative w-full max-w-sm">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search by user ID or reference..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Select value={statusFilter || ""} onValueChange={(value) => setStatusFilter(value || null)}>
                <SelectTrigger className="w-[140px]">
                  <span className="flex items-center">
                    <FilterIcon className="mr-2 h-4 w-4" />
                    <span>{statusFilter || "Status"}</span>
                  </span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <TransactionTableSkeleton />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions?.map((transaction: any) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">#{transaction.id}</TableCell>
                    <TableCell>#{transaction.userId}</TableCell>
                    <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                    <TableCell>{transaction.reference || "-"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.status === "approved" ? "success" :
                          transaction.status === "rejected" ? "destructive" : "default"
                        }
                      >
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDateTime(transaction.createdAt)}</TableCell>
                    <TableCell>
                      {transaction.status === "pending" ? (
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 dark:hover:bg-green-900/30"
                            onClick={() => openApprovalDialog(transaction, "approve")}
                          >
                            <CheckIcon className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/30"
                            onClick={() => openApprovalDialog(transaction, "reject")}
                          >
                            <XIcon className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {transaction.processedAt ? formatDateTime(transaction.processedAt) : "-"}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {filteredTransactions?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No deposit requests found matching your search criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <TransactionApprovalDialog
        transaction={approvalDialog.transaction}
        action={approvalDialog.action}
        open={approvalDialog.open}
        onOpenChange={(open) => setApprovalDialog({ ...approvalDialog, open })}
      />
    </div>
  );
}

function TransactionTableSkeleton() {
  return (
    <div className="w-full">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="py-4 flex items-center space-x-4">
            <Skeleton className="h-5 w-10" />
            <Skeleton className="h-5 w-10" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-5 w-32" />
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-24 rounded-md" />
              <Skeleton className="h-8 w-24 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
