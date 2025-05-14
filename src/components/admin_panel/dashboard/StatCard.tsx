import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/utils/format";

interface StatCardProps {
  title: string;
  value: number;
  percentageChange?: number;
  icon: React.ReactNode;
  isCurrency?: boolean;
  iconBgClass?: string;
  viewAllUrl?: string;
}

export default function StatCard({
  title,
  value,
  percentageChange,
  icon,
  isCurrency = false,
  iconBgClass = "bg-indigo-100 dark:bg-indigo-900/30",
  viewAllUrl
}: StatCardProps) {
  const formattedValue = isCurrency ? formatCurrency(value) : formatNumber(value);
  const showPercentage = percentageChange !== undefined;
  const isPositive = showPercentage && percentageChange >= 0;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 rounded-md p-3 ${iconBgClass}`}>
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              {title}
            </div>
            <div className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900 dark:text-white font-mono">
                {formattedValue}
              </div>
              {showPercentage && (
                <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                  isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {isPositive ? <ArrowUpIcon className="h-3 w-3 mr-0.5" /> : <ArrowDownIcon className="h-3 w-3 mr-0.5" />}
                  <span className="sr-only">{isPositive ? 'Increased by' : 'Decreased by'}</span>
                  {Math.abs(percentageChange).toFixed(1)}%
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      {viewAllUrl && (
        <CardFooter className="bg-gray-50 dark:bg-gray-700/50 px-5 py-3">
          <div className="text-sm">
            <a href={viewAllUrl} className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
              View all
            </a>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
