import { ArrowDownIcon, ArrowUpIcon, TrophyIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatTimeAgo } from "@/lib/utils/format";

interface Transaction {
  id: number;
  userId: number;
  type: "deposit" | "withdrawal" | "payout";
  amount: number;
  time: string;
  transactionId: string;
}

interface RecentTransactionsTableProps {
  transactions: Transaction[];
  viewAllUrl?: string;
}

export default function RecentTransactionsTable({ transactions, viewAllUrl }: RecentTransactionsTableProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return (
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30">
            <ArrowDownIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
          </span>
        );
      case "withdrawal":
        return (
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30">
            <ArrowUpIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </span>
        );
      case "payout":
        return (
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30">
            <TrophyIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </span>
        );
      default:
        return null;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "deposit":
        return "Deposit";
      case "withdrawal":
        return "Withdrawal";
      case "payout":
        return "Payout";
      default:
        return type;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {getIcon(transaction.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {getTypeLabel(transaction.type)} - User ID: #{transaction.userId}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    Transaction ID: {transaction.transactionId}
                  </p>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatCurrency(transaction.amount)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTimeAgo(transaction.time)}
                  </div>
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
              View all transactions
            </a>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
