import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

export const PortfolioSummary = ({ balance, assets, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <div className="h-6 w-48 bg-muted rounded animate-pulse"></div>
          <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="h-8 w-32 bg-muted rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6 bg-[#242A5D] text-slate-200">
      <CardHeader>
        <CardTitle>Portfolio Summary</CardTitle>
        <CardDescription>Your current portfolio overview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${balance.toLocaleString()}</div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {assets.map((asset) => (
            <div key={asset.AssetID} className="p-3 border rounded-lg">
              <div className="font-medium">{asset.AssetName}</div>
              <div className="text-muted-foreground">${asset.AssetPrice}</div>
              <div className={asset.AssetPnL.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                {asset.AssetPnL}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
