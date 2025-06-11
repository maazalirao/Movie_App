import React from 'react';

// Beautiful loading component for MazFlix
function Loading({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Animated Logo */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg blur-lg opacity-75 animate-pulse"></div>
        <div className="relative bg-gradient-to-r from-red-500 to-purple-600 p-4 rounded-lg">
          <svg className="w-12 h-12 text-white animate-bounce" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
          </svg>
        </div>
      </div>

      {/* Loading Spinner */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-700 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-red-500 border-r-purple-500 rounded-full animate-spin"></div>
      </div>

      {/* Loading Text */}
      <p className="text-xl text-gray-300 mt-6 animate-pulse">{message}</p>
      
      {/* Loading Dots */}
      <div className="flex space-x-2 mt-4">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
      </div>
    </div>
  );
}

export default Loading; 