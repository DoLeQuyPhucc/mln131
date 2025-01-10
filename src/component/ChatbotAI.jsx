import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  User,
  X,
  MessageCircle,
  Bot,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(`AIzaSyD7QkI0e_P1igH4Cjdp3ZKoACFr5EcRDgU`);

const INTRODUCTION = {
  name: "Duck Duck",
  greeting: `### Xin chào! Tôi là Duck Duck.

Tôi được trang bị kiến thức chuyên sâu về:

* Quan điểm của chủ nghĩa Mác-Lênin về giai cấp công nhân
* Sứ mệnh lịch sử của giai cấp công nhân
* Thực trạng và thách thức hiện nay
* Vai trò của giai cấp công nhân Việt Nam

Bạn có thể chọn một trong các câu hỏi gợi ý hoặc tự đặt câu hỏi. Tôi sẽ cố gắng trả lời chi tiết và chính xác nhất!`,
};

const predefinedPrompts = [
  "Khái niệm và đặc điểm cơ bản của giai cấp công nhân là gì?",
  "Sứ mệnh lịch sử thế giới của giai cấp công nhân trong bối cảnh hiện nay?",
  "Vai trò của giai cấp công nhân Việt Nam trong thời kỳ đổi mới?",
  "Bác sĩ, giảng viên, IT hiện nay có phải là giai cấp công nhân không?",
];

const FloatingButton = ({ onClick, isOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg flex items-center justify-center z-[100]"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={isHovered ? { rotate: 360 } : {}}
        transition={{ duration: 0.5 }}
      >
        <Bot className="w-6 h-6" />
      </motion.div>
      {!isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center"
        >
          <Sparkles className="w-3 h-3 text-red-600" />
        </motion.div>
      )}
    </motion.button>
  );
};

const ChatMessage = ({ message, isUser }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}
  >
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center
      ${isUser ? "bg-red-100" : "bg-gray-100"}`}
    >
      {isUser ? (
        <User size={16} className="text-red-600" />
      ) : (
        <Bot size={16} className="text-gray-600" />
      )}
    </div>
    <div
      className={`rounded-lg p-3 max-w-[80%] ${
        isUser
          ? "bg-gradient-to-r from-red-600 to-red-700 text-white"
          : "bg-gray-50 text-gray-800"
      }`}
    >
      {isUser ? (
        message.text
      ) : (
        <ReactMarkdown
          className="prose prose-sm max-w-none prose-headings:mb-2 prose-headings:mt-2 prose-p:mb-2 prose-ul:mb-2"
          components={{
            h3: ({ children }) => (
              <h3 className="text-lg font-bold text-gray-800">{children}</h3>
            ),
            ul: ({ children }) => (
              <ul className="list-disc ml-4 space-y-1">{children}</ul>
            ),
            li: ({ children }) => <li className="text-gray-700">{children}</li>,
            p: ({ children }) => <p className="text-gray-700">{children}</p>,
            strong: ({ children }) => (
              <strong className="font-semibold text-gray-800">
                {children}
              </strong>
            ),
          }}
        >
          {message.text}
        </ReactMarkdown>
      )}
    </div>
  </motion.div>
);

const ChatWindow = ({
  isOpen,
  onClose,
  messages,
  isLoading,
  onSendMessage,
}) => {
  const [input, setInput] = useState("");
  const [showIntro, setShowIntro] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setShowIntro(false);
    onSendMessage(input.trim());
    setInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-28 right-8 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-2xl border border-gray-100 z-[100]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="font-semibold">{INTRODUCTION.name}</h2>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setShowIntro(true);
                  setMessages([]);
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <RefreshCw size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={16} />
              </motion.button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-4">
            {showIntro && (
              <>
                <ChatMessage
                  message={{ text: INTRODUCTION.greeting }}
                  isUser={false}
                />
                <div className="grid gap-2 mt-4">
                  {predefinedPrompts.map((prompt, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      onClick={() => {
                        setShowIntro(false);
                        onSendMessage(prompt);
                      }}
                      className="text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all text-sm"
                    >
                      {prompt}
                    </motion.button>
                  ))}
                </div>
              </>
            )}

            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg} isUser={msg.isUser} />
            ))}

            {isLoading && (
              <div className="flex gap-2 items-center">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Bot className="w-5 h-5 text-gray-600" />
                  </motion.div>
                </div>
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-red-600"
                >
                  Đang suy nghĩ...
                </motion.div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập câu hỏi của bạn..."
                className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white disabled:opacity-50"
              >
                <Send size={20} />
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ChatbotAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState(null);

  useEffect(() => {
    initChat();
  }, []);

  const initChat = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const newChat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.9,
        topP: 0.9,
      },
    });
    setChat(newChat);
  };

  const handleClose = () => {
    setIsOpen(false);
    setMessages([]);
    initChat();
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const sendMessage = async (message) => {
    setIsLoading(true);
    try {
      if (!chat) throw new Error("Chat chưa được khởi tạo");

      setMessages((prev) => [...prev, { text: message, isUser: true }]);
      const result = await chat.sendMessage(message);
      const response = await result.response;

      setMessages((prev) => [
        ...prev,
        { text: response.text(), isUser: false },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FloatingButton onClick={handleOpen} isOpen={isOpen} />
      <ChatWindow
        isOpen={isOpen}
        onClose={handleClose}
        messages={messages}
        isLoading={isLoading}
        onSendMessage={sendMessage}
      />
    </>
  );
};

export default ChatbotAssistant;
