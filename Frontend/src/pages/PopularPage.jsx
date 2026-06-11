import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPopularMovies, saveMovieFromTmdb } from '../services/movieService'

function PopularPage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    fetchPopular()
  }, [])

  const fetchPopular = async () => {
    try {
      const res = await getPopularMovies()
      setMovies(res.data)
    } catch (err) {
      console.error('Error loading popular movies:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e, tmdbId) => {
    e.stopPropagation()
    try {
      await saveMovieFromTmdb(tmdbId)
      setSaved((prev) => ({ ...prev, [tmdbId]: true }))
    } catch (err) {
      setSaved((prev) => ({ ...prev, [tmdbId]: 'erro' }))
    }
  }

  if (loading) return <p style={{ padding: '32px', color: 'white' }}>Loading...</p>

  return (
    <div style={styles.container}>
      <h1>🔥 Popular Movies</h1>
      <div style={styles.grid}>
        {movies.map((movie) => (
          <div key={movie.tmdbId} style={styles.card}>
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
              <p style={styles.overview}>{movie.overview}</p>
              <button
                onClick={(e) => handleSave(e, movie.tmdbId)}
                disabled={saved[movie.tmdbId] === true}
                style={{
                  ...styles.saveBtn,
                  backgroundColor:
                    saved[movie.tmdbId] === true
                      ? '#38a169'
                      : saved[movie.tmdbId] === 'erro'
                      ? '#e53e3e'
                      : '#6b46c1',
                }}
              >
                {saved[movie.tmdbId] === true
                  ? '✅ Saved'
                  : saved[movie.tmdbId] === 'erro'
                  ? '❌ Already exists'
                  : '💾 Save'}
              </button>
            </div>
          </div>
        ))}
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
  },
  poster: {
    borderRadius: '6px',
    objectFit: 'cover',
    width: '100px',
    height: '150px',
  },
  info: { flex: 1 },
  title: { margin: '0 0 8px', fontSize: '18px', color: '#e0e0e0' },
  date: { margin: '4px 0', fontSize: '14px', color: '#aaa' },
  rating: { margin: '4px 0', fontSize: '14px', color: '#f5c518' },
  overview: {
    margin: '8px 0',
    fontSize: '13px',
    color: '#888',
    lineHeight: '1.5',
  },
  saveBtn: {
    marginTop: '8px',
    padding: '6px 14px',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
}

export default PopularPage