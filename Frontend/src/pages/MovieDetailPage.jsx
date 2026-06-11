import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMovieById, deleteMovie } from '../services/movieService'

function MovieDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMovie()
  }, [id])

  const fetchMovie = async () => {
    try {
      const res = await getMovieById(id)
      setMovie(res.data)
    } catch (err) {
      console.error('Error loading movie:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this movie?')) return
    try {
      await deleteMovie(id)
      navigate('/movies')
    } catch (err) {
      console.error('Error deleting movie:', err)
    }
  }

  if (loading) return <p style={{ padding: '32px', color: 'white' }}>Loading...</p>
  if (!movie) return <p style={{ padding: '32px', color: 'white' }}>Movie not found.</p>

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/movies')} style={styles.backBtn}>
        ← Back
      </button>

      <div style={styles.hero}>
        {movie.posterPath && (
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.posterPath}`}
            alt={movie.title}
            style={styles.poster}
          />
        )}
        <div style={styles.info}>
          <h1 style={styles.title}>{movie.title}</h1>
          <p style={styles.meta}>📅 {movie.releaseDate}</p>
          <p style={styles.meta}>⭐ {movie.voteAverage}</p>
          <p style={styles.meta}>🎭 {movie.genres}</p>
          <p style={styles.overview}>{movie.overview}</p>
          <div style={styles.actions}>
            <button onClick={handleDelete} style={styles.deleteBtn}>
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>
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
  backBtn: {
    marginBottom: '24px',
    padding: '8px 16px',
    backgroundColor: '#2d2d44',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  hero: {
    display: 'flex',
    gap: '32px',
    alignItems: 'flex-start',
  },
  poster: {
    borderRadius: '10px',
    width: '250px',
    objectFit: 'cover',
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: '32px',
    margin: '0 0 16px',
    color: '#e0e0e0',
  },
  meta: {
    fontSize: '16px',
    margin: '8px 0',
    color: '#aaa',
  },
  overview: {
    fontSize: '15px',
    lineHeight: '1.7',
    color: '#ccc',
    marginTop: '16px',
    maxWidth: '700px',
  },
  actions: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px',
  },
  editBtn: {
    padding: '10px 20px',
    backgroundColor: '#6b46c1',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '15px',
  },
  deleteBtn: {
    padding: '10px 20px',
    backgroundColor: '#e53e3e',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '15px',
  },
}

export default MovieDetailPage