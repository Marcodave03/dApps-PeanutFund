import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "../components/ui/table";
import { Skeleton } from "../components/ui/skeleton";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { useParams } from "react-router-dom";

function BotDetailPage() {
  const { botId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [bot, setBot] = useState(null);
  const [strategy, setStrategy] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [autoExecute, setAutoExecute] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);
  //   Promise.all([
  //     fetch(`http://localhost:3000/botstrategy/${botId}`),
  //     fetch(`http://localhost:3000/bottransactions/${botId}`),
  //     fetch(`http://localhost:3000/botmodels/${botId}`),
  //     fetch(`http://localhost:3000/userbots/${YOUR_USER_ID}`),
  //   ])
  //     .then(async ([strategyRes, transactionsRes, modelRes, botsRes]) => {
  //       const strategyData = await strategyRes.json();
  //       const transactionsData = await transactionsRes.json();
  //       const modelData = await modelRes.json();
  //       const botsData = await botsRes.json();

  //       const currentBot = botsData.find((b) => b.BotID === botId);

  //       setStrategy(strategyData);
  //       setTransactions(transactionsData);
  //       setBot({ ...currentBot, model: modelData });

  //       setAutoExecute(currentBot?.autoExecute || false);
  //     })
  //     .catch((err) => console.error(err))
  //     .finally(() => setIsLoading(false));
  // }, [botId]);

  // const handleToggleAutoExecute = () => {
  //   setAutoExecute(!autoExecute);
  //   fetch(`http://localhost:3000/toggleAutoExecute/${botId}`, {
  //     method: "PUT",
  //     body: JSON.stringify({ autoExecute: !autoExecute }),
  //   });
  // };

  return (
    <div className="min-h-screen bg-[#1C223F] text-slate-200 p-6 space-y-6">
      <header className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Bot Details</h1>
        <p className="text-sm text-slate-400">
          Review the strategy, performance, and activity of this bot.
        </p>
      </header>
      <Card className="bg-[#242A4D] text-slate-200">
        <CardHeader>
          {isLoading ? (
            <Skeleton className="h-6 w-32 mb-2 bg-slate-600" />
          ) : (
            <CardTitle>{bot?.BotName || "Unnamed Bot"}</CardTitle>
          )}
          <CardDescription>
            {isLoading ? (
              <Skeleton className="h-4 w-1/3 bg-slate-600" />
            ) : (
              `Status: ${bot?.Status || "unknown"}`
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <>
              <Skeleton className="h-4 w-2/3 mb-2 bg-slate-600" />
              <Skeleton className="h-4 w-1/2 bg-slate-600" />
            </>
          ) : (
            <>
              <p className="mb-2">
                <span className="font-semibold">Model:</span>{" "}
                {bot?.model?.ModelName} ({bot?.model?.ModelType})
              </p>
              <div className="flex items-center space-x-4 mt-4">
                <Label htmlFor="autoExecSwitch" className="text-slate-300">
                  Auto-Execute?
                </Label>
                <Switch
                  id="autoExecSwitch"
                  checked={autoExecute}
                  onCheckedChange={() => {
                    /* handleToggleAutoExecute() */
                  }}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="bg-[#242A4D] text-slate-200">
        <CardHeader>
          <CardTitle>Strategy</CardTitle>
          <CardDescription>
            {isLoading ? (
              <Skeleton className="h-4 w-20 bg-slate-600" />
            ) : (
              strategy?.StrategyType || "N/A"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-4 w-full bg-slate-600" />
          ) : (
            <p>{strategy?.StrategyDescription}</p>
          )}
        </CardContent>
      </Card>

      <Card className="bg-[#242A4D] text-slate-200">
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            A record of recent trades executed by this bot
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {isLoading ? (
            <>
              <Skeleton className="h-4 w-full mb-2 bg-slate-600" />
              <Skeleton className="h-4 w-[85%] mb-2 bg-slate-600" />
              <Skeleton className="h-4 w-[70%] bg-slate-600" />
            </>
          ) : transactions.length === 0 ? (
            <p className="text-sm text-slate-400">No transactions found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-slate-300">Date</TableHead>
                  <TableHead className="text-slate-300">Price</TableHead>
                  <TableHead className="text-slate-300">Amount</TableHead>
                  <TableHead className="text-slate-300">Type</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.TransactionID}>
                    <TableCell>{new Date().toLocaleString()}</TableCell>
                    <TableCell>{tx.Price}</TableCell>
                    <TableCell>{tx.Amount}</TableCell>
                    <TableCell>{tx.Transaction_Type}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-400"
                        onClick={() =>
                          alert(`Viewing transaction ${tx.TransactionID}`)
                        }
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default BotDetailPage;
