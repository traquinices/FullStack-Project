import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MoviesPage from './pages/MoviesPage'
import SearchPage from './pages/SearchPage'
import MovieDetailPage from './pages/MovieDetailPage'
import PopularPage from './pages/PopularPage'
import Navbar from './components/Navbar'

// Root component — sets up the router and defines all application routes
function App() {
  return (
    <BrowserRouter>
      {/* Persistent navigation bar across all pages */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        {/* Dynamic route for viewing a single movie's detail */}
        <Route path="/movies/:id" element={<MovieDetailPage />} />
        <Route path="/popular" element={<PopularPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App