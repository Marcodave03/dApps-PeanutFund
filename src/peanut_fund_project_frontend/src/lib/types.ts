export interface RegistrationPayload {
  InternetID: string;
  InternalUserKey: string;
  Username: string;
  Email: string;
}

export interface ErrorResponse {
  message: string;
}

export interface UsernameUpdateResponse {
  message: string;
}

export interface Asset {
  id: number;
  name: string;
  symbol: string;
  amount: number;
  value: number;
  change24h: number;
}

export interface Portfolio {
  totalValue: number;
  change24h: number;
  assets: Asset[];
}

export interface Bot {
  id: number;
  name: string;
  status: 'active' | 'paused';
  profit: number;
}

export interface Activity {
  id: number;
  botId: number;
  botName: string;
  action: 'BUY' | 'SELL';
  pair: string;
  amount: number;
  price: number;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
}

export interface CustomParameters {
  [key: string]: string;
}

export interface BotConfig {
  id: string;
  name: string;
  isActive: boolean;
  tradingMode: 'auto' | 'manual';
  apiKey: string;
  apiSecret: string;
  exchange: 'Binance' | 'Coinbase' | 'Kraken';
  riskLevel: 'low' | 'medium' | 'high';
  maxPositionSize: string;
  maxDailyTrades: number;
  customParameters: CustomParameters;
}

export type BotFormData = Omit<BotConfig, 'id' | 'name' | 'isActive' | 'apiKey' | 'apiSecret' | 'exchange'>;

export interface HistoricalPerformance {
  month: string;
  return: number;
}

export interface BotDetail {
  id: number;
  name: string;
  strategy: string;
  risk: 'Low' | 'Medium' | 'High';
  performance: string;
  description: string;
  detailedDescription: string;
  parameters: CustomParameters;
  historicalPerformance: HistoricalPerformance[];
  rating: number;
  reviews: number;
}
