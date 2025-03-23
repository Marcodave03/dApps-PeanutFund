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
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Skeleton } from "../components/ui/skeleton";
import { Button } from "../components/ui/button";

function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const userId = "USER_ID_EXAMPLE";

  useEffect(() => {
    setIsLoading(true);

    // Promise.all([
    //   fetch(`http://localhost:3000/userbalance/${userId}`),
    //   fetch(`http://localhost:3000/userassets/${userId}`)
    // ])
    //   .then(async ([balanceRes, assetsRes]) => {
    //     const balanceData = await balanceRes.json();
    //     const assetsData = await assetsRes.json();
    //     setBalance(balanceData.totalAmount || 0);
    //     setAssets(assetsData);
    //   })
    //   .catch((err) => console.error(err))
    //   .finally(() => setIsLoading(false));
  }, [userId]);

  return (
    <div className="min-h-screen bg-[#1C223F] text-slate-200 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-sm text-slate-400">
          Welcome back! Here&apos;s an overview of your portfolio.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-[#242A4D] text-slate-200">
          <CardHeader>
            <CardTitle>Total Balance</CardTitle>
            <CardDescription>Your current total holdings</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-6 w-20 bg-slate-600" />
            ) : (
              <p className="text-2xl font-semibold">
                ${balance.toLocaleString()}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#242A4D] text-slate-200">
          <CardHeader>
            <CardTitle>New Bot</CardTitle>
            <CardDescription>Create a new trading bot</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="default"
              className="bg-violet-600 hover:bg-violet-700"
              disabled={isLoading}
            >
              Create Bot
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#242A4D] text-slate-200">
          <CardHeader>
            <CardTitle>Performance</CardTitle>
            <CardDescription>24h change vs. your assets</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-6 w-24 bg-slate-600" />
            ) : (
              <p className="text-lg font-medium text-green-400">+5.12%</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#242A4D] text-slate-200">
        <CardHeader>
          <CardTitle>My Assets</CardTitle>
          <CardDescription>A list of your assets and PnL</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {isLoading ? (
            <>
              <Skeleton className="h-4 w-full mb-2 bg-slate-600" />
              <Skeleton className="h-4 w-[85%] mb-2 bg-slate-600" />
              <Skeleton className="h-4 w-[70%] bg-slate-600" />
            </>
          ) : assets.length === 0 ? (
            <p className="text-sm text-slate-400">No assets found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-slate-300">Asset Name</TableHead>
                  <TableHead className="text-slate-300">Price</TableHead>
                  <TableHead className="text-slate-300">P/L</TableHead>
                  <TableHead className="text-right text-slate-300">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map((asset) => (
                  <TableRow key={asset.AssetID}>
                    <TableCell>{asset.AssetName}</TableCell>
                    <TableCell>{asset.AssetPrice}</TableCell>
                    <TableCell>{asset.AssetPnL}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-400"
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

export default Dashboard;
