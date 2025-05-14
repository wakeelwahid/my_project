import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import DeclareResultForm from "@/components/results/DeclareResultForm";
import { useQuery } from "@tanstack/react-query";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/utils/format";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function ResultDeclaration() {
  // Fetch recent results
  const { data: recentResults, isLoading: resultsLoading } = useQuery({
    queryKey: ["/api/results/recent"],
    queryFn: async () => {
      // For demo purposes, we'll construct mock recent results
      // In a real app, you would fetch this from the backend
      return Array.from({ length: 5 }).map((_, i) => ({
        id: 5 - i,
        gameId: (i % 5) + 1,
        gameName: ["Gali", "Faridabad", "Gurgaon", "Desawar", "Gaziyabad"][i % 5],
        resultNumber: Math.floor(Math.random() * 100),
        declaredAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
        declaredBy: 1
      }));
    }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Result Declaration</h1>
      
      <Tabs defaultValue="declare">
        <TabsList className="mb-6">
          <TabsTrigger value="declare">Declare Results</TabsTrigger>
          <TabsTrigger value="history">Result History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="declare">
          <Card>
            <CardHeader>
              <CardTitle>Declare Game Result</CardTitle>
              <CardDescription>
                Select a game and enter the winning number to declare results and process payouts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DeclareResultForm />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Recent Results</CardTitle>
              <CardDescription>
                History of recently declared game results.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {resultsLoading ? (
                <ResultsTableSkeleton />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Game</TableHead>
                      <TableHead>Winning Number</TableHead>
                      <TableHead>Declared By</TableHead>
                      <TableHead>Declared At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentResults?.map((result: any) => (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium">#{result.id}</TableCell>
                        <TableCell>{result.gameName}</TableCell>
                        <TableCell className="text-lg font-semibold">{result.resultNumber}</TableCell>
                        <TableCell>Admin User</TableCell>
                        <TableCell>{formatDateTime(result.declaredAt)}</TableCell>
                      </TableRow>
                    ))}
                    {!recentResults?.length && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-gray-500 dark:text-gray-400">
                          No results have been declared yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ResultsTableSkeleton() {
  return (
    <div className="w-full">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="py-4 flex items-center space-x-6">
            <Skeleton className="h-5 w-10" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-10" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-32" />
          </div>
        ))}
      </div>
    </div>
  );
}
