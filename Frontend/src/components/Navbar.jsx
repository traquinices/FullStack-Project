import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  const linkStyle = (path) => ({
    color: location.pathname === path ? '#c084fc' : 'white',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: location.pathname === path ? '600' : '400',
    padding: '6px 12px',
    borderRadius: '6px',
    backgroundColor: location.pathname === path ? 'rgba(192,132,252,0.1)' : 'transparent',
    transition: 'all 0.2s',
  })

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>🎬 Movies App</Link>
      <div style={styles.links}>
        <Link to="/" style={linkStyle('/')}>Home</Link>
        <Link to="/movies" style={linkStyle('/movies')}>My Movies</Link>
        <Link to="/popular" style={linkStyle('/popular')}>🔥 Popular</Link>
        <Link to="/search" style={linkStyle('/search')}>Search</Link>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 40px',
    backgroundColor: '#12122a',
    borderBottom: '1px solid #2d2d44',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none',
  },
  links: {
    display: 'flex',
    gap: '8px',
  },
}

export default Navbar