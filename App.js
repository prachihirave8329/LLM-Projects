import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 I’m here to support you. How are you feeling right now?",
      time: new Date().toLocaleTimeString(),
      crisis: false,
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/chat", {
        message: userMessage.text,
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: res.data.reply,
          time: new Date().toLocaleTimeString(),
          crisis: res.data.crisis,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Server unreachable. Please try again.",
          time: new Date().toLocaleTimeString(),
          crisis: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-3xl py-4 text-center">
        <h1 className="text-3xl font-bold text-purple-700">
          🧠 Stress Buster
        </h1>
        <p className="text-gray-600">
          A safe space to breathe and talk
        </p>
      </div>

      {/* Chat */}
      <div className="flex-1 w-full max-w-3xl bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-4 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 mb-4 animate-fadeIn ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "bot" && (
              <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center">
                🤍
              </div>
            )}

            <div>
              <div
                className={`px-4 py-3 rounded-2xl max-w-md text-sm whitespace-pre-line ${
                  msg.crisis
                    ? "bg-red-100 border border-red-400 text-red-700"
                    : msg.sender === "user"
                    ? "bg-purple-600 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {msg.time}
              </p>
            </div>

            {msg.sender === "user" && (
              <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center">
                🙂
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-2 mb-4">
            <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center">
              🤍
            </div>
            <div className="bg-gray-100 px-4 py-3 rounded-2xl flex gap-1">
              <span className="animate-typing">•</span>
              <span className="animate-typing delay-150">•</span>
              <span className="animate-typing delay-300">•</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      {/* Input */}
      <div className="w-full max-w-3xl p-4 flex gap-2">
        <input
          className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
          placeholder="Tell me what’s on your mind…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-purple-600 text-white px-6 rounded-xl hover:bg-purple-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
