import { useQuery } from "@tanstack/react-query";
import { Coins, Users, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getRandomData, getDayNames, formatCurrency } from "@/lib/utils/format";

import StatCard from "@/components/dashboard/StatCard";
import EarningsChart from "@/components/dashboard/EarningsChart";
import UserActivityChart from "@/components/dashboard/UserActivityChart";
import GameEarningsCard from "@/components/dashboard/GameEarningsCard";
import RecentBetsTable from "@/components/tables/RecentBetsTable";
import RecentTransactionsTable from "@/components/tables/RecentTransactionsTable";

// Generate sample chart data for visualization
const generateEarningsData = () => {
  const days = getDayNames(7);
  const earnings = getRandomData(7, 30000, 80000);
  
  return days.map((day, i) => ({
    name: day,
    earnings: earnings[i],
  }));
};

const generateUserActivityData = () => {
  const days = getDayNames(7);
  const activeUsers = getRandomData(7, 600, 1500);
  const newUsers = getRandomData(7, 80, 250);
  
  return days.map((day, i) => ({
    name: day,
    activeUsers: activeUsers[i],
    newUsers: newUsers[i],
  }));
};

// Sample data for recent bets
const recentBets = [
  {
    id: 1,
    userId: 45928,
    username: "user45928",
    userInitials: "UK",
    game: "Gali",
    betType: "Number",
    number: 28,
    amount: 500,
    status: "Placed" as const,
    time: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    userId: 37845,
    username: "user37845",
    userInitials: "RJ",
    game: "Faridabad",
    betType: "Andar",
    amount: 1000,
    status: "Placed" as const,
    time: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    userId: 65432,
    username: "user65432",
    userInitials: "SP",
    game: "Gurgaon",
    betType: "Number",
    number: 75,
    amount: 2000,
    status: "Won" as const,
    time: new Date(Date.now() - 42 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    userId: 24680,
    username: "user24680",
    userInitials: "AM",
    game: "Faridabad",
    betType: "Bahar",
    amount: 1500,
    status: "Lost" as const,
    time: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
];

// Sample data for recent transactions
const recentTransactions = [
  {
    id: 1,
    userId: 24680,
    type: "deposit" as const,
    amount: 5000,
    time: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    transactionId: "TXN89123456",
  },
  {
    id: 2,
    userId: 37845,
    type: "withdrawal" as const,
    amount: 10000,
    time: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    transactionId: "TXN89123457",
  },
  {
    id: 3,
    userId: 65432,
    type: "payout" as const,
    amount: 18000,
    time: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    transactionId: "TXN89123458",
  },
  {
    id: 4,
    userId: 45928,
    type: "deposit" as const,
    amount: 2500,
    time: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    transactionId: "TXN89123459",
  },
];

export default function Dashboard() {
  const { data: dashboardStats, isLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  const earningsData = generateEarningsData();
  const userActivityData = generateUserActivityData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <div className="mt-3 md:mt-0 flex space-x-3">
          <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 text-sm text-gray-700 dark:text-gray-200">
            <option>Today</option>
            <option>Yesterday</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This month</option>
            <option>Last month</option>
          </select>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none">
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </button>
        </div>
      </div>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard 
              title="Total Earnings" 
              value={dashboardStats?.earnings.total || 845392} 
              percentageChange={12.5} 
              icon={<Coins className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />}
              isCurrency={true}
              viewAllUrl="/game-statistics"
            />
            <StatCard 
              title="Today's New Users" 
              value={dashboardStats?.users.today || 0}
              percentageChange={12.5} 
              icon={<Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />} 
              iconBgClass="bg-emerald-100 dark:bg-emerald-900/30"
              viewAllUrl="/users"
            />
            <StatCard 
              title="Total Users" 
              value={dashboardStats?.users.total || 4328}
              subValue={`Today: ${dashboardStats?.users.today || 0} new users`}
              percentageChange={8.2} 
              icon={<Users className="h-5 w-5 text-pink-600 dark:text-pink-400" />} 
              iconBgClass="bg-pink-100 dark:bg-pink-900/30"
              viewAllUrl="/users"
            />
            <StatCard 
              title="Today's Deposits" 
              value={dashboardStats?.deposits.today || 0}
              subValue={`Lifetime: ${formatCurrency(dashboardStats?.deposits.lifetime || 0)}`}
              percentageChange={5.4} 
              icon={<ArrowDownCircle className="h-5 w-5 text-green-600 dark:text-green-400" />} 
              isCurrency={true}
              iconBgClass="bg-green-100 dark:bg-green-900/30"
              viewAllUrl="/deposits"
            />
            <StatCard 
              title="Today's Withdrawals" 
              value={dashboardStats?.withdrawals.today || 0}
              subValue={`Lifetime: ${formatCurrency(dashboardStats?.withdrawals.lifetime || 0)}`}
              percentageChange={-3.2} 
              icon={<ArrowUpCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />} 
              isCurrency={true}
              iconBgClass="bg-amber-100 dark:bg-amber-900/30"
              viewAllUrl="/withdrawals"
            />
            <StatCard 
              title="Weekly Deposits" 
              value={dashboardStats?.deposits.week || 0}
              subValue={`Monthly: ${formatCurrency(dashboardStats?.deposits.month || 0)}`}
              percentageChange={8.1} 
              icon={<ArrowDownCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />} 
              isCurrency={true}
              iconBgClass="bg-blue-100 dark:bg-blue-900/30"
              viewAllUrl="/deposits"
            />
            <StatCard 
              title="Weekly Withdrawals" 
              value={dashboardStats?.withdrawals.week || 0}
              subValue={`Monthly: ${formatCurrency(dashboardStats?.withdrawals.month || 0)}`}
              percentageChange={-2.8} 
              icon={<ArrowUpCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />} 
              isCurrency={true}
              iconBgClass="bg-purple-100 dark:bg-purple-900/30"
              viewAllUrl="/withdrawals"
            />
          </>
        )}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EarningsChart data={earningsData} />
        <UserActivityChart data={userActivityData} />
      </div>
      
      {/* Game-wise Earnings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Game-wise Earnings</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Earnings breakdown by each game</p>
        </div>
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GameEarningsCard 
              name="Gali" 
              description="Most popular game" 
              earnings={245890} 
              percentageChange={14.2} 
              progressPercentage={75} 
              colorClass="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
            />
            <GameEarningsCard 
              name="Faridabad" 
              description="High bet volume" 
              earnings={192450} 
              percentageChange={8.7} 
              progressPercentage={65} 
              colorClass="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
            />
            <GameEarningsCard 
              name="Gurgaon" 
              description="Growing rapidly" 
              earnings={185320} 
              percentageChange={22.5} 
              progressPercentage={60} 
              colorClass="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
            />
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentBetsTable bets={recentBets} viewAllUrl="/bets" />
        <RecentTransactionsTable transactions={recentTransactions} viewAllUrl="/transactions" />
      </div>
    </div>
  );
}

// Skeleton loaders
function StatCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <Skeleton className="h-12 w-12 rounded-md" />
          <div className="ml-5 w-full">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-7 w-32" />
          </div>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700/50 px-5 py-3">
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}
