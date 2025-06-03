import { Link } from 'react-router-dom';

const subscribedBots = [
  {
    id: 1,
    name: 'Trend Follower Pro',
    status: 'active',
    exchange: 'Binance',
    performance: '+15.3%',
    lastTrade: '2 hours ago',
  },
  {
    id: 2,
    name: 'Arbitrage Master',
    status: 'paused',
    exchange: 'Coinbase',
    performance: '+8.7%',
    lastTrade: '1 day ago',
  },
];

export default function MyBotsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Trading Bots</h1>
        <Link
          to="/marketplace"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          + Add New Bot
        </Link>
      </div>

      {subscribedBots.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">No Bots Subscribed</h2>
          <p className="text-gray-400 mb-6">
            You haven't subscribed to any trading bots yet. Browse our marketplace to get started.
          </p>
          <Link
            to="/marketplace"
            className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Browse Marketplace
          </Link>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Bot Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Exchange
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Performance
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Last Trade
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {subscribedBots.map((bot) => (
                  <tr key={bot.id} className="hover:bg-gray-750">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{bot.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        bot.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {bot.status.charAt(0).toUpperCase() + bot.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {bot.exchange}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      bot.performance.startsWith('+') ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {bot.performance}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {bot.lastTrade}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/bots/${bot.id}/config`}
                        className="text-blue-400 hover:text-blue-300 mr-4"
                      >
                        Configure
                      </Link>
                      <Link
                        to={`/bots/${bot.id}`}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
