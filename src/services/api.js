import { buildTmdbUrl } from '../config/api.js';

// Function to get popular movies
export const getPopularMovies = async () => {
    try {
        const url = buildTmdbUrl('/movie/popular');
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching popular movies:", error);
        return [];
    }
};

// Function to search for movies by query
export const searchMovie = async (query) => {
    try {
        const url = buildTmdbUrl('/search/movie', { query: encodeURIComponent(query) });
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error searching movies:", error);
        return [];
    }
}

// Function to fetch movies (alias for getPopularMovies)
export const fetchMovies = async () => {
    try {
        const url = buildTmdbUrl('/movie/popular');
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data; // Return the full response object with results property
    } catch (error) {
        console.error("Error fetching movies:", error);
        return { results: [] };
    }
};