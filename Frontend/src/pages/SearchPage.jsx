import { useState } from 'react'
import { searchTmdb, saveMovieFromTmdb } from '../services/movieService'

function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState({})

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    try {
      const res = await searchTmdb(query)
      setResults(res.data)
    } catch (err) {
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (tmdbId) => {
    try {
      await saveMovieFromTmdb(tmdbId)
      setSaved((prev) => ({ ...prev, [tmdbId]: true }))
    } catch (err) {
      console.error('Error saving movie:', err)
      setSaved((prev) => ({ ...prev, [tmdbId]: 'erro' }))
    }
  }

  return (
    <div style={styles.container}>
      <h1>Search Movies</h1>
      <div style={styles.searchBar}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.searchBtn}>
          🔍 Search
        </button>
      </div>

      {loading && <p>Searching...</p>}

      <div style={styles.grid}>
        {results.map((movie) => (
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
                onClick={() => handleSave(movie.tmdbId)}
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
  searchBar: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
  },
  input: {
    flex: 1,
    padding: '10px 16px',
    borderRadius: '6px',
    border: '1px solid #444',
    backgroundColor: '#1a1a2e',
    color: 'white',
    fontSize: '16px',
  },
  searchBtn: {
    padding: '10px 20px',
    backgroundColor: '#6b46c1',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
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
  overview: { margin: '8px 0', fontSize: '13px', color: '#888', lineHeight: '1.5' },
  saveBtn: {
    marginTop: '8px',
    padding: '6px 14px',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
}

export default SearchPage