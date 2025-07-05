// Rate limiting configuration
const RATE_LIMIT = {
  maxRequests: 10,
  timeWindow: 60000, // 1 minute
  requests: []
};

// Cache for API responses
const CACHE = {
  memes: null,
  timestamp: null,
  cacheDuration: 300000 // 5 minutes
};

// CORS proxy for development (only used if direct API fails)
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

// Helper function to check rate limit
const checkRateLimit = () => {
  const now = Date.now();
  // Remove requests older than the time window
  RATE_LIMIT.requests = RATE_LIMIT.requests.filter(
    time => now - time < RATE_LIMIT.timeWindow
  );
  
  if (RATE_LIMIT.requests.length >= RATE_LIMIT.maxRequests) {
    const oldestRequest = RATE_LIMIT.requests[0];
    const timeToWait = RATE_LIMIT.timeWindow - (now - oldestRequest);
    throw new Error(`Rate limit exceeded. Please wait ${Math.ceil(timeToWait / 1000)} seconds before trying again.`);
  }
  
  RATE_LIMIT.requests.push(now);
};

// Helper function to check cache
const checkCache = () => {
  if (CACHE.memes && CACHE.timestamp) {
    const now = Date.now();
    if (now - CACHE.timestamp < CACHE.cacheDuration) {
      return CACHE.memes;
    }
  }
  return null;
};

// Helper function to update cache
const updateCache = (data) => {
  CACHE.memes = data;
  CACHE.timestamp = Date.now();
};

// Helper function to make API request with timeout
const makeRequest = async (url, timeout = 10000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export const getAllMemes = async () => {
  try {
    // Check rate limit
    checkRateLimit();
    
    // Check cache first
    const cachedData = checkCache();
    if (cachedData) {
      return cachedData;
    }
    
    // Try direct API call first
    try {
      const data = await makeRequest('https://api.imgflip.com/get_memes', 10000);
      
      if (data.success) {
        updateCache(data);
        return data;
      } else {
        throw new Error(data.error_message || 'API returned unsuccessful response');
      }
    } catch (directError) {
      // If direct call fails, use CORS proxy
      const proxyUrl = CORS_PROXY + encodeURIComponent('https://api.imgflip.com/get_memes');
      const data = await makeRequest(proxyUrl, 15000);
      
      if (!data.success) {
        throw new Error(data.error_message || 'Failed to fetch memes');
      }
      
      // Update cache
      updateCache(data);
      return data;
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout. Please check your internet connection and try again.');
    }
    
    if (error.message.includes('Rate limit exceeded')) {
      throw error;
    }
    
    // Provide helpful error messages based on the error type
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Network error. Please check your internet connection and try again.');
    }
    
    if (error.message.includes('HTTP error! status: 429')) {
      throw new Error('Too many requests. Please wait a moment and try again.');
    }
    
    if (error.message.includes('HTTP error! status: 500')) {
      throw new Error('Server error. Please try again later.');
    }
    
    throw new Error('Failed to load memes. Please try again later.');
  }
};

// Function to get remaining requests
export const getRemainingRequests = () => {
  const now = Date.now();
  RATE_LIMIT.requests = RATE_LIMIT.requests.filter(
    time => now - time < RATE_LIMIT.timeWindow
  );
  return Math.max(0, RATE_LIMIT.maxRequests - RATE_LIMIT.requests.length);
};

// Function to get time until rate limit resets
export const getTimeUntilReset = () => {
  if (RATE_LIMIT.requests.length === 0) return 0;
  
  const now = Date.now();
  const oldestRequest = RATE_LIMIT.requests[0];
  return Math.max(0, RATE_LIMIT.timeWindow - (now - oldestRequest));
}; 