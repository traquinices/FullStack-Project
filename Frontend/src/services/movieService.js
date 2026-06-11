import axios from 'axios'

// Base URL for all movie API requests
const API_BASE = 'http://localhost:8085/api/movies'

// Fetch all movies stored in the local database
export const getAllMovies = () => axios.get(API_BASE)

// Fetch a single movie by its local database ID
export const getMovieById = (id) => axios.get(`${API_BASE}/${id}`)

// Save a new movie to the local database
export const saveMovie = (movie) => axios.post(API_BASE, movie)

// Update an existing movie by its local database ID
export const updateMovie = (id, movie) => axios.put(`${API_BASE}/${id}`, movie)

// Delete a movie from the local database by ID
export const deleteMovie = (id) => axios.delete(`${API_BASE}/${id}`)

// Search local database movies by title and/or genre
export const searchLocal = (title, genres) =>
  axios.get(`${API_BASE}/search`, { params: { title, genres } })

// Fetch popular movies from TMDB via the backend
export const getPopularMovies = () => axios.get(`${API_BASE}/tmdb/popular`)

// Search movies on TMDB by query string
export const searchTmdb = (query) =>
  axios.get(`${API_BASE}/tmdb/search`, { params: { query } })

// Save a TMDB movie to the local database using its TMDB ID
export const saveMovieFromTmdb = (tmdbId) =>
  axios.post(`${API_BASE}/tmdb/${tmdbId}/save`)