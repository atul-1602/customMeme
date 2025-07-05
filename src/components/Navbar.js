import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isEdit = location.pathname === "/edit";

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🎭</div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:from-purple-700 group-hover:to-blue-700 transition-all duration-200">
                  MemeCraft
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Create. Share. Laugh.</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate("/")}
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                isHome
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
              }`}
            >
              🏠 Gallery
            </button>
            
            {isEdit && (
              <button
                onClick={() => navigate("/")}
                className="px-3 py-2 rounded-lg font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
              >
                ← Back to Gallery
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-100">
        <div className="px-4 py-2 space-y-1">
          <button
            onClick={() => navigate("/")}
            className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
              isHome
                ? "bg-purple-100 text-purple-700"
                : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
            }`}
          >
            🏠 Gallery
          </button>
          
          {isEdit && (
            <button
              onClick={() => navigate("/")}
              className="w-full text-left px-3 py-2 rounded-lg font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
            >
              ← Back to Gallery
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
