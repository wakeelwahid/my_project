import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Loader2, AlertTriangle } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";

export default function DeclareResultForm() {
  const [selectedGame, setSelectedGame] = useState<string>("");
  const [winningNumber, setWinningNumber] = useState<string>("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: games, isLoading: gamesLoading } = useQuery({
    queryKey: ["/api/games"],
  });

  // Fetch bets for the selected game
  const { data: gameBets, isLoading: betsLoading } = useQuery({
    queryKey: ["/api/games", selectedGame, "bets"],
    enabled: !!selectedGame,
  });

  const declareResult = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/results/declare", {
        gameId: parseInt(selectedGame),
        resultNumber: parseInt(winningNumber),
        // In a real app, you would get the admin ID from the auth state
        declaredBy: 1,
      });
    },
    onSuccess: async () => {
      setConfirmDialogOpen(false);
      
      toast({
        title: "Result declared successfully",
        description: `Game result has been processed and payouts have been calculated.`,
      });
      
      // Reset form
      setWinningNumber("");
      
      // Invalidate affected queries
      await queryClient.invalidateQueries();
    },
    onError: (error) => {
      setConfirmDialogOpen(false);
      
      toast({
        title: "Error declaring result",
        description: `Failed to declare result: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Calculate popular numbers and stats for the selected game
  const calculateGameStats = () => {
    if (!gameBets) return null;
    
    const totalBets = gameBets.length;
    const totalAmount = gameBets.reduce((sum: number, bet: any) => sum + bet.amount, 0);
    
    // Calculate number frequency
    const numberBets = gameBets.filter((bet: any) => bet.betType === "Number" && bet.betNumber !== undefined);
    const numberFrequency: Record<number, { count: number, amount: number }> = {};
    
    numberBets.forEach((bet: any) => {
      if (!numberFrequency[bet.betNumber]) {
        numberFrequency[bet.betNumber] = { count: 0, amount: 0 };
      }
      numberFrequency[bet.betNumber].count += 1;
      numberFrequency[bet.betNumber].amount += bet.amount;
    });
    
    // Get most picked numbers
    const popularNumbers = Object.entries(numberFrequency)
      .map(([number, stats]) => ({ 
        number: parseInt(number), 
        count: stats.count, 
        amount: stats.amount,
        potentialPayout: stats.amount * 9, // Example payout ratio
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    return {
      totalBets,
      totalAmount,
      estimatedPayout: totalAmount * 0.7, // Example payout estimate
      popularNumbers,
    };
  };

  const gameStats = calculateGameStats();
  
  // Risk level assessment
  const getRiskLevel = (count: number) => {
    if (count > 35) return { level: "High", variant: "destructive" };
    if (count > 25) return { level: "Medium", variant: "warning" };
    return { level: "Low", variant: "success" };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedGame) {
      toast({
        title: "Game selection required",
        description: "Please select a game to declare results for.",
        variant: "destructive",
      });
      return;
    }
    
    if (!winningNumber || parseInt(winningNumber) < 0 || parseInt(winningNumber) > 100) {
      toast({
        title: "Invalid winning number",
        description: "Please enter a valid winning number between 0 and 100.",
        variant: "destructive",
      });
      return;
    }
    
    setConfirmDialogOpen(true);
  };

  const handleConfirmDeclaration = () => {
    declareResult.mutate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="game" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Select Game
          </label>
          <Select value={selectedGame} onValueChange={setSelectedGame}>
            <SelectTrigger id="game" className="w-full">
              <SelectValue placeholder="Select a game" />
            </SelectTrigger>
            <SelectContent>
              {gamesLoading ? (
                <div className="p-2 text-center">Loading games...</div>
              ) : (
                games?.map((game: any) => (
                  <SelectItem key={game.id} value={game.id.toString()}>
                    {game.displayName}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label htmlFor="winning-number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Winning Number (0-100)
          </label>
          <Input
            id="winning-number"
            type="number"
            min="0"
            max="100"
            placeholder="Enter winning number"
            value={winningNumber}
            onChange={(e) => setWinningNumber(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      
      {selectedGame && (
        <div className="mt-8">
          <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">Game Statistics</h4>
          {betsLoading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : gameStats && gameStats.totalBets > 0 ? (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Bets Placed</h5>
                    <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{gameStats.totalBets}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Amount Bet</h5>
                    <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(gameStats.totalAmount)}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">Estimated Payout</h5>
                    <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(gameStats.estimatedPayout)}
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8">
                <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">Most Bet Numbers</h4>
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
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
                      {gameStats.popularNumbers.map((item: any) => {
                        const risk = getRiskLevel(item.count);
                        
                        return (
                          <TableRow key={item.number}>
                            <TableCell className="font-medium">{item.number}</TableCell>
                            <TableCell>{item.count}</TableCell>
                            <TableCell>{formatCurrency(item.amount)}</TableCell>
                            <TableCell>{formatCurrency(item.potentialPayout)}</TableCell>
{item.betType === "Jodi" && (
  <TableCell className="text-sm text-gray-500">
    Pair: {item.betNumber.toString().padStart(2, '0')}
  </TableCell>
)}
                            <TableCell>
                              <Badge variant={risk.variant as any}>
                                {risk.level}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                No bets found for this game. Select a different game or wait for users to place bets.
              </p>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-md">
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Attention</AlertTitle>
          <AlertDescription>
            Declaring results will automatically process all payouts for winning bets and referral commissions. This action cannot be undone.
          </AlertDescription>
        </Alert>
      </div>
      
      <div className="mt-6 flex justify-end">
        <Button type="button" variant="outline" className="mr-3">
          Cancel
        </Button>
        <Button type="submit" disabled={!selectedGame || !winningNumber || declareResult.isPending}>
          {declareResult.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Declare Result"
          )}
        </Button>
      </div>
      
      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Result Declaration</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to declare number <strong>{winningNumber}</strong> as the winning result for this game?
              This action will process all bets and payout winnings immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDeclaration}>
              {declareResult.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
}
