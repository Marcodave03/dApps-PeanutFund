import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { ArrowPathIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

const mockPortfolio = {
  totalValue: 12500.75,
  change24h: 2.5,
  assets: [
    { id: 1, name: 'Bitcoin', symbol: 'BTC', amount: 0.5, value: 10000, change24h: 1.8 },
    { id: 2, name: 'Ethereum', symbol: 'ETH', amount: 10, value: 2500, change24h: 3.2 },
  ],
};

const mockBots = [
  { id: 1, name: 'Trend Follower', status: 'active', profit: 12.5 },
  { id: 2, name: 'Arbitrage Bot', status: 'paused', profit: 5.2 },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const { colors } = useTheme();
  const [portfolio, setPortfolio] = useState(null);
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setPortfolio(mockPortfolio);
      setBots(mockBots);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  if (loading && !refreshing) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className={`${colors.muted}`}>Welcome back, {user?.username || 'Trader'}</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className={`flex items-center gap-2 px-4 py-2 ${colors.bgCard} ${colors.hover} rounded-md transition-colors disabled:opacity-50`}
        >
          <ArrowPathIcon className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Portfolio Summary */}
        <div className={`${colors.bgCard} p-6 rounded-xl shadow-lg`}>
          <div className="flex justify-between items-start">
            <div>
              <p className={`${colors.muted} text-sm font-medium`}>Portfolio Value</p>
              <p className="text-2xl font-bold mt-1">
                ${portfolio?.totalValue?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              portfolio?.change24h >= 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
            }`}>
              {portfolio?.change24h >= 0 ? '↑' : '↓'} {Math.abs(portfolio?.change24h || 0).toFixed(2)}%
            </div>
          </div>
          <div className={`mt-4 pt-4 border-t ${colors.border}`}>
            <Link to="/marketplace" className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
              Explore bots <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 ml-1" />
            </Link>
          </div>
        </div>

        {/* Active Bots */}
        <div className={`${colors.bgCard} p-6 rounded-xl shadow-lg`}>
          <div className="flex justify-between items-start">
            <div>
              <p className={`${colors.muted} text-sm font-medium`}>Active Bots</p>
              <p className="text-2xl font-bold mt-1">
                {bots.filter(bot => bot.status === 'active').length}
                <span className="text-gray-500 text-base font-normal ml-1">/ {bots.length} total</span>
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-900/30 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 1 1 0 001.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className={`mt-4 pt-4 border-t ${colors.border}`}>
            <Link to="/my-bots" className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
              Manage bots <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 ml-1" />
            </Link>
          </div>
        </div>

        {/* Total Profit */}
        <div className={`${colors.bgCard} p-6 rounded-xl shadow-lg`}>
          <div className="flex justify-between items-start">
            <div>
              <p className={`${colors.muted} text-sm font-medium`}>30d Profit</p>
              <p className="text-2xl font-bold mt-1 text-green-400">
                +${bots.reduce((sum, bot) => sum + (bot.profit || 0), 0).toFixed(2)}
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-900/30 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className={`mt-4 pt-4 border-t ${colors.border}`}>
            <Link to="/help" className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
              Learn about profits <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </div>

      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link to="/marketplace" className="group">
          <div className="h-full bg-gradient-to-br from-blue-900/30 to-blue-900/10 p-6 rounded-xl border border-blue-900/30 hover:border-blue-800/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-blue-900/40 flex items-center justify-center group-hover:bg-blue-800/50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <ArrowTopRightOnSquareIcon className="h-5 w-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="font-medium">Add New Bot</h3>
            <p className={`text-sm ${colors.text} mt-1`}>Browse marketplace</p>
          </div>
        </Link>
      
        
        <Link to="/my-bots" className="group">
          <div className="h-full bg-gradient-to-br from-purple-900/30 to-purple-900/10 p-6 rounded-xl border border-purple-900/30 hover:border-purple-800/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-purple-900/40 flex items-center justify-center group-hover:bg-purple-800/50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <ArrowTopRightOnSquareIcon className="h-5 w-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="font-medium">My Bots</h3>
            <p className={`text-sm ${colors.text} mt-1`}>View and manage</p>
          </div>
        </Link>
        
        <Link to="/help" className="group">
          <div className="h-full bg-gradient-to-br from-green-900/30 to-green-900/10 p-6 rounded-xl border border-green-900/30 hover:border-green-800/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-green-900/40 flex items-center justify-center group-hover:bg-green-800/50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <ArrowTopRightOnSquareIcon className="h-5 w-5 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="font-medium">Help Center</h3>
            <p className={`text-sm ${colors.text} mt-1`}>Get support</p>
          </div>
        </Link>
        
        <Link to="/profile" className="group">
          <div className="h-full bg-gradient-to-br from-amber-900/30 to-amber-900/10 p-6 rounded-xl border border-amber-900/30 hover:border-amber-800/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-amber-900/40 flex items-center justify-center group-hover:bg-amber-800/50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <ArrowTopRightOnSquareIcon className="h-5 w-5 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="font-medium">Profile</h3>
            <p className={`text-sm ${colors.text} mt-1`}>Account settings</p>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className={`${colors.bgCard} rounded-xl shadow-lg overflow-hidden`}>
        <div className={`p-6 ${colors.border}`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <p className={`text-sm ${colors.text}`}>Your latest bot activities and trades</p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className={`flex items-center gap-2 px-4 py-2 ${colors.bgCard} hover:${colors.hover} rounded-md transition-colors disabled:opacity-50 text-sm`}
            >
              <ArrowPathIcon className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-700">
          {[
            { 
              id: 1, 
              bot: 'Trend Follower', 
              action: 'Executed BUY order', 
              details: '0.05 BTC @ $42,350.20', 
              time: '2 minutes ago', 
              status: 'completed',
              icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
            },
            { 
              id: 2, 
              bot: 'Arbitrage Bot', 
              action: 'Price difference detected', 
              details: '1.2% on BTC/USDT', 
              time: '15 minutes ago', 
              status: 'alert',
              icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
            },
            { 
              id: 3, 
              bot: 'Trend Follower', 
              action: 'Stop loss triggered', 
              details: '0.1 ETH @ $2,350.75', 
              time: '1 hour ago', 
              status: 'warning',
              icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
            },
            { 
              id: 4, 
              bot: 'Swing Trader', 
              action: 'Take profit reached', 
              details: '+2.5% profit on SOL', 
              time: '3 hours ago', 
              status: 'completed',
              icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
            },
          ].map((activity) => (
            <div key={activity.id} className="p-4 hover:bg-gray-750 transition-colors">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${
                  activity.status === 'completed' ? 'bg-green-900/30 text-green-400' :
                  activity.status === 'warning' ? 'bg-amber-900/30 text-amber-400' :
                  'bg-blue-900/30 text-blue-400'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activity.icon} />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="font-medium">{activity.bot}</h3>
                    <span className={`text-sm text-gray-400`}>{activity.time}</span>
                  </div>
                  <p className={`${colors.text}`}>{activity.action}</p>
                  <p className={`text-sm ${colors.text} truncate`}>{activity.details}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={`p-4 border-t ${colors.border} text-center`}>
          <Link to="/my-bots/activity" className="text-sm text-blue-400 hover:text-blue-300">
            View all activity
          </Link>
        </div>
      </div>
    </div>
  );
}
