import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { BotConfig, BotFormData, CustomParameters } from '../lib/types';

const fetchBotConfig = async (id: string): Promise<BotConfig> => {
  console.log(`Fetching config for bot ID: ${id}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: id,
        name: 'Trend Follower Pro',
        isActive: true,
        tradingMode: 'auto',
        apiKey: '••••••••••••••••',
        apiSecret: '••••••••••••••••',
        exchange: 'Binance',
        riskLevel: 'medium',
        maxPositionSize: '10%',
        maxDailyTrades: 5,
        customParameters: {
          'MA Short': '20',
          'MA Long': '50',
          'RSI Period': '14',
          'Take Profit': '5%',
          'Stop Loss': '3%',
        },
      });
    }, 500);
  });
};

const BotConfigPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { colors } = useTheme();

  const [config, setConfig] = useState<BotConfig | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [showApiSecret, setShowApiSecret] = useState<boolean>(false);
  const [formData, setFormData] = useState<BotFormData | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const data = await fetchBotConfig(id);
        setConfig(data);
        setFormData({
          tradingMode: data.tradingMode,
          riskLevel: data.riskLevel,
          maxPositionSize: data.maxPositionSize,
          maxDailyTrades: data.maxDailyTrades,
          customParameters: { ...data.customParameters },
        });
      } catch (error) {
        console.error('Failed to load bot configuration:', error);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, [id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleParamChange = (param: string, value: string) => {
    setFormData((prev) => {
      if (!prev) return null;
      const updatedParams: CustomParameters = {
        ...prev.customParameters,
        [param]: value,
      };
      return { ...prev, customParameters: updatedParams };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData) return;

    setSaving(true);
    try {
      console.log('Saving configuration:', formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert('Configuration saved successfully!');
    } catch (error) {
      console.error('Failed to save configuration:', error);
      alert('Failed to save configuration. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const toggleBotStatus = async () => {
    if (!config) return;

    const newStatus = !config.isActive;
    setConfig((prev) => (prev ? { ...prev, isActive: newStatus } : null));

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log(`Bot ${newStatus ? 'activated' : 'paused'}`);
    } catch (error) {
      console.error('Failed to update bot status:', error);
      setConfig((prev) => (prev ? { ...prev, isActive: !newStatus } : null));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading bot configuration...
      </div>
    );
  }

  if (!config || !formData) {
    return (
      <div className="text-center py-8">
        Bot configuration not found
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold ${colors.text}`}>
          Configure Bot: {config.name}
        </h1>
        <button
          onClick={toggleBotStatus}
          className={`px-4 py-2 rounded-md font-medium ${
            config.isActive
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-green-600 hover:bg-green-700'
          } text-white`}
        >
          {config.isActive ? 'Pause Bot' : 'Activate Bot'}
        </button>
      </div>

      <div className={`${colors.bgCard} p-6 rounded-lg shadow-lg`}>
        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            <div>
              <h2 className={`text-xl font-semibold mb-4 ${colors.text}`}>
                API Credentials
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${colors.text}`}
                  >
                    API Key
                  </label>
                  <div className="relative">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      className={`w-full p-2 rounded ${colors.bg} ${colors.text}`}
                      value={config.apiKey}
                      readOnly
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-sm"
                    >
                      {showApiKey ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${colors.text}`}
                  >
                    API Secret
                  </label>
                  <div className="relative">
                    <input
                      type={showApiSecret ? 'text' : 'password'}
                      className={`w-full p-2 rounded ${colors.bg} ${colors.text}`}
                      value={config.apiSecret}
                      readOnly
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiSecret(!showApiSecret)}
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-sm"
                    >
                      {showApiSecret ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className={`text-xl font-semibold mb-4 ${colors.text}`}>
                Trading Settings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${colors.text}`}
                  >
                    Trading Mode
                  </label>
                  <select
                    name="tradingMode"
                    className={`w-full p-2 rounded ${colors.bg} ${colors.text}`}
                    value={formData.tradingMode}
                    onChange={handleInputChange}
                  >
                    <option value="auto">Auto</option>
                    <option value="manual">Manual</option>
                  </select>
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${colors.text}`}
                  >
                    Risk Level
                  </label>
                  <select
                    name="riskLevel"
                    className={`w-full p-2 rounded ${colors.bg} ${colors.text}`}
                    value={formData.riskLevel}
                    onChange={handleInputChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${colors.text}`}
                  >
                    Max Position Size
                  </label>
                  <input
                    type="text"
                    name="maxPositionSize"
                    className={`w-full p-2 rounded ${colors.bg} ${colors.text}`}
                    value={formData.maxPositionSize}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${colors.text}`}
                  >
                    Max Daily Trades
                  </label>
                  <input
                    type="number"
                    name="maxDailyTrades"
                    className={`w-full p-2 rounded ${colors.bg} ${colors.text}`}
                    value={formData.maxDailyTrades}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className={`text-xl font-semibold mb-4 ${colors.text}`}>
                Bot Parameters
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(formData.customParameters || {}).map(
                  ([param, value]) => (
                    <div key={param} className={`${colors.bg} p-3 rounded-lg`}>
                      <label
                        className={`block text-sm font-medium mb-1 ${colors.text}`}
                      >
                        {param}
                      </label>
                      <input
                        type="text"
                        className={`w-full p-2 rounded ${colors.bgCard} ${colors.text}`}
                        value={value as string}
                        onChange={(e) => handleParamChange(param, e.target.value)}
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            <div
              className={`flex justify-end space-x-4 pt-4 border-t ${colors.border}`}
            >
              <button
                type="button"
                className={`px-4 py-2 border ${colors.border} ${colors.text} ${colors.hover} rounded-md`}
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Configuration'}
                {saving && (
                  <svg
                    className="animate-spin -mr-1 ml-3 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BotConfigPage;
