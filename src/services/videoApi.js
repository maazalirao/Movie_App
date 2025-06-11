// Video API Service for MazFlix
// This service manages video URLs and sources for movies

// REAL MOVIES from Archive.org (Public Domain - Legally Free!)
// These are actual full-length movies, not samples
const SAMPLE_VIDEOS = {
  // Movie ID: Real Movie URL pairs from Archive.org
  '550': 'https://archive.org/download/publicmovies212/Beat_the_Devil.mp4', // Classic Film Noir
  '680': 'https://archive.org/download/publicmovies212/D.O.A._1949.mp4', // Classic Crime Drama
  '13': 'https://archive.org/download/publicmovies212/The_Phantom_of_the_Opera.mp4', // Classic Horror
  '278': 'https://archive.org/download/publicmovies212/Scarlet_Street.mp4', // Classic Drama
  '120': 'https://archive.org/download/publicmovies212/Night_of_the_Living_Dead.mp4', // Classic Horror
  '11': 'https://archive.org/download/publicmovies212/Nosferatu.mp4', // Classic Vampire Film
  '424': 'https://archive.org/download/publicmovies212/The_Little_Shop_of_Horrors.mp4', // Classic Comedy Horror
  '18': 'https://archive.org/download/publicmovies212/The_39_Steps.mp4', // Classic Thriller
  '299': 'https://archive.org/download/publicmovies212/Carnival_of_Souls.mp4', // Classic Horror
  '72': 'https://archive.org/download/publicmovies212/White_Zombie.mp4', // Classic Horror
  
  // Default real movie for unknown titles
  'default': 'https://archive.org/download/publicmovies212/Detour.mp4' // Classic Film Noir
};

// Function to get video URL for a specific movie
export const getMovieVideoUrl = async (movieId) => {
  try {
    // First, try to get the specific video for this movie
    let videoUrl = SAMPLE_VIDEOS[movieId.toString()];
    
    // If no specific video found, use default
    if (!videoUrl) {
      videoUrl = SAMPLE_VIDEOS.default;
    }
    
    // In production, you might want to:
    // 1. Check if video URL is accessible
    // 2. Get different quality options
    // 3. Handle authentication for paid content
    // 4. Integrate with streaming APIs
    
    return {
      url: videoUrl,
      quality: 'HD', // You can add quality information
      duration: null, // Duration in seconds if available
      subtitles: [], // Array of subtitle tracks
      hasVideo: true
    };
    
  } catch (error) {
    console.error('Error getting video URL:', error);
    return {
      url: null,
      quality: null,
      duration: null,
      subtitles: [],
      hasVideo: false
    };
  }
};

// Function to check if a movie has video available
export const checkVideoAvailability = async (movieId) => {
  try {
    const videoInfo = await getMovieVideoUrl(movieId);
    return videoInfo.hasVideo;
  } catch (error) {
    console.error('Error checking video availability:', error);
    return false;
  }
};

// Function to add new video URLs (for future admin functionality)
export const addMovieVideo = (movieId, videoUrl, quality = 'HD') => {
  SAMPLE_VIDEOS[movieId.toString()] = videoUrl;
  console.log(`Added video for movie ${movieId}: ${videoUrl}`);
  return true;
};

// Helper function to validate video URL
export const isValidVideoUrl = (url) => {
  try {
    const validExtensions = ['.mp4', '.mkv', '.avi', '.mov', '.webm'];
    const urlObj = new URL(url);
    
    // Check if URL has valid video extension or is from known streaming domains
    const hasValidExtension = validExtensions.some(ext => 
      urlObj.pathname.toLowerCase().includes(ext)
    );
    
    const isStreamingDomain = [
      'googleapis.com',
      'cloudfront.net',
      'amazonaws.com',
      'archive.org' // Added archive.org as trusted domain
    ].some(domain => urlObj.hostname.includes(domain));
    
    return hasValidExtension || isStreamingDomain;
    
  } catch (error) {
    return false;
  }
};

// MORE REAL MOVIES YOU CAN ADD:
// Here are additional archive.org movies you can easily add to the SAMPLE_VIDEOS object above:
//
// Horror/Thriller:
// 'The_Cabinet_of_Dr_Caligari.mp4' - Classic German Expressionist Horror
// 'The_Vampire_Bat.mp4' - 1933 Horror Film
// 'Dementia13.mp4' - Francis Ford Coppola's Early Work
//
// Comedy:
// 'The_Little_Shop_of_Horrors.mp4' - Classic Dark Comedy
// 'Reefer_Madness.mp4' - Cult Classic
//
// Drama/Romance:
// 'His_Girl_Friday.mp4' - Classic Screwball Comedy
// 'The_Stranger.mp4' - Orson Welles Film
//
// Sci-Fi:
// 'Plan_9_from_Outer_Space.mp4' - Cult Classic Sci-Fi
// 'Teenagers_from_Outer_Space.mp4' - 1950s Sci-Fi
//
// Western:
// 'The_Man_from_Utah.mp4' - Early John Wayne Western
//
// To add these, simply update the SAMPLE_VIDEOS object with the movie ID and URL:
// 'movieId': 'https://archive.org/download/publicmovies212/MovieFileName.mp4'

export { SAMPLE_VIDEOS }; 