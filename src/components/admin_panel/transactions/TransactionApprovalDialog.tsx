import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";

interface TransactionApprovalDialogProps {
  transaction: any;
  action: "approve" | "reject";
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TransactionApprovalDialog({
  transaction,
  action,
  open,
  onOpenChange,
}: TransactionApprovalDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const processTransaction = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/transactions/process", {
        id: transaction.id,
        status: action === "approve" ? "approved" : "rejected",
        // In a real app, you would get the admin ID from the auth state
        processedBy: 1,
      });
    },
    onSuccess: async () => {
      setIsSubmitting(false);
      onOpenChange(false);
      
      const successMessage = action === "approve" 
        ? "Transaction approved successfully" 
        : "Transaction rejected successfully";
      
      toast({
        title: successMessage,
        description: `Transaction ID: ${transaction.id}`,
      });
      
      // Invalidate affected queries
      await queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      await queryClient.invalidateQueries({ queryKey: ["/api/transactions/deposits/pending"] });
      await queryClient.invalidateQueries({ queryKey: ["/api/transactions/withdrawals/pending"] });
      await queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      await queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
    },
    onError: (error) => {
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: `Failed to process transaction: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleAction = async () => {
    setIsSubmitting(true);
    processTransaction.mutate();
  };

  const typeLabel = transaction?.type === "deposit" ? "Deposit" : "Withdrawal";
  const actionLabel = action === "approve" ? "Approve" : "Reject";
  const actionColor = action === "approve" ? "primary" : "destructive";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{actionLabel} {typeLabel} Request</AlertDialogTitle>
          <AlertDialogDescription>
            {action === "approve" ? (
              <span>
                Are you sure you want to approve this {typeLabel.toLowerCase()} request? 
                {transaction?.type === "deposit" 
                  ? " The amount will be added to the user's wallet." 
                  : " The amount will be deducted from the user's wallet."}
              </span>
            ) : (
              <span>
                Are you sure you want to reject this {typeLabel.toLowerCase()} request?
                This action cannot be undone.
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        {transaction && (
          <div className="py-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Transaction ID:</div>
              <div className="font-medium">{transaction.id}</div>
              
              <div className="text-muted-foreground">User ID:</div>
              <div className="font-medium">#{transaction.userId}</div>
              
              <div className="text-muted-foreground">Amount:</div>
              <div className="font-medium">{formatCurrency(transaction.amount)}</div>
              
              <div className="text-muted-foreground">Type:</div>
              <div className="font-medium capitalize">{transaction.type}</div>
              
              <div className="text-muted-foreground">Reference:</div>
              <div className="font-medium">{transaction.reference || "-"}</div>
            </div>
          </div>
        )}
        
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
          <Button
            variant={actionColor as any}
            onClick={handleAction}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              actionLabel
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
