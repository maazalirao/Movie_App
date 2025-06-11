import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { getPopularMovies, searchMovie } from '../services/api';

function Home() {
  // State for movies and search
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Load popular movies when the component mounts
  useEffect(() => {
    // This function gets popular movies when the page loads
    async function loadPopularMovies() {
      try {
        setLoading(true);
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
        setLoading(false);
      } catch (error) {
        console.error('Error loading popular movies:', error);
        setLoading(false);
      }
    }

    loadPopularMovies();
  }, []);

  // Handle search input changes
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // If search is empty, load popular movies again
    if (value.trim() === '') {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
      return;
    }

    // Search for movies based on the input
    try {
      setLoading(true);
      const searchResults = await searchMovie(value);
      setMovies(searchResults);
      setLoading(false);
    } catch (error) {
      console.error('Error searching movies:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <input 
          type="text" 
          placeholder="Search for movies..." 
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-10">
          <p className="text-xl text-gray-400">Loading movies...</p>
        </div>
      )}

      {/* Movie Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.length > 0 ? (
            movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <div className="col-span-3 text-center py-10">
              <p className="text-xl text-gray-400">No movies found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;