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
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { formatCurrency } from "@/lib/utils/format";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const GAME_TIME_SLOTS = {
  faridabad: "11:00 AM – 4:00 PM",
  ghaziabad: "4:00 PM – 6:00 PM",
  gali: "6:00 PM – 8:00 PM",
  gurgaon: "8:00 PM – 10:00 PM",
  disawar: "10:00 PM – 5:00 AM"
};

const COLORS = ['#3f51b5', '#f50057', '#00bcd4', '#ff9800', '#4caf50'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded shadow-sm">
        <p className="text-sm font-semibold">{`${payload[0].name}`}</p>
        <p className="text-sm">{`Number: ${payload[0].payload.number}`}</p>
        <p className="text-sm">{`Bets: ${payload[0].payload.count}`}</p>
        <p className="text-sm font-semibold">{formatCurrency(payload[0].payload.amount)}</p>
      </div>
    );
  }

  return null;
};

export default function GameStatistics() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedGame, setSelectedGame] = useState("gurgaon");
  const [timeFilter, setTimeFilter] = useState("all");

  const { data: gameStats, isLoading } = useQuery({
    queryKey: ["/api/game-stats"],
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Game Statistics</h1>
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="gali">Gali</TabsTrigger>
          <TabsTrigger value="faridabad">Faridabad</TabsTrigger>
          <TabsTrigger value="gurgaon">Gurgaon</TabsTrigger>
          <TabsTrigger value="desawar">Desawar</TabsTrigger>
          <TabsTrigger value="gaziyabad">Gaziyabad</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-24" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-5 w-20" />
                      </div>
                      <div className="flex justify-between">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-5 w-20" />
                      </div>
                      <div className="flex justify-between">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-5 w-20" />
                      </div>
                      <Skeleton className="h-40 w-full rounded-lg" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gameStats?.map((game: any) => (
                <Card key={game.game.id}>
                  <CardHeader>
                    <CardTitle>{game.game.displayName}</CardTitle>
                    <CardDescription>
                      {game.totalBets} bets placed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Total Amount Bet:</span>
                        <span className="font-semibold">{formatCurrency(game.totalAmount)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Total Payout:</span>
                        <span className="font-semibold">{formatCurrency(game.totalPayout)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Profit:</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          {formatCurrency(game.profit)}
                        </span>
                      </div>

                      <div className="h-40">
                        {game.mostPickedNumbers.length > 0 ? (
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={game.mostPickedNumbers.map((item: any, index: number) => ({
                                  name: `Number ${item.number}`,
                                  value: item.count,
                                  number: item.number,
                                  count: item.count,
                                  amount: item.count * 200 // Approximate bet amount
                                }))}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={60}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {game.mostPickedNumbers.map((_: any, index: number) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip content={<CustomTooltip />} />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="h-full flex items-center justify-center text-gray-400">
                            No data available
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {['gali', 'faridabad', 'gurgaon', 'desawar', 'gaziyabad'].map((gameName) => (
          <TabsContent key={gameName} value={gameName}>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{gameName} Game Details</CardTitle>
                <CardDescription>
                  Detailed statistics and betting patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-6">
                    <Skeleton className="h-6 w-48" />
                    <div className="space-y-2">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-medium mb-4">Most Picked Numbers</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Number</TableHead>
                          <TableHead>Bets</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Potential Payout</TableHead>
                          <TableHead>Risk Level</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {gameStats?.find((g: any) => g.game.name === gameName)?.mostPickedNumbers.map((number: any) => {
                          const amount = number.count * 200; // Approximate bet amount
                          const payout = amount * 9; // Approximate payout ratio

                          let riskLevel;
                          if (number.count > 35) riskLevel = "High";
                          else if (number.count > 25) riskLevel = "Medium";
                          else riskLevel = "Low";

                          return (
                            <TableRow key={number.number}>
                              <TableCell className="font-medium">{number.number}</TableCell>
                              <TableCell>{number.count}</TableCell>
                              <TableCell>{formatCurrency(amount)}</TableCell>
                              <TableCell>{formatCurrency(payout)}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    riskLevel === "High" ? "destructive" : 
                                    riskLevel === "Medium" ? "warning" : "success"
                                  }
                                >
                                  {riskLevel}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

        <Tabs value={selectedGame} onValueChange={setSelectedGame}>
        <TabsList className="grid grid-cols-5 w-full">
          {Object.keys(GAME_TIME_SLOTS).map(game => (
            <TabsTrigger key={game} value={game} className="capitalize">
              {game}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(GAME_TIME_SLOTS).map(([game, timeSlot]) => (
          <TabsContent key={game} value={game}>
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span className="capitalize">{game} Statistics</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    Time Slot: {timeSlot}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Total Bets</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        ₹{gameStats?.totalBets || 0}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Total Payouts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        ₹{gameStats?.totalPayouts || 0}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  {game === "gali" && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Jodi (Pair) Breakdown</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Pair Number</TableHead>
                            <TableHead>Total Bets</TableHead>
                            <TableHead>Total Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {gameStats?.jodiBreakdown?.map((item: any) => (
                            <TableRow key={item.pair}>
                              <TableCell>{item.pair}</TableCell>
                              <TableCell>{item.betCount}</TableCell>
                              <TableCell>₹{item.totalAmount}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Number-wise Breakdown</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Number</TableHead>
                          <TableHead>Total Bets</TableHead>
                          <TableHead>Total Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {gameStats?.numberBreakdown?.map((item: any) => (
                          <TableRow key={item.number}>
                            <TableCell>{item.number}</TableCell>
                            <TableCell>{item.betCount}</TableCell>
                            <TableCell>₹{item.totalAmount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {game === "gurgaon" && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Andar/Bahar Breakdown</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Section</TableHead>
                            <TableHead>Total Bets</TableHead>
                            <TableHead>Total Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {gameStats?.sectionBreakdown?.map((item: any) => (
                            <TableRow key={item.section}>
                              <TableCell className="capitalize">{item.section}</TableCell>
                              <TableCell>{item.betCount}</TableCell>
                              <TableCell>₹{item.totalAmount}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}