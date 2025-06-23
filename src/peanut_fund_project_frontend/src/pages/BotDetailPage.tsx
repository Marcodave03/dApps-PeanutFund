import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { BotDetail, HistoricalPerformance } from '../lib/types';

const fetchBotDetails = async (id: string): Promise<BotDetail | null> => {
  const mockBots: BotDetail[] = [
    {
      id: 1,
      name: 'Trend Follower Pro',
      strategy: 'Trend Following',
      risk: 'Medium',
      performance: '+24.5%',
      description: 'Identifies and follows market trends using moving averages',
      detailedDescription: 'This bot uses a combination of moving averages and RSI to identify and follow market trends. It enters long positions when a short-term moving average crosses above a long-term one and the RSI is not in overbought territory.',
      parameters: {
        'MA Short': '20 periods',
        'MA Long': '50 periods',
        'RSI Period': '14',
        'Take Profit': '5%',
        'Stop Loss': '3%',
      },
      historicalPerformance: [
        { month: 'Jan', return: 5.2 },
        { month: 'Feb', return: 3.8 },
        { month: 'Mar', return: 7.1 },
        { month: 'Apr', return: 4.5 },
        { month: 'May', return: 3.2 },
        { month: 'Jun', return: 6.7 },
      ],
      rating: 4.7,
      reviews: 128,
    },
  ];
  return mockBots.find(bot => bot.id === parseInt(id)) || null;
};

const BotDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [bot, setBot] = useState<BotDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState('overview');
  const { colors } = useTheme();

  useEffect(() => {
    const loadBotDetails = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const data = await fetchBotDetails(id);
        setBot(data);
      } catch (error) {
        console.error('Failed to load bot details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBotDetails();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!bot) {
    return <div className="text-center py-8">Bot not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/marketplace" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
        &larr; Back to Marketplace
      </Link>
      
      <div className={` ${colors.bgCard} rounded-xl shadow-lg p-6 mb-8`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">{bot.name}</h1>
            <p className={`${colors.text} mt-1`}>{bot.strategy} Strategy • {bot.risk} Risk</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
              Subscribe to Bot
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className={`${colors.bg} px-4 py-2 rounded-lg`}>
            <div className="text-sm text-gray-400">30d Return</div>
            <div className="text-xl font-semibold text-green-400">{bot.performance}</div>
          </div>
          <div className={`${colors.bg} px-4 py-2 rounded-xl`}>
            <div className="text-sm text-gray-400">Rating</div>
            <div className="text-xl font-semibold">
              <span className="text-yellow-400">★</span> {bot.rating} ({bot.reviews} reviews)
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={`border-b ${colors.border} mb-6`}>
          <nav className="flex space-x-8">
            {['overview', 'strategy', 'performance', 'reviews'].map((tab: string) => (
              <button
                key={tab}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <p className={`${colors.text}`}>{bot.detailedDescription}</p>
            </div>
          )}

          {activeTab === 'strategy' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Strategy Details</h2>
              <p className={`${colors.text} mb-6`}>{bot.detailedDescription}</p>
              
              <h3 className="text-lg font-semibold mb-3">Parameters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(bot.parameters || {}).map(([key, value]: [string, string]) => (
                  <div key={key} className={`${colors.bg} p-3 rounded-xl`}>
                    <div className={`text-sm ${colors.text}`}>{key}</div>
                    <div className="font-medium">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Historical Performance</h2>
              <div className={`h-64 ${colors.bg} rounded-xl flex items-end p-4 space-x-2`}>
                {bot.historicalPerformance?.map((item: HistoricalPerformance, index: number) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-8 bg-blue-500 rounded-t-sm" 
                      style={{ height: `${Math.min(item.return * 10, 100)}%` }}
                    ></div>
                    <span className="text-xs mt-1">{item.month}</span>
                    <span className="text-xs">{item.return.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">User Reviews</h2>
              <div className="space-y-4">
                <div className={`${colors.bg} p-4 rounded-lg`}>
                  <div className="flex items-center mb-2">
                    <div className="text-yellow-400">★★★★★</div>
                    <span className={`ml-2 text-sm ${colors.text}`}>User123 - 2 days ago</span>
                  </div>
                  <p className={`${colors.text}`}>This bot has been performing exceptionally well for me. The returns have been consistent and the risk management is solid.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BotDetailPage;
