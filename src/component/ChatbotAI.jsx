import React, { useState, useEffect, useRef, Suspense } from "react";
import { Send, User, Trash2, MessageCircle, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
const Scene3D = React.lazy(() => import("./Scene3D"));

const genAI = new GoogleGenerativeAI(`AIzaSyD7QkI0e_P1igH4Cjdp3ZKoACFr5EcRDgU`);

const predefinedPrompts = [
  "Tóm tắt diễn biến chính của chiến dịch Điện Biên Phủ",
  "Vai trò của Đại tướng Võ Nguyên Giáp trong chiến dịch",
  "Ý nghĩa của chiến thắng Điện Biên Phủ",
  "Những khó khăn trong chiến dịch Điện Biên Phủ",
];

const FloatingAssistant = ({ onClick, isOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ top: "70vh" });

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const containerHeight = containerRef.current.offsetHeight;
      const maxScroll =
        document.documentElement.scrollHeight - windowHeight - containerHeight;

      if (scrollY > maxScroll) {
        setPosition({ bottom: "2rem", top: "auto" });
      } else {
        setPosition({ top: "70vh", bottom: "auto" });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="fixed right-8 z-50 cursor-pointer"
      style={{
        ...position,
        width: "120px",
        height: "120px",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full">
        <Scene3D isHovered={isHovered} />
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
          >
            <MessageCircle className="w-4 h-4 text-white" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const ChatWindow = ({
  isOpen,
  onClose,
  messages,
  isLoading,
  onSendMessage,
}) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput("");
  };

  const handlePredefinedPrompt = (prompt) => {
    onSendMessage(prompt);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed right-8 bottom-32 z-40 w-96"
        >
          <div className="flex flex-col bg-white rounded-lg shadow-xl">
            <motion.div
              initial={{ backgroundColor: "#DC2626" }}
              whileHover={{ backgroundColor: "#B91C1C" }}
              className="bg-red-600 text-white p-4 rounded-t-lg flex justify-between items-center"
            >
              <h1 className="text-xl font-bold">Hỏi đáp về Điện Biên Phủ</h1>
              <motion.button
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
                onClick={onClose}
                className="p-1 hover:bg-red-700 rounded-full"
              >
                <Trash2 size={20} />
              </motion.button>
            </motion.div>

            <div className="flex-1 overflow-y-auto p-4 max-h-[500px] space-y-4">
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-gray-500 py-8"
                >
                  <div className="mx-auto mb-2 w-28 h-28">
                    <Scene3D isHovered={false} />
                  </div>
                  <p>
                    Chọn câu hỏi hoặc nhập câu hỏi của bạn về chiến dịch Điện
                    Biên Phủ
                  </p>
                  <div className="grid grid-cols-1 gap-2 mt-4">
                    {predefinedPrompts.map((prompt, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handlePredefinedPrompt(prompt)}
                        className="text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        {prompt}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-start gap-3 ${
                    message.isUser ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center
                      ${message.isUser ? "bg-red-100" : "bg-gray-100"}`}
                  >
                    {message.isUser ? (
                      <User size={24} />
                    ) : (
                      <div className="w-full h-full">
                        <Scene3D isHovered={false} />
                      </div>
                    )}
                  </div>
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className={`rounded-lg p-4 max-w-[80%] shadow-sm ${
                      message.isUser
                        ? "bg-red-600 text-white"
                        : "bg-gray-50 text-gray-800"
                    }`}
                  >
                    {message.text}
                  </motion.div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                    <Scene3D isHovered={true} />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex gap-2">
                      {[0, 0.2, 0.4].map((delay, i) => (
                        <motion.span
                          key={i}
                          animate={{ y: [0, -10, 0] }}
                          transition={{
                            duration: 1,
                            delay,
                            repeat: Infinity,
                          }}
                        >
                          ●
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex gap-2">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Nhập câu hỏi của bạn..."
                  className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 rounded-md bg-red-600 text-white disabled:opacity-50 hover:bg-red-700 transition-colors"
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FloatingAssistantChatbot = () => {
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

  const sendMessage = async (message) => {
    setIsLoading(true);
    try {
      if (!chat) {
        throw new Error("Chat chưa được khởi tạo");
      }

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
          text: "Xin lỗi, đã có lỗi xảy ra khi xử lý tin nhắn của bạn.",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setMessages([]);
    initChat();
  };

  return (
    <>
      <FloatingAssistant onClick={() => setIsOpen(true)} isOpen={isOpen} />
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

export default FloatingAssistantChatbot;
