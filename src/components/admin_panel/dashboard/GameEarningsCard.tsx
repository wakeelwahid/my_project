import { Card, CardContent } from "@/components/ui/card";
import { Dice5 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils/format";

interface GameEarningsCardProps {
  name: string;
  description: string;
  earnings: number;
  percentageChange: number;
  progressPercentage: number;
  colorClass: string;
}

export default function GameEarningsCard({
  name,
  description,
  earnings,
  percentageChange,
  progressPercentage,
  colorClass
}: GameEarningsCardProps) {
  const isPositiveChange = percentageChange >= 0;

  return (
    <Card className="border dark:border-gray-700">
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
          </div>
          <div className={`w-10 h-10 rounded-full ${colorClass} flex items-center justify-center`}>
            <Dice5 className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-4">
          <div className="text-2xl font-semibold text-gray-900 dark:text-white font-mono">
            {formatCurrency(earnings)}
          </div>
          <div className="flex items-center mt-1">
            <span className={`text-sm font-medium ${
              isPositiveChange ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {isPositiveChange ? '+' : ''}{percentageChange.toFixed(1)}%
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">from last month</span>
          </div>
        </div>
        <div className="mt-4">
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
