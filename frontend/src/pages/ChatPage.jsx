import React, { useState } from "react";
export default function App() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", role: "assistant" },
    { id: 2, text: "I'd like to know more about Tailwind CSS!", role: "user" },
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSendMessage = (messageText) => {
    if (!messageText.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: messageText,
      role: "user",
    };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const replyMsg = {
        id: Date.now() + 1,
        text: "This is a mock AI response. Replace me with a real API call!",
        role: "assistant",
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1200);
  };

  return (
    <div className="h-screen flex flex-col overflow-y-auto">
      <Header onMenuClick={() => setSidebarOpen((prev) => !prev)} />

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`bg-gray-900 text-white transition-all duration-300 overflow-hidden ${
            sidebarOpen ? "w-64" : "w-0"
          } md:w-64`}
        >
          <SidebarContent closeSidebar={() => setSidebarOpen(false)} />
        </aside>

        <main className="flex-1 transition-all duration-300">
          <ChatWindow messages={messages} onSendMessage={handleSendMessage} />
        </main>
      </div>
    </div>
  );
}

/* --------------------------------------
   HEADER / NAVBAR
-------------------------------------- */
function Header({ onMenuClick }) {
  return (
    <header className="bg-gradient-to-r  from-black via-gray-700 to-gray-800 text-white p-4 flex items-center shadow">
      <button
        className="md:hidden mr-4 text-white focus:outline-none"
        onClick={onMenuClick}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <h1 className="text-xl font-semibold">Peanut Fund</h1>
    </header>
  );
}

/* --------------------------------------
   SIDEBAR CONTENT
-------------------------------------- */
function SidebarContent({ closeSidebar }) {
  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center justify-between mb-4">
        <button onClick={closeSidebar} className="md:hidden text-gray-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex justify-center mb-4">
          <button className="flex items-center justify-center bg-slate-700 p-2 rounded-full hover:bg-blue-500 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul>
          <li className="py-2 px-2 mb-2 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer">
            Chat 1
          </li>
          <li className="py-2 px-2 mb-2 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer">
            Chat 2
          </li>
          <li className="py-2 px-2 mb-2 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer">
            Chat 3
          </li>
        </ul>
      </div>
    </div>
  );
}

/* --------------------------------------
   CHAT WINDOW (messages + input)
-------------------------------------- */
function ChatWindow({ messages, onSendMessage }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-20 space-y-4 bg-gray-800">
        {messages.map((msg) => (
          <Message key={msg.id} role={msg.role} text={msg.text} />
        ))}
      </div>

      <div className=" bg-gray-800 flex items-center justify-center pb-10">
        <MessageInput onSend={onSendMessage} />
      </div>
    </div>
  );
}

/* --------------------------------------
   INDIVIDUAL MESSAGE
-------------------------------------- */
function Message({ role, text }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-sm p-3 rounded-lg shadow ${
          isUser ? "bg-slate-700 text-white" : "bg-gray-800 text-white"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

/* --------------------------------------
   MESSAGE INPUT
-------------------------------------- */
function MessageInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-700 p-4 bg-gray-800 w-8/12">
      <div className="flex h-32 justify-start rounded-2xl bg-gray-700 p-2">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="w-full resize-none bg-transparent outline-none text-white placeholder-gray-400"
        />

        <button
          onClick={handleSend}
          className="ml-2 p-2 rounded hover:bg-gray-600 text-white transition"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
