import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllMovies, deleteMovie } from '../services/movieService'

function MoviesPage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      const res = await getAllMovies()
      setMovies(res.data)
    } catch (err) {
      console.error('Erro ao carregar filmes:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Tens a certeza que queres apagar este filme?')) return
    try {
      await deleteMovie(id)
      setMovies(movies.filter((m) => m.id !== id))
    } catch (err) {
      console.error('Erro ao apagar filme:', err)
    }
  }

  if (loading) return <p style={{ padding: '32px', color: 'white' }}>A carregar...</p>

  return (
    <div style={styles.container}>
      <h1>Os Meus Filmes</h1>
      {movies.length === 0 ? (
        <p>Não tens filmes guardados.</p>
      ) : (
        <div style={styles.grid}>
          {movies.map((movie) => (
            <div
              key={movie.id}
              style={{ ...styles.card, cursor: 'pointer' }}
              onClick={() => navigate(`/movies/${movie.id}`)}
            >
              {movie.posterPath && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
                  alt={movie.title}
                  style={styles.poster}
                />
              )}
              <div style={styles.info}>
                <h3 style={styles.title}>{movie.title}</h3>
                <p style={styles.date}>📅 {movie.releaseDate}</p>
                <p style={styles.rating}>⭐ {movie.voteAverage}</p>
                <p style={styles.genres}>🎭 {movie.genres}</p>
                <p style={styles.overview}>{movie.overview}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(movie.id)
                  }}
                  style={styles.deleteBtn}
                >
                  🗑️ Apagar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    padding: '32px',
    backgroundColor: '#0f0f1a',
    minHeight: '100vh',
    color: 'white',
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  card: {
    display: 'flex',
    gap: '16px',
    backgroundColor: '#1a1a2e',
    borderRadius: '8px',
    padding: '16px',
    transition: 'background-color 0.2s',
  },
  poster: {
    borderRadius: '6px',
    objectFit: 'cover',
    width: '100px',
    height: '150px',
  },
  info: {
    flex: 1,
  },
  title: {
    margin: '0 0 8px',
    fontSize: '18px',
    color: '#e0e0e0',
  },
  date: { margin: '4px 0', fontSize: '14px', color: '#aaa' },
  rating: { margin: '4px 0', fontSize: '14px', color: '#f5c518' },
  genres: { margin: '4px 0', fontSize: '14px', color: '#aaa' },
  overview: {
    margin: '8px 0',
    fontSize: '13px',
    color: '#888',
    lineHeight: '1.5',
  },
  deleteBtn: {
    marginTop: '8px',
    padding: '6px 14px',
    backgroundColor: '#e53e3e',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
}

export default MoviesPage