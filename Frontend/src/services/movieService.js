import axios from 'axios'

const API_BASE = 'http://localhost:8085/api/movies'

export const getAllMovies = () => axios.get(API_BASE)

export const getMovieById = (id) => axios.get(`${API_BASE}/${id}`)

export const saveMovie = (movie) => axios.post(API_BASE, movie)

export const updateMovie = (id, movie) => axios.put(`${API_BASE}/${id}`, movie)

export const deleteMovie = (id) => axios.delete(`${API_BASE}/${id}`)

export const searchLocal = (title, genres) =>
  axios.get(`${API_BASE}/search`, { params: { title, genres } })

export const getPopularMovies = () => axios.get(`${API_BASE}/tmdb/popular`)

export const searchTmdb = (query) =>
  axios.get(`${API_BASE}/tmdb/search`, { params: { query } })

export const saveMovieFromTmdb = (tmdbId) =>
  axios.post(`${API_BASE}/tmdb/${tmdbId}/save`)