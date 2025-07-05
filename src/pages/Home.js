import React, { useEffect, useState } from "react";
import { getAllMemes, getRemainingRequests, getTimeUntilReset } from "../components/MemeFetch";
import MemeCard from "../components/MemeCard";

const Home = () => {
  const [memeData, setMemeData] = useState([]);
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [remainingRequests, setRemainingRequests] = useState(10);
  const [timeUntilReset, setTimeUntilReset] = useState(0);

  useEffect(() => {
    fetchMemes();
    
    // Update rate limit info every second
    const interval = setInterval(() => {
      setRemainingRequests(getRemainingRequests());
      setTimeUntilReset(getTimeUntilReset());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Filter memes based on search term
    const filtered = memeData.filter(meme =>
      meme.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMemes(filtered);
  }, [searchTerm, memeData]);

  const fetchMemes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllMemes();
      setMemeData(response.data.memes);
      setFilteredMemes(response.data.memes);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching memes:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (ms) => {
    const seconds = Math.ceil(ms / 1000);
    return `${seconds}s`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Memes...</h2>
          <p className="text-gray-600">Fetching the latest meme templates</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">😢</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchMemes}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      {/* Header */}
      <div className="text-center py-8 px-4">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">🎭 MemeCraft Gallery</h1>
        <p className="text-xl text-gray-600 mb-8">Choose your favorite template and start creating!</p>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search memes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-all duration-200"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* Rate Limit Info */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <div className="bg-white rounded-lg px-4 py-2 shadow-md">
            <span className="text-sm font-medium text-gray-600">Requests remaining: </span>
            <span className={`font-bold ${remainingRequests > 3 ? 'text-green-600' : 'text-red-600'}`}>
              {remainingRequests}/10
            </span>
          </div>
          {timeUntilReset > 0 && (
            <div className="bg-white rounded-lg px-4 py-2 shadow-md">
              <span className="text-sm font-medium text-gray-600">Reset in: </span>
              <span className="font-bold text-blue-600">{formatTime(timeUntilReset)}</span>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="text-gray-600 mb-8">
          {searchTerm ? (
            <p>Found {filteredMemes.length} meme{filteredMemes.length !== 1 ? 's' : ''} matching "{searchTerm}"</p>
          ) : (
            <p>Showing {filteredMemes.length} meme templates</p>
          )}
        </div>
      </div>

      {/* Meme Grid */}
      {filteredMemes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No memes found</h3>
          <p className="text-gray-600">Try adjusting your search terms</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMemes.map((meme) => (
              <MemeCard key={meme.id} img={meme.url} title={meme.name} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
