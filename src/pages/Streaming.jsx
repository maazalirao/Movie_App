import React, { useState, useEffect } from 'react';
import { getCurrentlyStreaming } from '../services/streamingApi';

// Streaming page - Shows what's ACTUALLY on Netflix, Amazon Prime, etc. right now
function Streaming() {
  // State for currently selected streaming service
  const [selectedService, setSelectedService] = useState('netflix');
  // State for movies currently streaming
  const [streamingMovies, setStreamingMovies] = useState([]);
  // State for loading
  const [loading, setLoading] = useState(true);

  // Available streaming services
  const streamingServices = [
    { id: 'netflix', name: 'Netflix', color: '#E50914', icon: '🎬' },
    { id: 'amazon-prime', name: 'Amazon Prime', color: '#00A8E1', icon: '📺' },
    { id: 'disney-plus', name: 'Disney+', color: '#113CCF', icon: '🏰' },
    { id: 'hbo-max', name: 'HBO Max', color: '#8A2BE2', icon: '👑' },
    { id: 'hulu', name: 'Hulu', color: '#1CE783', icon: '📱' },
    { id: 'apple-tv', name: 'Apple TV+', color: '#000000', icon: '🍎' }
  ];

  // Load streaming data when component mounts or service changes
  useEffect(() => {
    loadStreamingData();
  }, [selectedService]);

  // Function to load data for selected streaming service
  const loadStreamingData = async () => {
    setLoading(true);
    try {
      const data = await getCurrentlyStreaming(selectedService);
      setStreamingMovies(data.movies || []);
    } catch (error) {
      console.error('Error loading streaming data:', error);
      setStreamingMovies([]);
    }
    setLoading(false);
  };

  // Function to handle service selection
  const handleServiceChange = (serviceId) => {
    setSelectedService(serviceId);
  };

  // Get current service info
  const currentService = streamingServices.find(s => s.id === selectedService);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 p-6">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-2">
          🎬 What's Streaming Right Now
        </h1>
        <p className="text-center text-gray-300">
          See what movies are actually available on your favorite streaming platforms
        </p>
      </div>

      {/* Service Selector */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Choose Streaming Service:</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {streamingServices.map(service => (
            <button
              key={service.id}
              onClick={() => handleServiceChange(service.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedService === service.id
                  ? 'border-blue-500 bg-blue-500/20 scale-105'
                  : 'border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-700'
              }`}
            >
              <div className="text-2xl mb-2">{service.icon}</div>
              <div className="text-sm font-medium">{service.name}</div>
            </button>
          ))}
        </div>

        {/* Current Service Header */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{currentService?.icon}</span>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: currentService?.color }}>
                Currently on {currentService?.name}
              </h2>
              <p className="text-gray-400">
                {loading ? 'Loading...' : `${streamingMovies.length} movies available`}
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading {currentService?.name} content...</p>
          </div>
        )}

        {/* Movies Grid */}
        {!loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {streamingMovies.map(movie => (
              <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Movie Poster */}
                <div className="aspect-[2/3] relative">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x450/374151/9CA3AF?text=No+Image';
                    }}
                  />
                  {/* Rating Badge */}
                  <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 px-2 py-1 rounded text-sm font-bold">
                    ⭐ {movie.rating}
                  </div>
                  {/* Service Badge */}
                  <div 
                    className="absolute top-2 left-2 px-2 py-1 rounded text-xs font-bold text-white"
                    style={{ backgroundColor: currentService?.color }}
                  >
                    {currentService?.name}
                  </div>
                </div>

                {/* Movie Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 line-clamp-2">
                    {movie.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    {movie.year} • {movie.genre}
                  </p>
                  <p className="text-gray-300 text-sm line-clamp-3 mb-4">
                    {movie.description}
                  </p>
                  
                  {/* Watch Button */}
                  <a
                    href={movie.streamingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-block text-center py-2 px-4 rounded font-medium text-white transition-colors duration-200"
                    style={{ 
                      backgroundColor: currentService?.color,
                      '&:hover': { opacity: 0.8 }
                    }}
                  >
                    Watch on {currentService?.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Movies Message */}
        {!loading && streamingMovies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No movies found for {currentService?.name}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Try selecting a different streaming service
            </p>
          </div>
        )}

        {/* Demo Notice */}
        <div className="mt-12 bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
          <h3 className="text-blue-400 font-bold mb-2">📋 Demo Mode</h3>
          <p className="text-gray-300 text-sm">
            This is demo data showing what a real streaming app would look like. 
            In production, this would connect to real APIs to show current streaming availability.
            Links will take you to the actual streaming services.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Streaming; 