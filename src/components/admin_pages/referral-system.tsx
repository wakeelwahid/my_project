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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, FilterIcon, MoreHorizontal, EyeIcon, UsersIcon } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { Skeleton } from "@/components/ui/skeleton";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded shadow-sm">
        <p className="text-sm font-semibold">{`${label}`}</p>
        <p className="text-sm">{`Commission: ${formatCurrency(payload[0].value)}`}</p>
      </div>
    );
  }

  return null;
};

export default function ReferralSystem() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string>("commission");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
  const { data: referrals, isLoading } = useQuery({
    queryKey: ["/api/referrals"],
    queryFn: async () => {
      // For demo purposes, we'll construct mock referral data
      // In a real app, you would fetch this from the backend
      return Array.from({ length: 15 }).map((_, i) => ({
        id: i + 1,
        referrerId: Math.floor(i / 3) + 1,
        referrerUsername: `user${Math.floor(i / 3) + 1}`,
        referredId: i + 10,
        referredUsername: `user${i + 10}`,
        commission: Math.floor(Math.random() * 5000) + 500,
        isActive: Math.random() > 0.2,
        createdAt: new Date(Date.now() - (Math.random() * 90 * 24 * 60 * 60 * 1000)).toISOString(),
      }));
    }
  });
  
  const filteredReferrals = referrals?.filter((referral: any) => {
    // Apply search filter
    return searchQuery === "" || 
      referral.referrerUsername.toLowerCase().includes(searchQuery.toLowerCase()) ||
      referral.referredUsername.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  // Sort referrals
  const sortedReferrals = filteredReferrals?.sort((a: any, b: any) => {
    const multiplier = sortOrder === "asc" ? 1 : -1;
    
    if (sortField === "commission") {
      return (a.commission - b.commission) * multiplier;
    } else if (sortField === "date") {
      return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * multiplier;
    }
    
    return 0;
  });
  
  // Top referrers calculation
  const calculateTopReferrers = () => {
    if (!referrals) return [];
    
    const referrerMap: Record<number, { id: number, username: string, count: number, totalCommission: number }> = {};
    
    referrals.forEach((referral: any) => {
      if (!referrerMap[referral.referrerId]) {
        referrerMap[referral.referrerId] = {
          id: referral.referrerId,
          username: referral.referrerUsername,
          count: 0,
          totalCommission: 0
        };
      }
      
      referrerMap[referral.referrerId].count += 1;
      referrerMap[referral.referrerId].totalCommission += referral.commission;
    });
    
    return Object.values(referrerMap)
      .sort((a, b) => b.totalCommission - a.totalCommission)
      .slice(0, 5);
  };
  
  const topReferrers = calculateTopReferrers();
  
  // Chart data
  const chartData = topReferrers.map(referrer => ({
    name: referrer.username,
    commission: referrer.totalCommission
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Referral System</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-full md:col-span-2">
          <CardHeader>
            <CardTitle>Referral Commissions</CardTitle>
            <CardDescription>Track all referral commissions earned by users.</CardDescription>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-4">
              <div className="relative w-full max-w-sm">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  placeholder="Search by username..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Select 
                  value={`${sortField}-${sortOrder}`} 
                  onValueChange={(val) => {
                    const [field, order] = val.split('-');
                    setSortField(field);
                    setSortOrder(order as "asc" | "desc");
                  }}
                >
                  <SelectTrigger className="w-[160px]">
                    <span className="flex items-center">
                      <FilterIcon className="mr-2 h-4 w-4" />
                      <span>Sort by</span>
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="commission-desc">Highest Commission</SelectItem>
                    <SelectItem value="commission-asc">Lowest Commission</SelectItem>
                    <SelectItem value="date-desc">Newest First</SelectItem>
                    <SelectItem value="date-asc">Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <ReferralTableSkeleton />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Referrer</TableHead>
                    <TableHead>Referred User</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedReferrals?.map((referral: any) => (
                    <TableRow key={referral.id}>
                      <TableCell className="font-medium">#{referral.id}</TableCell>
                      <TableCell>
                        <div className="font-medium">#{referral.referrerId}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{referral.referrerUsername}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">#{referral.referredId}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{referral.referredUsername}</div>
                      </TableCell>
                      <TableCell className="font-medium">{formatCurrency(referral.commission)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={referral.isActive ? "success" : "destructive"}
                        >
                          {referral.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(referral.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <EyeIcon className="mr-2 h-4 w-4" />
                              View Referrer Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <EyeIcon className="mr-2 h-4 w-4" />
                              View Referred User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {sortedReferrals?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No referrals found matching your search criteria.
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
            <CardTitle>Top Referrers</CardTitle>
            <CardDescription>Users with highest referral commissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {isLoading ? (
              <Skeleton className="h-[250px] w-full" />
            ) : topReferrers.length > 0 ? (
              <>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                      <defs>
                        <linearGradient id="colorCommission" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-gray-200 dark:stroke-gray-700" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false}
                        tick={{ fontSize: 12 }} 
                        className="text-gray-500 dark:text-gray-400" 
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false}
                        tick={{ fontSize: 12 }} 
                        className="text-gray-500 dark:text-gray-400"
                        tickFormatter={(value) => `₹${value/1000}k`}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="commission" 
                        name="Commission" 
                        fill="url(#colorCommission)" 
                        radius={[4, 4, 0, 0]} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-3">
                  {topReferrers.map((referrer, idx) => (
                    <div key={referrer.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                          <UsersIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">{referrer.username}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {referrer.count} referrals
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatCurrency(referrer.totalCommission)}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          avg. {formatCurrency(referrer.totalCommission / referrer.count)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="py-12 text-center text-gray-500 dark:text-gray-400">
                No referral data available.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ReferralTableSkeleton() {
  return (
    <div className="w-full">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="py-4 flex items-center space-x-4">
            <Skeleton className="h-5 w-10" />
            <div className="space-y-1">
              <Skeleton className="h-5 w-10" />
              <Skeleton className="h-3 w-20" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-5 w-10" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-8 rounded-md ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
