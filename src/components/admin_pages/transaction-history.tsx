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
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  SearchIcon, 
  FilterIcon, 
  ArrowDownIcon, 
  ArrowUpIcon, 
  TrophyIcon, 
  UsersIcon,
  CalendarIcon,
  FileDownIcon
} from "lucide-react";
import { formatCurrency, formatDateTime } from "@/lib/utils/format";
import { Skeleton } from "@/components/ui/skeleton";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { format } from "date-fns";

const COLORS = ['#3f51b5', '#f50057', '#00bcd4', '#ff9800'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded shadow-sm">
        <p className="text-sm font-semibold">{`${payload[0].name}`}</p>
        <p className="text-sm">{`${formatCurrency(payload[0].value)} (${payload[0].payload.percentage}%)`}</p>
      </div>
    );
  }

  return null;
};

export default function TransactionHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["/api/transactions"],
  });
  
  const filteredTransactions = transactions?.filter((transaction: any) => {
    // Apply search filter
    const matchesSearch = searchQuery === "" || 
      transaction.userId.toString().includes(searchQuery) ||
      (transaction.reference || "").toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply type filter
    const matchesType = !typeFilter || transaction.type === typeFilter;
    
    // Apply status filter
    const matchesStatus = !statusFilter || transaction.status === statusFilter;
    
    // Apply date range filter
    const transactionDate = new Date(transaction.createdAt);
    const matchesDateFrom = !dateRange.from || transactionDate >= dateRange.from;
    const matchesDateTo = !dateRange.to || transactionDate <= dateRange.to;
    
    return matchesSearch && matchesType && matchesStatus && matchesDateFrom && matchesDateTo;
  });

  // Calculate transaction stats for visualization
  const calculateTransactionStats = () => {
    if (!filteredTransactions) return [];
    
    const typeAmounts: Record<string, number> = {
      deposit: 0,
      withdrawal: 0,
      payout: 0,
      referral: 0
    };
    
    let total = 0;
    
    filteredTransactions.forEach((transaction: any) => {
      if (transaction.status === "approved") {
        if (transaction.type in typeAmounts) {
          typeAmounts[transaction.type] += transaction.amount;
          total += transaction.amount;
        }
      }
    });
    
    return Object.entries(typeAmounts).map(([type, amount]) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1) + "s",
      value: amount,
      percentage: total > 0 ? ((amount / total) * 100).toFixed(1) : "0"
    }));
  };

  const transactionStats = calculateTransactionStats();
  
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownIcon className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case "withdrawal":
        return <ArrowUpIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />;
      case "payout":
        return <TrophyIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case "referral":
        return <UsersIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Transaction History</h1>
        <Button>
          <FileDownIcon className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-full md:col-span-2">
          <CardHeader>
            <CardTitle>All Transactions</CardTitle>
            <CardDescription>Complete history of all platform transactions.</CardDescription>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-4 flex-wrap">
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
                <Select value={typeFilter || ""} onValueChange={(value) => setTypeFilter(value || null)}>
                  <SelectTrigger className="w-[140px]">
                    <span className="flex items-center">
                      <FilterIcon className="mr-2 h-4 w-4" />
                      <span>Type</span>
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="deposit">Deposits</SelectItem>
                    <SelectItem value="withdrawal">Withdrawals</SelectItem>
                    <SelectItem value="payout">Payouts</SelectItem>
                    <SelectItem value="referral">Referrals</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter || ""} onValueChange={(value) => setStatusFilter(value || null)}>
                  <SelectTrigger className="w-[140px]">
                    <span className="flex items-center">
                      <FilterIcon className="mr-2 h-4 w-4" />
                      <span>Status</span>
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[180px] justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "PP")} - {format(dateRange.to, "PP")}
                          </>
                        ) : (
                          format(dateRange.from, "PP")
                        )
                      ) : (
                        "Date Range"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                    <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDateRange({ from: undefined, to: undefined })}
                      >
                        Clear
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          // Apply date filter
                        }}
                      >
                        Apply
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
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
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Date & Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions?.map((transaction: any) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">#{transaction.id}</TableCell>
                      <TableCell>#{transaction.userId}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getTransactionIcon(transaction.type)}
                          <span className="ml-2 capitalize">{transaction.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(transaction.amount)}</TableCell>
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
                      <TableCell className="max-w-[200px] truncate">
                        {transaction.reference || "-"}
                      </TableCell>
                      <TableCell>{formatDateTime(transaction.createdAt)}</TableCell>
                    </TableRow>
                  ))}
                  {filteredTransactions?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No transactions found matching your search criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Transaction Summary</CardTitle>
            <CardDescription>Breakdown by transaction type</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[300px] flex items-center justify-center">
                <Skeleton className="h-full w-full rounded-lg" />
              </div>
            ) : transactionStats.length > 0 && transactionStats.some(item => item.value > 0) ? (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={transactionStats}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {transactionStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500 dark:text-gray-400">
                No transaction data available for the selected filters.
              </div>
            )}
            
            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Total Transactions</div>
                  <div className="text-xl font-semibold mt-1">{filteredTransactions?.length || 0}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Total Volume</div>
                  <div className="text-xl font-semibold mt-1">
                    {formatCurrency(
                      filteredTransactions?.reduce((sum: number, t: any) => sum + t.amount, 0) || 0
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function TransactionTableSkeleton() {
  return (
    <div className="w-full">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="py-4 flex items-center space-x-4">
            <Skeleton className="h-5 w-10" />
            <Skeleton className="h-5 w-10" />
            <Skeleton className="h-5 w-24 flex items-center">
              <Skeleton className="h-4 w-4 mr-2 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </Skeleton>
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-32" />
          </div>
        ))}
      </div>
    </div>
  );
}
