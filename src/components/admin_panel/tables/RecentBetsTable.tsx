import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatTimeAgo } from "@/lib/utils/format";

interface Bet {
  id: number;
  userId: number;
  username: string;
  userInitials: string;
  game: string;
  betType: string;
  number?: number;
  amount: number;
  status: "Placed" | "Won" | "Lost";
  time: string;
}

interface RecentBetsTableProps {
  bets: Bet[];
  viewAllUrl?: string;
}

export default function RecentBetsTable({ bets, viewAllUrl }: RecentBetsTableProps) {
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "Won":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Lost":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "Placed":
      default:
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-lg font-medium">Recent Bets</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {bets.map((bet) => (
            <li key={bet.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>{bet.userInitials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    User ID: #{bet.userId} - {bet.game} - {bet.betType}
                    {bet.number !== undefined && `: ${bet.number}`}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {formatCurrency(bet.amount)} - {formatTimeAgo(bet.time)}
                  </p>
                </div>
                <div>
                  <Badge className={getBadgeVariant(bet.status)}>
                    {bet.status}
                  </Badge>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      {viewAllUrl && (
        <CardFooter className="bg-gray-50 dark:bg-gray-800 px-5 py-3">
          <div className="text-sm">
            <a
              href={viewAllUrl}
              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              View all bets
            </a>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
