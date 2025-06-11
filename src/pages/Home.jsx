import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';

// Featured movies for hero section
const FEATURED_MOVIES = [
  {
    id: 550,
    title: "Beat the Devil",
    overview: "A classic 1953 adventure film starring Humphrey Bogart and Jennifer Jones. A group of adventurers plot to steal uranium in this witty crime caper.",
    backdrop_path: "/placeholder-backdrop.jpg",
    poster_path: "/placeholder-poster.jpg",
    vote_average: 8.1,
    genre: "Adventure, Crime"
  },
  {
    id: 680,
    title: "D.O.A.",
    overview: "A classic 1949 film noir masterpiece. A man discovers he has been poisoned and has 24 hours to find his killer in this gripping thriller.",
    backdrop_path: "/placeholder-backdrop.jpg", 
    poster_path: "/placeholder-poster.jpg",
    vote_average: 8.5,
    genre: "Film Noir, Thriller"
  },
  {
    id: 120,
    title: "Night of the Living Dead",
    overview: "The 1968 horror classic that defined the zombie genre. A group of people trapped in a farmhouse must survive the night against the undead.",
    backdrop_path: "/placeholder-backdrop.jpg",
    poster_path: "/placeholder-poster.jpg", 
    vote_average: 8.3,
    genre: "Horror, Classic"
  }
];

function Home({ searchQuery }) {
  // State management for movies and UI
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');

  // Genre options for filtering
  const genres = [
    { id: 'all', name: 'All Movies' },
    { id: 'action', name: 'Action' },
    { id: 'comedy', name: 'Comedy' },
    { id: 'drama', name: 'Drama' },
    { id: 'horror', name: 'Horror' },
    { id: 'thriller', name: 'Thriller' },
    { id: 'romance', name: 'Romance' }
  ];

  // Load movies on component mount
  useEffect(() => {
    loadMovies();
  }, []);

  // Auto-rotate hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % FEATURED_MOVIES.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Function to load movies from API
  const loadMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchMovies();
      setMovies(response.results || []);
    } catch (err) {
      console.error('Error loading movies:', err);
      setError('Failed to load movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Filter movies based on search query and genre
  const filteredMovies = movies.filter(movie => {
    const matchesSearch = !searchQuery || 
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.overview.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGenre = selectedGenre === 'all' || 
      (movie.genre_ids && movie.genre_ids.includes(parseInt(selectedGenre)));
    
    return matchesSearch && matchesGenre;
  });

  // Sort movies based on selected criteria
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.vote_average - a.vote_average;
      case 'year':
        return new Date(b.release_date) - new Date(a.release_date);
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return b.popularity - a.popularity;
    }
  });

  const currentFeatured = FEATURED_MOVIES[currentHeroIndex];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background with Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-repeat opacity-20" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m0 40 40-40v40z'/%3E%3C/g%3E%3C/svg%3E")`,
                 backgroundSize: '40px 40px'
               }}>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-4 py-20">
          <div className="max-w-4xl">
            {/* Main Headline */}
            <div className="text-center mb-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                Welcome to MazFlix
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                Discover timeless classics and cinematic masterpieces from the golden age of film
              </p>
            </div>

            {/* Featured Movie Showcase */}
            <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-white/20 p-8 mb-8">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Movie Poster */}
                <div className="flex-shrink-0">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <div className="relative w-48 h-72 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center border border-white/20">
                      <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Movie Info */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-block px-3 py-1 bg-red-500/20 text-red-400 text-sm font-medium rounded-full mb-3">
                    ⭐ Featured Classic
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {currentFeatured.title}
                  </h2>
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                    {currentFeatured.overview}
                  </p>
                  
                  {/* Movie Stats */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-white font-semibold">{currentFeatured.vote_average}/10</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-purple-400">🎭</span>
                      <span className="text-gray-300">{currentFeatured.genre}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <button 
                      onClick={() => window.location.href = `/movie/${currentFeatured.id}`}
                      className="group relative px-8 py-3 bg-gradient-to-r from-red-500 to-purple-600 text-white font-semibold rounded-full hover:from-red-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12L8 10h4l-2 2zM10 2L3 9h4v8h6V9h4L10 2z"/>
                        </svg>
                        <span>Watch Now</span>
                      </span>
                      <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    </button>
                    
                    <button className="group px-8 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20">
                      <span className="flex items-center justify-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>More Info</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Hero Carousel Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {FEATURED_MOVIES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentHeroIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentHeroIndex
                        ? 'bg-red-500 scale-125'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-red-400 mb-2">1000+</div>
                <div className="text-gray-300">Classic Movies</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-purple-400 mb-2">HD</div>
                <div className="text-gray-300">Quality Streaming</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-pink-400 mb-2">Free</div>
                <div className="text-gray-300">Public Domain</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center text-white/60 hover:text-white transition-colors duration-300 cursor-pointer">
            <span className="text-sm mb-2">Explore Movies</span>
            <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Movies Section */}
      <section className="container mx-auto px-4 py-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Our Movie Collection
          </h2>
          <p className="text-xl text-gray-400">
            Discover classic films and timeless stories
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8">
          {/* Genre Filter */}
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => setSelectedGenre(genre.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedGenre === genre.id
                    ? 'bg-gradient-to-r from-red-500 to-purple-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="popularity">Popularity</option>
              <option value="rating">Rating</option>
              <option value="year">Release Year</option>
              <option value="title">Title</option>
            </select>
          </div>
      </div>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="mb-6 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <p className="text-gray-300">
              {sortedMovies.length > 0 
                ? `Found ${sortedMovies.length} movies matching "${searchQuery}"`
                : `No movies found matching "${searchQuery}"`
              }
            </p>
          </div>
        )}

      {/* Loading State */}
      {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
            <p className="text-gray-400 mt-4">Loading amazing movies...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md mx-auto">
              <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-400 font-medium mb-2">Oops! Something went wrong</p>
              <p className="text-gray-400 mb-4">{error}</p>
              <button
                onClick={loadMovies}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
        </div>
      )}

        {/* Movies Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {sortedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
            </div>
          )}

        {/* No Results */}
        {!loading && !error && sortedMovies.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSelectedGenre('all');
                setSortBy('popularity');
              }}
              className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-300"
            >
              Clear Filters
            </button>
        </div>
      )}
      </section>
    </div>
  );
}

export default Home;