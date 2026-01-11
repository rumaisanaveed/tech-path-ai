import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Buddy } from "./Buddy";

const BuddyLessons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "buddy",
      text: "👋 Hey there! I’m Lumo again — ready to help you with this module!",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { from: "user", text: input },
      {
        from: "buddy",
        text: `That’s awesome! Let's explore more about "${input}" in this module.`,
      },
    ];

    setMessages(newMessages);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-white/90 backdrop-blur-lg border border-blue-200 shadow-xl rounded-2xl p-4 w-[320px] sm:w-[360px] mb-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                🤖
              </div>
              <h2 className="text-gray-800 font-semibold text-sm">
                Lumo — Module Guide
              </h2>
            </div>

            {/* Chat Area */}
            <div className="max-h-64 overflow-y-auto flex flex-col gap-3 pr-1 mb-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-2xl text-sm max-w-[85%] ${
                    msg.from === "buddy"
                      ? "bg-blue-100 text-gray-800 self-start"
                      : "bg-orange-200 text-gray-900 self-end"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your question..."
                className="flex-1 px-3 py-2 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="px-3 py-2 rounded-full bg-orange-500 text-white text-sm hover:bg-orange-600 transition"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buddy mascot */}
      {isOpen && (
        <motion.div
          key="buddy"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="relative mb-3"
        >
          <Buddy pose="standing" size="large" />
        </motion.div>
      )}

      {/* Floating button */}
      <motion.button
        whileTap={{ scale: 0.85, rotate: -15 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 flex items-center justify-center rounded-full shadow-lg text-xl transition-all"
        style={{
          backgroundColor: isOpen ? "#E07A5F" : "#5A9BD4",
          color: "white",
        }}
        title={isOpen ? "Close Buddy" : "Open Buddy"}
      >
        {isOpen ? "❌" : "💬"}
      </motion.button>
    </div>
  );
};

export default BuddyLessons;
