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
import { Link } from "react-router-dom";

function BotListPage() {
  const [bots, setBots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // const userId = "USER_ID_EXAMPLE";
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(`http://localhost:3000/userbots/${userId}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setBots(data);
  //     })
  //     .catch((err) => console.error(err))
  //     .finally(() => setIsLoading(false));
  // }, [userId]);

  return (
    <div className="min-h-screen bg-[#1C223F] text-slate-200 p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">My Bots</h1>
        <p className="text-sm text-slate-400">
          Manage your trading bots and view their performance.
        </p>
      </header>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Card className="bg-[#242A4D] text-slate-200 w-full md:w-auto">
          <CardHeader>
            <CardTitle>Total Bots</CardTitle>
            <CardDescription>
              The number of active bots you have
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-6 w-6 bg-slate-600" />
            ) : (
              <span className="text-2xl font-semibold">{bots.length}</span>
            )}
          </CardContent>
        </Card>

        <Button
          variant="default"
          className="bg-violet-600 hover:bg-violet-700"
          disabled={isLoading}
        >
          <Link to="/create-bot">Create Bot</Link>
        </Button>
      </div>

      <Card className="bg-[#242A4D] text-slate-200">
        <CardHeader>
          <CardTitle>Bot List</CardTitle>
          <CardDescription>
            A list of your configured trading bots
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {isLoading ? (
            <>
              <Skeleton className="h-4 w-full mb-2 bg-slate-600" />
              <Skeleton className="h-4 w-[85%] mb-2 bg-slate-600" />
              <Skeleton className="h-4 w-[70%] bg-slate-600" />
            </>
          ) : bots.length === 0 ? (
            <p className="text-sm text-slate-400">
              You don&apos;t have any bots yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-slate-300">Bot Name</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Strategy</TableHead>
                  <TableHead className="text-right text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bots.map((bot) => (
                  <TableRow key={bot.BotID}>
                    <TableCell>{bot.BotName}</TableCell>
                    <TableCell>{bot.Status}</TableCell>
                    <TableCell>{bot.StrategyName || "N/A"}</TableCell>
                    <TableCell className="text-right">
                      <Link to={`/bots/${bot.BotID}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-400"
                        >
                          View
                        </Button>
                      </Link>
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

export default BotListPage;
