import { useState } from 'react';

export default function HelpPage() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [activeQuestion, setActiveQuestion] = useState(null);

  const faqData = {
    general: [
      {
        question: 'What is PeanutFund?',
        answer: 'PeanutFund is a platform that allows you to automate your cryptocurrency trading using various trading bots. You can subscribe to different trading strategies and let the bots execute trades on your behalf based on predefined parameters.'
      },
      {
        question: 'How do I get started?',
        answer: 'To get started, create an account, connect your preferred exchange API, and subscribe to a trading bot. You can then configure the bot parameters according to your risk tolerance and trading preferences.'
      },
      {
        question: 'Is my API key secure?',
        answer: 'Yes, we take security very seriously. Your API keys are encrypted and stored securely. We only request the minimum required permissions, and we never store your private API secret in plaintext.'
      },
    ],
    bots: [
      {
        question: 'How do I choose the right bot?',
        answer: 'Different bots have different strategies and risk profiles. Consider your risk tolerance, investment goals, and market conditions when choosing a bot. You can review each bot\'s performance history and strategy details before subscribing.'
      },
      {
        question: 'Can I use multiple bots at once?',
        answer: 'Yes, you can subscribe to and run multiple bots simultaneously. This can help diversify your trading strategies and manage risk more effectively.'
      },
      {
        question: 'How often do the bots trade?',
        answer: 'Trading frequency depends on the specific bot and market conditions. Some bots may make multiple trades per day, while others may trade less frequently. You can usually adjust the trading frequency in the bot settings.'
      },
    ],
    account: [
      {
        question: 'How do I reset my password?',
        answer: 'To reset your password, go to the login page and click on "Forgot Password." Follow the instructions sent to your registered email address to create a new password.'
      },
      {
        question: 'How do I update my email address?',
        answer: 'You can update your email address in the Account Settings section of your profile. You\'ll need to verify your new email address before it becomes active.'
      },
    ],
    billing: [
      {
        question: 'What are the subscription fees?',
        answer: 'Subscription fees vary depending on the bot and the plan you choose. You can view the pricing details on each bot\'s page before subscribing. We offer both monthly and annual billing cycles.'
      },
      {
        question: 'How do I cancel my subscription?',
        answer: 'You can cancel your subscription at any time from the Subscriptions section of your account. Your subscription will remain active until the end of the current billing period.'
      },
      {
        question: 'Do you offer refunds?',
        answer: 'We offer a 7-day money-back guarantee for new subscribers. If you\'re not satisfied with our service, you can request a full refund within 7 days of your initial subscription.'
      },
    ],
  };

  const categories = [
    { id: 'general', name: 'General' },
    { id: 'bots', name: 'Trading Bots' },
    { id: 'account', name: 'Account' },
    { id: 'billing', name: 'Billing & Subscriptions' },
  ];

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Help & Support</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-gray-800 rounded-lg p-4 sticky top-4">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <nav className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">
              {categories.find(c => c.id === activeCategory)?.name} FAQs
            </h2>
            
            <div className="space-y-4">
              {faqData[activeCategory]?.map((item, index) => (
                <div key={index} className="border-b border-gray-700 pb-4">
                  <button
                    className="w-full text-left flex justify-between items-center py-3 px-2 rounded-md hover:bg-gray-700 transition-colors"
                    onClick={() => toggleQuestion(index)}
                  >
                    <h3 className="font-medium">{item.question}</h3>
                    <svg
                      className={`w-5 h-5 text-gray-400 transform transition-transform ${
                        activeQuestion === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {activeQuestion === index && (
                    <div className="px-2 pb-2 text-gray-300">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Support */}
            <div className="mt-12 pt-6 border-t border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Still need help?</h3>
              <p className="text-gray-300 mb-4">
                If you can't find the answer to your question, our support team is here to help.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>support@peanutfund.com</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <span>Live Chat (Available 24/7)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
