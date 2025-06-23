import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createBot } from '../lib/api';
import { useTheme } from '../contexts/ThemeContext';

const mockBots = [
  {
    id: 1,
    name: 'Trend Follower Pro',
    strategy: 'Trend Following',
    risk: 'Medium',
    performance: '+24.5%',
    description: 'Identifies and follows market trends using moving averages',
    rating: 4.7,
  },
  {
    id: 2,
    name: 'Arbitrage Master',
    strategy: 'Arbitrage',
    risk: 'Low',
    performance: '+12.3%',
    description: 'Exploits price differences across exchanges',
    rating: 4.2,
  },
];

export default function MarketplacePage() {
  const { user } = useAuth();
  const [investingBotId, setInvestingBotId] = useState(null);
  const [filters, setFilters] = useState({
    strategy: '',
    risk: '',
    sortBy: 'rating',
  });
  const { colors } = useTheme();

  const filteredBots = mockBots.filter(bot => {
    if (filters.strategy && bot.strategy !== filters.strategy) return false;
    if (filters.risk && bot.risk !== filters.risk) return false;
    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    if (filters.sortBy === 'performance') {
      return parseFloat(b.performance) - parseFloat(a.performance);
    }
    return 0;
  });

  const handleInvest = async (bot) => {
    if (!user || !user.address) { 
      alert('Please log in to invest.');
      return;
    }
    setInvestingBotId(bot.id);
    const payload = {
      BotName: bot.name,
      BotAPI: `https://api.example.com/bot/${bot.id}`, 
      Status: "Active", 
      ModelName: bot.strategy ? bot.strategy.replace(/\s+/g, '') + 'Model' : "DefaultModel", 
      Architecture: "DefaultArch", 
      ModelType: "AI-Predictor", 
      StrategyName: bot.strategy,
      StrategyType: bot.risk, 
      StrategyDescription: bot.description,
      UserId: user.address 
    };

    try {
      const result = await createBot(payload);
      alert(`Successfully invested in ${bot.name}! ${result.message || (result.BotId ? `Bot ID: ${result.BotId}` : '')}`);
    } catch (error) {
      console.error("Investment failed for bot:", bot.name, error);
      alert(`Failed to invest in ${bot.name}: ${error.message}`);
    } finally {
      setInvestingBotId(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Trading Bots Marketplace</h1>
      
      {/* Filters */}
      <div className={`${colors.bgCard} p-6 rounded-xl shadow-lg mb-8`}>
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Strategy</label>
            <select 
              className={`w-full p-2 rounded ${colors.border}   ${colors.bgCard} ${colors.text}`}
              value={filters.strategy}
              onChange={(e) => setFilters({...filters, strategy: e.target.value})}
            >
              <option value="">All Strategies</option>
              <option value="Trend Following">Trend Following</option>
              <option value="Arbitrage">Arbitrage</option>
              <option value="Mean Reversion">Mean Reversion</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Risk Level</label>
            <select 
              className={`w-full p-2 rounded ${colors.border}   ${colors.bgCard} ${colors.text}`}
              value={filters.risk}
              onChange={(e) => setFilters({...filters, risk: e.target.value})}
            >
              <option value="">All Risk Levels</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Sort By</label>
            <select 
              className={`w-full p-2 rounded ${colors.border}   ${colors.bgCard} ${colors.text}`}
              value={filters.sortBy}
              onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
            >
              <option value="rating">Highest Rating</option>
              <option value="performance">Best Performance</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBots.map((bot) => (
          <div key={bot.id} className={`${colors.bgCard} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow`}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className={`text-xl font-bold ${colors.text}`}>{bot.name}</h3>
                <span className={`px-3 py-1 bg-blue-200 rounded-full text-sm font-semibold ${colors.text}`}>
                  {bot.risk}
                </span>
              </div>
              <p className={`${colors.text} mb-4`}>{bot.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1">{bot.rating}</span>
                </div>
                <div className="text-green-400 font-semibold">
                  {bot.performance} (30d)
                </div>
              </div>
              <Link 
                to={`/bots/${bot.id}`}
                className="mt-4 block w-full text-center bg-blue-700 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                View Details
              </Link>
              <button
                onClick={() => handleInvest(bot)}
                disabled={investingBotId === bot.id}
                className="mt-2 block w-full text-center bg-green-700 hover:bg-green-900 text-white font-semibold py-2 px-4 rounded transition-colors disabled:opacity-50"
              >
                {investingBotId === bot.id ? 'Investing...' : 'Invest'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
