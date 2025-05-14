import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

interface UserActivityChartProps {
  data: Array<{
    name: string;
    activeUsers: number;
    newUsers: number;
  }>;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded shadow-sm">
        <p className="text-sm text-gray-600 dark:text-gray-300">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export default function UserActivityChart({ data }: UserActivityChartProps) {
  const [timeframe, setTimeframe] = useState("7days");
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    // In a real app, this would fetch new data from an API based on the timeframe
    // For demo, we'll just use the provided data
    setChartData(data);
  }, [timeframe, data]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">User Activity</CardTitle>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[160px] h-8">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
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
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" />
              <Line 
                type="monotone" 
                dataKey="activeUsers" 
                name="Active Users" 
                stroke="hsl(var(--primary))" 
                dot={{ r: 3 }}
                activeDot={{ r: 5, strokeWidth: 0 }} 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="newUsers" 
                name="New Users" 
                stroke="hsl(var(--chart-2))"
                dot={{ r: 3 }}
                activeDot={{ r: 5, strokeWidth: 0 }} 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
