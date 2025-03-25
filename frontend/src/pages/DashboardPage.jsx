import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { BrowserProvider } from "ethers";

import { useAuth } from "../hooks/useAuth";

function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMethod, setAuthMethod] = useState(null);
  const [metaMaskAddress, setMetaMaskAddress] = useState("");
  const [principalId, setPrincipalId] = useState(null);
  const { isAuthenticated, principal, login, logout } = useAuth();
  const [balance, setBalance] = useState(0);
  const [assets, setAssets] = useState([]);
  const [bots, setBots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const [isBotModalOpen, setIsBotModalOpen] = useState(false);
  const [selectedBot, setSelectedBot] = useState(null);
  const [botTransactions, setBotTransactions] = useState([]);
  const [botIsLoading, setBotIsLoading] = useState(false);

  const connectMetamask = async () => {
    if (!window.ethereum) {
      alert("MetaMask belum terinstall!");
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      setAddress(userAddress);
      document.cookie = `PeanutFundtoken=${userAddress}; path=/; secure; samesite=strict`;
    } catch (error) {
      console.error("User rejected ada error:", error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthMethod(null);
    logout();
    setMetaMaskAddress("");
    setPrincipalId(null);
    setBalance(0);
    setAssets([]);
    setBots([]);
  };

  useEffect(() => {
    const isAuthenticatedCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("PeanutFundtoken="));

    if (isAuthenticatedCookie) {
      setIsLoggedIn(true);
    }
    if (!isLoggedIn) return;

    setIsLoading(true);
    setTimeout(() => {
      setBalance(12345);
      setAssets([
        {
          AssetID: "1",
          AssetName: "BTC",
          AssetPrice: "27000",
          AssetPnL: "+5%",
        },
        { AssetID: "2", AssetName: "ETH", AssetPrice: "1800", AssetPnL: "-2%" },
      ]);

      setBots([
        {
          BotID: 100,
          BotName: "BTC Scalper",
          Status: "active",
          StrategyName: "Scalping",
          Owner: metaMaskAddress || principalId,
        },
        {
          BotID: 101,
          BotName: "Momentum Bot",
          Status: "paused",
          StrategyName: "TrendFollowing",
          Owner: "someone-else-address",
        },
        {
          BotID: 102,
          BotName: "Grid Trader",
          Status: "active",
          StrategyName: "Grid",
          Owner: "someone-else-address",
        },
      ]);
      setIsLoading(false);
    }, 1200);
  }, [isLoggedIn, metaMaskAddress, principalId]);

  const openBotDetailModal = (bot) => {
    setSelectedBot(bot);
    setIsBotModalOpen(true);
    setBotIsLoading(true);

    setTimeout(() => {
      setBotTransactions([
        {
          txId: 1,
          date: "2025-04-01",
          amount: "0.5 BTC",
          type: "LONG",
          result: "+$200",
        },
        {
          txId: 2,
          date: "2025-04-03",
          amount: "1.0 BTC",
          type: "SHORT",
          result: "-$50",
        },
      ]);
      setBotIsLoading(false);
    }, 600);
  };

  const closeBotModal = () => {
    setSelectedBot(null);
    setBotTransactions([]);
    setIsBotModalOpen(false);
  };

  const handleToggleAutoExecute = (newValue) => {
    console.log("Toggling auto-execute for bot:", selectedBot, "->", newValue);
  };

  const isUserOwnerOfBot = (bot) => {
    const userId = metaMaskAddress || principalId;
    return bot.Owner === userId;
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col min-h-screen bg-[#1C223F] text-slate-200 items-center justify-center p-6">
        <div className="absolute opacity-10 pointer-events-none bg-[url('https://www.svgrepo.com/show/530666/gene-sequence.svg')] bg-cover bg-no-repeat top-0 left-0 w-full h-full" />
        <div className="z-10 text-center mb-6">
          <h2 className="text-5xl font-bold text-white">PeanutFund</h2>
          <p className="mt-2 mb-10 text-gray-200">
            Automate Your Crypto Trading.
          </p>
        </div>
        <img
          src="login-image.png"
          alt="3D Robot"
          className="z-10 w-2/3 max-w-[400px] mb-8"
        />

        <p className="mb-6">
          You are not logged in. Please connect your wallet:
        </p>

        <div className="flex items-center justify-center space-x-10 mt-2">
          <div
            className="hover:scale-150 transition-transform cursor-pointer"
            onClick={connectMetamask}
          >
            <div className="flex items-center justify-center">
              <img
                src="metamask-logo.png"
                alt="MetaMask"
                className="w-10 h-10"
              />
            </div>
          </div>
          <div
            className="hover:scale-150 transition-transform cursor-pointer"
            onClick={login}
          >
            <div className="flex items-center justify-center">
              <img src="dfinity-logo.png" alt="Dfinity" className="w-10 h-10" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1C223F] text-slate-200 p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-sm text-slate-400">
            Welcome back! Here&apos;s an overview of your portfolio.
          </p>
        </div>
        <Button
          variant="outline"
          className="border-slate-400 bg-red-800"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
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

      <Card className="bg-[#242A4D] text-slate-200 mb-6">
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
                  <TableHead className="text-slate-300">PnL</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map((asset) => (
                  <TableRow key={asset.AssetID}>
                    <TableCell>{asset.AssetName}</TableCell>
                    <TableCell>{asset.AssetPrice}</TableCell>
                    <TableCell>{asset.AssetPnL}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card className="bg-[#242A4D] text-slate-200">
        <CardHeader>
          <CardTitle>All Bots</CardTitle>
          <CardDescription>
            View all bots in the system (balance=0 if not owned)
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
            <p className="text-sm text-slate-400">No bots available.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-slate-300">Bot Name</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Strategy</TableHead>
                  <TableHead className="text-slate-300">Your Balance</TableHead>
                  <TableHead className="text-right text-slate-300">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bots.map((bot) => {
                  const userOwnsBot = isUserOwnerOfBot(bot);
                  const userBotBalance = userOwnsBot ? "1.2 BTC" : "0";
                  return (
                    <TableRow key={bot.BotID}>
                      <TableCell>{bot.BotName}</TableCell>
                      <TableCell>{bot.Status}</TableCell>
                      <TableCell>{bot.StrategyName || "N/A"}</TableCell>
                      <TableCell>{userBotBalance}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700 hover:text-white border-slate-400 mr-2"
                          onClick={() => openBotDetailModal(bot)}
                        >
                          View
                        </Button>
                        {!userOwnsBot && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-slate-400 bg-black"
                            onClick={() => alert(`Invest in ${bot.BotName}?`)}
                          >
                            Invest
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      <Dialog open={isBotModalOpen} onOpenChange={closeBotModal}>
        <DialogContent className="bg-[#242A4D] text-slate-200 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Bot Detail</DialogTitle>
          </DialogHeader>

          {selectedBot && (
            <>
              <div className="space-y-2 mb-4">
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {selectedBot.BotName}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {selectedBot.Status}
                </p>
                <p>
                  <span className="font-semibold">Strategy:</span>{" "}
                  {selectedBot.StrategyName}
                </p>

                {isUserOwnerOfBot(selectedBot) && (
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="autoExecSwitch" className="text-slate-300">
                      Auto-Execute?
                    </Label>
                    <Switch
                      id="autoExecSwitch"
                      onCheckedChange={handleToggleAutoExecute}
                    />
                  </div>
                )}
              </div>

              <p className="font-semibold mb-2">Transactions</p>
              {botIsLoading ? (
                <>
                  <Skeleton className="h-4 w-full mb-2 bg-slate-600" />
                  <Skeleton className="h-4 w-3/4 mb-2 bg-slate-600" />
                </>
              ) : botTransactions.length === 0 ? (
                <p className="text-sm text-slate-400">No transactions yet.</p>
              ) : (
                <div className="overflow-auto border border-slate-600 rounded max-h-64 p-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-slate-300">Date</TableHead>
                        <TableHead className="text-slate-300">Amount</TableHead>
                        <TableHead className="text-slate-300">Type</TableHead>
                        <TableHead className="text-slate-300">Result</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {botTransactions.map((tx) => (
                        <TableRow key={tx.txId}>
                          <TableCell>{tx.date}</TableCell>
                          <TableCell>{tx.amount}</TableCell>
                          <TableCell>{tx.type}</TableCell>
                          <TableCell>{tx.result}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
              <div className="mt-4 text-right">
                <Button
                  variant="default"
                  className="bg-violet-600 hover:bg-violet-700"
                  onClick={closeBotModal}
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Dashboard;
