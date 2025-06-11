import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { getMovieVideoUrl } from '../services/videoApi';
import { buildTmdbUrl } from '../config/api';

// Movie detail page where users can watch movies
function MovieDetail() {
  // Get movie ID from URL
  const { id } = useParams();
  // Navigation hook to go back
  const navigate = useNavigate();
  
  // State for movie details
  const [movie, setMovie] = useState(null);
  // State for loading
  const [loading, setLoading] = useState(true);
  // State for video URL and video info
  const [videoUrl, setVideoUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);

  // Load movie details when component mounts
  useEffect(() => {
    async function loadMovieDetails() {
      try {
        setLoading(true);
        
        // Get movie details from TMDB API
        const url = buildTmdbUrl(`/movie/${id}`);
        const response = await fetch(url);
        const movieData = await response.json();
        
        setMovie(movieData);
        
        // Get video information using our video API service
        const videoData = await getMovieVideoUrl(id);
        setVideoInfo(videoData);
        setVideoUrl(videoData.url);
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading movie details:', error);
        setLoading(false);
      }
    }

    loadMovieDetails();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl text-gray-400">Loading movie details...</p>
      </div>
    );
  }

  // Error state
  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl text-red-400">Movie not found</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  // Movie poster URL
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=No+Image';

  // Movie backdrop URL for background
  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` 
    : '';

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="mb-6 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
      >
        ← Back to Movies
      </button>

      {/* Movie Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">{movie.title}</h1>
        <div className="flex items-center gap-4 text-gray-400">
          <span>{movie.release_date ? movie.release_date.split('-')[0] : 'Unknown'}</span>
          <span>•</span>
          <span>{movie.runtime ? `${movie.runtime} min` : 'Unknown duration'}</span>
          <span>•</span>
          {movie.vote_average && (
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              <span>{movie.vote_average.toFixed(1)}/10</span>
            </div>
          )}
        </div>
      </div>

      {/* Video Player */}
      <div className="mb-8">
        <VideoPlayer 
          movieTitle={movie.title} 
          videoUrl={videoUrl}
        />
      </div>

      {/* Movie Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Movie Poster */}
        <div className="lg:col-span-1">
          <img 
            src={posterUrl} 
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Movie Details */}
        <div className="lg:col-span-2">
          {/* Overview */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-3">Overview</h2>
            <p className="text-gray-300 leading-relaxed">
              {movie.overview || 'No overview available for this movie.'}
            </p>
          </div>

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map(genre => (
                  <span 
                    key={genre.id}
                    className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {movie.budget && (
              <div>
                <h4 className="text-lg font-semibold text-white">Budget</h4>
                <p className="text-gray-400">${movie.budget.toLocaleString()}</p>
              </div>
            )}
            {movie.revenue && (
              <div>
                <h4 className="text-lg font-semibold text-white">Revenue</h4>
                <p className="text-gray-400">${movie.revenue.toLocaleString()}</p>
              </div>
            )}
            {movie.production_companies && movie.production_companies.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-white">Production</h4>
                <p className="text-gray-400">
                  {movie.production_companies.map(company => company.name).join(', ')}
                </p>
              </div>
            )}
            {movie.spoken_languages && movie.spoken_languages.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-white">Languages</h4>
                <p className="text-gray-400">
                  {movie.spoken_languages.map(lang => lang.english_name).join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail; 