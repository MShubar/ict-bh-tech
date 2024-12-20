import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const [animate, setAnimate] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollDirection, setScrollDirection] = useState('up')
  const [navbarHeight, setNavbarHeight] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setAnimate(true)
    const timer = setTimeout(() => setAnimate(false), 1000)
    return () => clearTimeout(timer)
  }, [location.pathname])

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down') // Scrolling down
        setScrolled(true)
      } else {
        setScrollDirection('up') // Scrolling up
        setScrolled(false)
      }
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const navbarElement = document.getElementById('navbar')
    if (navbarElement) {
      setNavbarHeight(navbarElement.offsetHeight)
    }
  }, [])

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev)
  }

  const navbarStyle = {
    fontSize: '1.5rem',
    padding: '1rem 2rem',
    backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
    transition: 'background-color 0.3s ease-in-out',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 1000
  }

  const brandStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    animation: animate ? 'popIn 1s ease-in-out' : '',
    display: 'flex',
    alignItems: 'center'
  }

  const navLinkStyle = {
    transition: 'color 0.3s ease, transform 0.3s ease',
    marginRight: '1rem'
  }

  const specialButton = {
    marginLeft: '1rem',
    padding: '0.5rem 1.5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '5px',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
    position: menuOpen ? 'relative' : 'fixed', // Adjust for mobile menu
    top: menuOpen ? 'auto' : '1rem',
    right: menuOpen ? 'auto' : '2rem',
    zIndex: menuOpen ? '1' : '1100'
  }

  return (
    <>
      <nav
        id="navbar"
        className="navbar navbar-expand-lg navbar-dark"
        style={navbarStyle}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" style={brandStyle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 600 600"
              preserveAspectRatio="xMidYMid meet"
              width="70"
              height="70"
              style={{ marginRight: '10px' }} // Add spacing between SVG and text
            >
              <ellipse
                cx="300"
                cy="300"
                rx="140"
                ry="280"
                fill="none"
                stroke="#0000FF"
                strokeWidth="10"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 300 300"
                  to="360 300 300"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </ellipse>
              <ellipse
                cx="300"
                cy="300"
                rx="140"
                ry="280"
                fill="none"
                stroke="#0000FF"
                strokeWidth="10"
                transform="rotate(60 300 300)"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="60 300 300"
                  to="420 300 300"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </ellipse>
              <ellipse
                cx="300"
                cy="300"
                rx="140"
                ry="280"
                fill="none"
                stroke="#0000FF"
                strokeWidth="10"
                transform="rotate(-60 300 300)"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="-60 300 300"
                  to="300 300 300"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </ellipse>

              <text
                x="300"
                y="350"
                fontFamily="Arial, sans-serif"
                fontSize="120"
                fontWeight="bold"
                fill="#FFFFFF"
                textAnchor="middle"
              >
                TAG ICT
              </text>
            </svg>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={handleMenuToggle}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}
            id="navbarNav"
          >
            <ul className="navbar-nav mx-auto">
              {scrollDirection === 'up' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/" style={navLinkStyle}>
                      Home
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={navLinkStyle}
                    >
                      Services
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/service1">
                          NFC Belts & Watches
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/service2">
                          NFC Dog Collar
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/service3">
                          NFC Business Card
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/service4">
                          NFC Punch-In
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/service5">
                          NFC Access Door
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/contact"
                      style={navLinkStyle}
                    >
                      Contact
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <div className="d-flex">
              <Link
                to="/signin"
                className="animate-btn"
                style={{
                  ...specialButton,
                  backgroundColor: '#6c757d',
                  color: '#fff',
                  right: menuOpen ? 'auto' : '12rem' // Adjust for layout
                }}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="animate-btn"
                style={{
                  ...specialButton,
                  backgroundColor: '#ffc107',
                  color: '#000'
                }}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div style={{ paddingTop: navbarHeight }}>{/* Main Content */}</div>
    </>
  )
}

export default Navbar
