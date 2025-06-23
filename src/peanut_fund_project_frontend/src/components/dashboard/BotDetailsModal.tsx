import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Table, TableHeader, TableHead, TableRow, TableCell, TableBody } from "../ui/table";
import { Skeleton } from "../ui/skeleton";

export const BotDetailsModal = ({ 
  isOpen, 
  onOpenChange, 
  bot, 
  transactions, 
  isLoading 
}) => {
  if (!bot) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-[#242A5D] text-slate-200">
        <DialogHeader>
          <DialogTitle>{bot.BotName} Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Strategy</h3>
              <p>{bot.StrategyName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                bot.Status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {bot.Status}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Recent Transactions</h3>
            {isLoading ? (
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-md" />
                ))}
              </div>
            ) : (
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Result</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((tx) => (
                      <TableRow key={tx.txId}>
                        <TableCell>{tx.date}</TableCell>
                        <TableCell>{tx.amount}</TableCell>
                        <TableCell>{tx.type}</TableCell>
                        <TableCell 
                          className={`text-right ${
                            tx.result.startsWith('+') ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {tx.result}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
