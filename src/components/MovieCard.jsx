import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MovieCard({ movie }) {
  // Navigation hook to go to movie detail page
  const navigate = useNavigate();
  // State for image loading
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Extract movie information with fallbacks
  const {
    id,
    title = 'Unknown Title',
    overview = 'No description available.',
    poster_path,
    backdrop_path,
    vote_average = 0,
    release_date = '',
    genre_ids = []
  } = movie;

  // Create image URL for movie poster
  const posterUrl = poster_path 
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : null;

  // Format release year
  const releaseYear = release_date ? new Date(release_date).getFullYear() : 'N/A';

  // Format rating
  const rating = Math.round(vote_average * 10) / 10;

  // Get rating color based on score
  const getRatingColor = (score) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 7) return 'text-yellow-400';
    if (score >= 6) return 'text-orange-400';
    return 'text-red-400';
  };

  // Handle movie selection
  const handleWatchNow = () => {
    navigate(`/movie/${id}`);
  };

  // Handle image loading
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
      {/* Movie Poster Container */}
      <div className="relative aspect-[2/3] overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-800/50 to-transparent z-10"></div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>

        {/* Movie Poster Image */}
        {posterUrl && !imageError ? (
          <>
            {/* Loading Skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 animate-pulse flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
                </svg>
              </div>
            )}
            
            {/* Actual Image */}
            <img 
              src={posterUrl}
              alt={title}
              className={`w-full h-full object-cover transition-all duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              } group-hover:scale-110`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </>
        ) : (
          // Fallback when no image or error
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-500 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
              </svg>
              <p className="text-xs text-gray-500">No Image</p>
            </div>
          </div>
        )}

        {/* Rating Badge */}
        {rating > 0 && (
          <div className="absolute top-3 left-3 z-30">
            <div className="bg-black/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
              <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span className={`text-xs font-bold ${getRatingColor(rating)}`}>
                {rating}
              </span>
            </div>
          </div>
        )}

        {/* Year Badge */}
        {releaseYear !== 'N/A' && (
          <div className="absolute top-3 right-3 z-30">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
              <span className="text-xs font-medium text-white">
                {releaseYear}
              </span>
            </div>
          </div>
        )}

        {/* Hover Play Button */}
        <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleWatchNow}
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-4 transform scale-75 group-hover:scale-100 transition-all duration-300"
          >
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Movie Information */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div>
          <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-purple-400 transition-colors duration-300">
            {title}
          </h3>
        </div>
        
        {/* Description */}
        <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
          {overview}
        </p>

        {/* Movie Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            {rating > 0 && (
              <div className="flex items-center space-x-1">
                <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span className={getRatingColor(rating)}>{rating}</span>
              </div>
            )}
          </div>
          <span>{releaseYear}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {/* Watch Now Button */}
          <button 
            onClick={handleWatchNow}
            className="flex-1 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm transform hover:scale-105 active:scale-95"
          >
            <span className="flex items-center justify-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
              </svg>
              <span>Watch</span>
            </span>
          </button>

          {/* Favorite Button */}
          <button 
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg transition-all duration-300 border border-white/20 hover:border-red-500/50 group/fav"
            title="Add to Favorites"
          >
            <svg className="w-4 h-4 group-hover/fav:text-red-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* More Info Button */}
          <button 
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg transition-all duration-300 border border-white/20 hover:border-blue-500/50 group/info"
            title="More Information"
          >
            <svg className="w-4 h-4 group-hover/info:text-blue-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/20 to-purple-600/20 blur-xl"></div>
      </div>
    </div>
  );
}

export default MovieCard;