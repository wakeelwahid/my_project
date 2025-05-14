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
import { 
  EyeIcon,
  FilterIcon,
  SearchIcon,
  ChevronDownIcon
} from "lucide-react";
import { formatCurrency, formatDateTime } from "@/lib/utils/format";
import { Skeleton } from "@/components/ui/skeleton";

export default function BetManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [gameFilter, setGameFilter] = useState<string | null>(null);
  const [betTypeFilter, setBetTypeFilter] = useState<string | null>(null);
  
  const { data: bets = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/bets"],
  });
  
  const { data: games = [] } = useQuery<any[]>({
    queryKey: ["/api/games"],
  });
  
  const applyFilters = (bet: any) => {
    // Apply search filter
    const matchesSearch = searchQuery === "" || 
      bet.userId.toString().includes(searchQuery) ||
      (bet.betNumber?.toString() || "").includes(searchQuery);
    
    // Apply status filter
    const matchesStatus = !statusFilter || statusFilter === "all" || bet.status === statusFilter;
    
    // Apply game filter
    const matchesGame = !gameFilter || gameFilter === "all" || bet.gameId.toString() === gameFilter;
    
    // Apply bet type filter
    const matchesBetType = !betTypeFilter || betTypeFilter === "all" || bet.betType === betTypeFilter;
    
    return matchesSearch && matchesStatus && matchesGame && matchesBetType;
  };
  
  const filteredBets = bets?.filter(applyFilters);

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Bet Management</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Bets</CardTitle>
          <CardDescription>View and analyze all bets placed on the platform.</CardDescription>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-4">
            <div className="relative w-full max-w-sm">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search by user ID or bet number..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Select value={statusFilter || "all"} onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}>
                <SelectTrigger className="w-[140px]">
                  <span className="flex items-center">
                    <FilterIcon className="mr-2 h-4 w-4" />
                    <span>{statusFilter === "all" ? "Status" : statusFilter || "Status"}</span>
                  </span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="placed">Placed</SelectItem>
                  <SelectItem value="won">Won</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={gameFilter || "all"} onValueChange={(value) => setGameFilter(value === "all" ? null : value)}>
                <SelectTrigger className="w-[140px]">
                  <span className="flex items-center">
                    <FilterIcon className="mr-2 h-4 w-4" />
                    <span>{gameFilter && gameFilter !== "all" ? games?.find((g: any) => g.id.toString() === gameFilter)?.displayName || "Game" : "Game"}</span>
                  </span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Games</SelectItem>
                  {games?.map((game: any) => (
                    <SelectItem key={game.id} value={game.id.toString()}>{game.displayName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={betTypeFilter || "all"} onValueChange={(value) => setBetTypeFilter(value === "all" ? null : value)}>
                <SelectTrigger className="w-[140px]">
                  <span className="flex items-center">
                    <FilterIcon className="mr-2 h-4 w-4" />
                    <span>{betTypeFilter === "all" ? "Bet Type" : betTypeFilter || "Bet Type"}</span>
                  </span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Number">Number</SelectItem>
                  <SelectItem value="Andar">Andar</SelectItem>
                  <SelectItem value="Bahar">Bahar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <BetTableSkeleton />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bet ID</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Game</TableHead>
                  <TableHead>Bet Type</TableHead>
                  <TableHead>Number</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBets?.map((bet: any) => {
                  const game = games?.find((g: any) => g.id === bet.gameId);
                  
                  return (
                    <TableRow key={bet.id}>
                      <TableCell className="font-medium">#{bet.id}</TableCell>
                      <TableCell>#{bet.userId}</TableCell>
                      <TableCell>{game?.displayName || "-"}</TableCell>
                      <TableCell>{bet.betType}</TableCell>
                      <TableCell>{bet.betNumber !== undefined ? bet.betNumber : "-"}</TableCell>
                      <TableCell>{formatCurrency(bet.amount)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            bet.status === "won" ? "success" : 
                            bet.status === "lost" ? "destructive" : "default"
                          }
                        >
                          {bet.status.charAt(0).toUpperCase() + bet.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDateTime(bet.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <ChevronDownIcon className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <EyeIcon className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filteredBets?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No bets found matching your search criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function BetTableSkeleton() {
  return (
    <div className="w-full">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="py-4 flex items-center space-x-3">
            <Skeleton className="h-5 w-10" />
            <Skeleton className="h-5 w-10" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-10" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-8 w-8 rounded-md ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
