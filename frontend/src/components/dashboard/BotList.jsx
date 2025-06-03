import React from 'react';
import { Table, TableHeader, TableHead, TableRow, TableCell, TableBody } from "../ui/table";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const BotList = ({ bots, isLoading, onViewDetails, onInvest }) => {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-md" />
        ))}
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Bot Name</TableHead>
            <TableHead>Strategy</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bots.map((bot) => (
            <TableRow key={bot.BotID}>
              <TableCell className="font-medium">{bot.BotName}</TableCell>
              <TableCell>{bot.StrategyName}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  bot.Status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {bot.Status}
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {bot.Owner === 'your-address' ? 'You' : 'Other User'}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button className="bg-violet-600 hover:bg-violet-700" variant="outline" size="sm" onClick={() => onViewDetails(bot)}>
                  Details
                </Button>
                <Button className="bg-violet-600 hover:bg-violet-700" size="sm" onClick={() => onInvest(bot)}>
                  Invest
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export { BotList };
export default BotList;
