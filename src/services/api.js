const API_KEY = "eca47c9cf1583cab2e2f9d13b897c494"
const BASE_URL = "https://api.themoviedb.org/3";

// Function to get popular movies
export const getPopularMovies = async () => {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
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
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error searching movies:", error);
        return [];
    }
}