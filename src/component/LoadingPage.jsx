import React from "react";
import { Loader2, Stars, Sparkles } from "lucide-react";

const LoadingComponent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center gap-6 animate-fade-in">
        {/* Icon Container */}
        <div className="relative">
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
          <Stars className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
          <Sparkles className="w-6 h-6 text-purple-400 absolute -bottom-2 -left-2 animate-pulse" />
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            Đang tải trang...
          </h2>
          <p className="text-gray-600 animate-pulse">
            Xin vui lòng đợi trong giây lát
          </p>
        </div>

        {/* Loading Progress Dots */}
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;
