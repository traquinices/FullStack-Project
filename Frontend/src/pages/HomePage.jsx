import { useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate()

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>🎬 Movies App</h1>
        <p style={styles.subtitle}>
          Discover, save and manage your favourite movies
        </p>
        <div style={styles.buttons}>
          <button onClick={() => navigate('/popular')} style={styles.btnPrimary}>
            🔥 Popular Movies
          </button>
          <button onClick={() => navigate('/search')} style={styles.btnSecondary}>
            🔍 Search Movies
          </button>
          <button onClick={() => navigate('/movies')} style={styles.btnSecondary}>
            📋 My Movies
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 65px)',
    backgroundColor: '#0f0f1a',
    padding: '32px',
  },
  hero: {
    textAlign: 'center',
    maxWidth: '600px',
  },
  title: {
    fontSize: '52px',
    fontWeight: '800',
    marginBottom: '16px',
    background: 'linear-gradient(135deg, #c084fc, #6b46c1)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '18px',
    color: '#aaa',
    marginBottom: '40px',
    lineHeight: '1.6',
  },
  buttons: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  btnPrimary: {
    padding: '12px 28px',
    backgroundColor: '#6b46c1',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background-color 0.2s',
  },
  btnSecondary: {
    padding: '12px 28px',
    backgroundColor: '#1a1a2e',
    color: 'white',
    border: '1px solid #2d2d44',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.2s',
  },
}

export default HomePage