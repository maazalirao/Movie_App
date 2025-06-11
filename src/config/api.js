// API Configuration
// This file centralizes all API-related configuration

// Environment variables validation
const validateEnvVars = () => {
  const missingVars = [];
  
  if (!import.meta.env.VITE_TMDB_API_KEY) {
    missingVars.push('VITE_TMDB_API_KEY');
  }
  
  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars.join(', '));
    console.error('Please check your .env file and ensure all required variables are set.');
    return false;
  }
  
  return true;
};

// API Configuration object
const apiConfig = {
  tmdb: {
    apiKey: import.meta.env.VITE_TMDB_API_KEY,
    baseUrl: import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3',
    imageBaseUrl: 'https://image.tmdb.org/t/p/',
    defaultImageSize: 'w500'
  },
  isValid: validateEnvVars()
};

// Helper function to build TMDB URLs
export const buildTmdbUrl = (endpoint, params = {}) => {
  if (!apiConfig.isValid) {
    throw new Error('API configuration is invalid. Please check your environment variables.');
  }
  
  const url = new URL(`${apiConfig.tmdb.baseUrl}${endpoint}`);
  
  // Add API key
  url.searchParams.append('api_key', apiConfig.tmdb.apiKey);
  
  // Add additional parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.append(key, value);
    }
  });
  
  return url.toString();
};

// Helper function to build image URLs
export const buildImageUrl = (imagePath, size = apiConfig.tmdb.defaultImageSize) => {
  if (!imagePath) return null;
  return `${apiConfig.tmdb.imageBaseUrl}${size}${imagePath}`;
};

// Export the configuration for use in other files
export default apiConfig; 