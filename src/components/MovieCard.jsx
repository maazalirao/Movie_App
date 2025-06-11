import React from 'react';
import { useNavigate } from 'react-router-dom';

function MovieCard(props) {
  // Navigation hook to go to movie detail page
  const navigate = useNavigate();
  const { movie } = props;
  
  // Get the year from release_date (format: YYYY-MM-DD)
  const year = movie.release_date ? movie.release_date.split('-')[0] : 'Unknown';
  
  // Use the image URL format from MovieDB
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg">
      {/* Movie Poster */}
      <img 
        src={imageUrl} 
        alt={movie.title} 
        className="w-full h-64 object-cover"
      />
      
      {/* Movie Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-white">{movie.title}</h3>
        <p className="text-slate-400 text-sm">{year}</p>
        
        {/* Rating */}
        {movie.vote_average && (
          <div className="flex items-center mt-2">
            <span className="text-yellow-400 mr-1">★</span>
            <span className="text-white">{movie.vote_average.toFixed(1)}/10</span>
          </div>
        )}
        
        {/* Description */}
        <p className="text-slate-300 text-sm mt-3">
          {movie.overview ? (
            movie.overview.length > 150 
              ? movie.overview.substring(0, 150) + '...' 
              : movie.overview
          ) : 'No description available'}
        </p>
        
        {/* Watch Button */}
        <button 
          onClick={() => navigate(`/movie/${movie.id}`)}
          className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors"
        >
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;