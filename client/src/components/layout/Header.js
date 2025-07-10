import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faUser,
  faSignOutAlt,
  faGraduationCap,
  faBell,
  faShoppingCart,
  faHeart,
  faSun,
  faMoon,
  faPalette,
  faArrowRight,
  faGlobe,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useTheme } from '../../contexts/ThemeContext';
import UserProfileDropdown from '../common/UserProfileDropdown';

function Header() {
  // Use authentication and cart contexts
  const { user, isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const { theme, setLightTheme, setDarkTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartBounce, setCartBounce] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const searchInputRef = useRef(null);
  const themeDropdownRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Cart bounce effect when cart count changes
  useEffect(() => {
    if (cartCount > 0) {
      setCartBounce(true);
      const timer = setTimeout(() => setCartBounce(false), 600);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  // Configuration for pages that should have dark navbar text
  const darkNavbarPages = ['/courses', '/about-us', '/contact', '/login', '/signup', '/dashboard', '/profile', '/settings', '/cart'];

  // Check if current page should have dark navbar
  const shouldUseDarkNavbar = darkNavbarPages.includes(location.pathname) || isScrolled;
  
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle click outside to close theme dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target)) {
        setThemeDropdownOpen(false);
      }
    };

    if (themeDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [themeDropdownOpen]);

  // Focus search input when search is active
  useEffect(() => {
    if (searchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchActive]);
  
  const toggleMenu = () => {
    const newMenuState = !menuOpen;
    setMenuOpen(newMenuState);
    
    // Prevent body scroll when menu is open
    if (newMenuState) {
      document.body.classList.add('mobile-menu-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('mobile-menu-open');
      document.body.style.overflow = '';
    }
  };

  // Close menu when clicking outside or on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        document.body.classList.remove('mobile-menu-open');
        document.body.style.overflow = '';
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 992 && menuOpen) {
        setMenuOpen(false);
        document.body.classList.remove('mobile-menu-open');
        document.body.style.overflow = '';
      }
    };

    document.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('mobile-menu-open');
      document.body.style.overflow = '';
    };
  }, []);

  const toggleSearch = () => {
    setSearchActive(!searchActive);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
      setSearchActive(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={() => {
            setMenuOpen(false);
            document.body.classList.remove('mobile-menu-open');
            document.body.style.overflow = '';
          }}
        />
      )}
      
      <header>
        <nav className={`navbar navbar-expand-lg fixed-top transition-all ${shouldUseDarkNavbar ? 'navbar-dark bg-white shadow-sm' : 'navbar-light bg-transparent'}`}>
          <div className="container">
            <Link 
              className="navbar-brand fw-bold slide-in-left logo-link d-flex align-items-center" 
              to="/"
              onClick={(e) => {
                console.log('Logo clicked, current path:', location.pathname);
                
                // Ensure we navigate to home and close any open menus
                setMenuOpen(false);
                setSearchActive(false);
                setThemeDropdownOpen(false);
                
                // Force navigation to home page if not already there
                if (location.pathname !== '/') {
                  console.log('Navigating to home page...');
                  e.preventDefault(); // Prevent default Link behavior
                  navigate('/');
                } else {
                  console.log('Already on home page');
                  // If already on home page, scroll to top
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <div className="brand-logo me-2 rounded-circle bg-primary d-flex align-items-center justify-content-center"
                  style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                <FontAwesomeIcon icon={faGraduationCap} className="text-white" />
              </div>
              <div className="d-none d-sm-block">
                <span className={`${shouldUseDarkNavbar ? 'text-primary' : 'text-white'}`}>Learn</span>
                <span className={shouldUseDarkNavbar ? 'text-dark' : 'text-white'}>Hub</span>
              </div>
            </Link>

            <button
              className={`navbar-toggler border-0 ms-auto ${shouldUseDarkNavbar ? 'text-dark' : 'text-white'}`}
              type="button"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-label="Toggle navigation"
            >
              <div className="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>

            {/* Enhanced Mobile Menu */}
            <div className={`mobile-menu ${menuOpen ? 'show' : ''}`}>
              <div className="mobile-menu-container">
                <div className="mobile-menu-header">
                  <div className="d-flex align-items-center">
                    <div className="brand-logo me-2 rounded-circle bg-primary d-flex align-items-center justify-content-center"
                        style={{ width: '35px', height: '35px' }}>
                      <FontAwesomeIcon icon={faGraduationCap} className="text-white" />
                    </div>
                    <div>
                      <span className="text-primary fw-bold">Learn</span>
                      <span className="text-dark fw-bold">Hub</span>
                    </div>
                  </div>
                  <button 
                    className="close-btn" 
                    onClick={() => {
                      setMenuOpen(false);
                      document.body.classList.remove('mobile-menu-open');
                      document.body.style.overflow = '';
                    }}
                    aria-label="Close menu"
                  >
                    <span className="close-icon">&times;</span>
                  </button>
                </div>
                
                <nav className="mobile-menu-nav">
                  {[
                    { path: '/', label: 'Home', icon: faGlobe },
                    { path: '/courses', label: 'Courses', icon: faGraduationCap },
                    { path: '/about-us', label: 'About Us', icon: faUsers },
                    { path: '/contact', label: 'Contact', icon: faUser }
                  ].map((nav, index) => (
                    <NavLink
                      key={nav.path}
                      to={nav.path}
                      className={({ isActive }) =>
                        `mobile-nav-link ${isActive ? 'active' : ''}`
                      }
                      onClick={() => {
                        setMenuOpen(false);
                        document.body.classList.remove('mobile-menu-open');
                        document.body.style.overflow = '';
                      }}
                      style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                    >
                      <div className="nav-link-content">
                        <div className="nav-link-left">
                          <FontAwesomeIcon icon={nav.icon} className="nav-icon" />
                          <span className="nav-text">{nav.label}</span>
                        </div>
                        <FontAwesomeIcon icon={faArrowRight} className="nav-arrow" />
                      </div>
                    </NavLink>
                  ))}
                  
                  {/* Theme Toggle Section */}
                  <div className="mobile-theme-toggle" style={{ animationDelay: '0.5s' }}>
                    <div className="theme-section-header">
                      <FontAwesomeIcon icon={faPalette} className="theme-icon" />
                      <span className="theme-text">Theme</span>
                    </div>
                    <div className="theme-buttons">
                      <button 
                        className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
                        onClick={() => setLightTheme()}
                      >
                        <FontAwesomeIcon icon={faSun} />
                        <span>Light</span>
                      </button>
                      <button 
                        className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
                        onClick={() => setDarkTheme()}
                      >
                        <FontAwesomeIcon icon={faMoon} />
                        <span>Dark</span>
                      </button>
                    </div>
                  </div>
                </nav>
                
                <div className="mobile-menu-footer">
                  {isAuthenticated ? (
                    <div className="user-section">
                      <div className="user-info">
                        <div className="user-avatar">
                          <FontAwesomeIcon icon={faUser} />
                        </div>
                        <div className="user-details">
                          <div className="user-name">{user?.fullName || 'User'}</div>
                          <div className="user-email">{user?.email}</div>
                        </div>
                      </div>
                      <div className="action-buttons">
                        <Link to="/dashboard" className="btn btn-outline-primary btn-sm" onClick={() => {
                          setMenuOpen(false);
                          document.body.classList.remove('mobile-menu-open');
                          document.body.style.overflow = '';
                        }}>
                          Dashboard
                        </Link>
                        <Link to="/profile" className="btn btn-outline-secondary btn-sm" onClick={() => {
                          setMenuOpen(false);
                          document.body.classList.remove('mobile-menu-open');
                          document.body.style.overflow = '';
                        }}>
                          Profile
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="auth-buttons">
                      <Link 
                        to="/login" 
                        className="btn btn-outline-primary mobile-auth-btn login-btn" 
                        onClick={() => {
                          setMenuOpen(false);
                          document.body.classList.remove('mobile-menu-open');
                          document.body.style.overflow = '';
                        }}
                      >
                        <FontAwesomeIcon icon={faUser} className="me-2" />
                        <span>Log In</span>
                      </Link>
                      <Link 
                        to="/signup" 
                        className="btn btn-primary mobile-auth-btn signup-btn" 
                        onClick={() => {
                          setMenuOpen(false);
                          document.body.classList.remove('mobile-menu-open');
                          document.body.style.overflow = '';
                        }}
                      >
                        <span>Sign Up</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="collapse navbar-collapse d-lg-flex">
              <ul className="navbar-nav mx-auto">
                {[
                  { path: '/', label: 'Home' },
                  { path: '/courses', label: 'Courses' },
                  { path: '/about-us', label: 'About Us' },
                  { path: '/contact', label: 'Contact' }
                ].map((nav, index) => (
                  <li className="nav-item fade-in" style={{animationDelay: `${0.1 * (index + 1)}s`}} key={nav.path}>
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link position-relative transition-all px-3 mx-1 ${isActive ? 'active fw-bold' : ''} ${shouldUseDarkNavbar ? 'text-dark' : 'text-white'}`
                      }
                      to={nav.path}
                    >
                      {nav.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            
            <div className="d-flex align-items-center gap-3 slide-in-right">
              {/* Search button and form */}
              <div className={`search-container position-relative ${searchActive ? 'active' : ''}`}>
                <button
                  className={`btn btn-icon btn-sm rounded-circle d-flex align-items-center justify-content-center transition-all ${
                    shouldUseDarkNavbar ? 'btn-light' : 'btn-outline-light'
                  } ${searchActive ? 'd-none' : ''}`}
                  onClick={toggleSearch}
                  style={{ width: '38px', height: '38px' }}
                >
                  <FontAwesomeIcon icon={faSearch} className={shouldUseDarkNavbar ? 'text-primary' : 'text-white'} />
                </button>
                
                <form 
                  className={`search-form position-absolute end-0 bg-white rounded-pill shadow transition-all ${
                    searchActive ? 'active scale-in' : 'opacity-0'
                  }`} 
                  onSubmit={handleSearch}
                  style={{ 
                    top: 0,
                    width: searchActive ? '280px' : '50px',
                    overflow: 'hidden'
                  }}
                >
                  <div className="input-group">
                    <input
                      type="text"
                      ref={searchInputRef}
                      className="form-control border-0 shadow-none"
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="btn btn-link text-primary" type="submit">
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                    <button 
                      className="btn btn-link text-muted" 
                      type="button"
                      onClick={() => {
                        setSearchActive(false);
                        setSearchQuery('');
                      }}
                    >
                      ×
                    </button>
                  </div>
                </form>
              </div>
              
              {/* Notification and Wishlist for logged in users */}
              {isAuthenticated && (
                <>
                  <div className="position-relative mx-1">
                    <button
                      className={`btn btn-icon btn-sm rounded-circle d-flex align-items-center justify-content-center hover-lift transition-all ${
                        shouldUseDarkNavbar ? 'btn-light' : 'btn-outline-light'
                      }`}
                      style={{ width: '38px', height: '38px' }}
                      title="Notifications"
                    >
                      <FontAwesomeIcon icon={faBell} className={shouldUseDarkNavbar ? 'text-primary' : 'text-white'} />
                      {/* Notification badge will be shown only when there are actual notifications */}
                    </button>
                  </div>

                  <div className="position-relative mx-1">
                    <Link
                      to="/wishlist"
                      className={`btn btn-icon btn-sm rounded-circle d-flex align-items-center justify-content-center hover-lift transition-all ${
                        shouldUseDarkNavbar ? 'btn-light' : 'btn-outline-light'
                      }`}
                      style={{ width: '38px', height: '38px' }}
                      title="Wishlist"
                    >
                      <FontAwesomeIcon icon={faHeart} className={shouldUseDarkNavbar ? 'text-primary' : 'text-white'} />
                    </Link>
                  </div>

                  <div className="position-relative mx-1">
                    <Link
                      to="/cart"
                      className={`btn btn-icon btn-sm rounded-circle d-flex align-items-center justify-content-center hover-lift transition-all ${
                        shouldUseDarkNavbar ? 'btn-light' : 'btn-outline-light'
                      } ${cartBounce ? 'cart-bounce' : ''}`}
                      style={{ width: '38px', height: '38px' }}
                      title={`Shopping Cart (${cartCount} items)`}
                    >
                      <FontAwesomeIcon icon={faShoppingCart} className={shouldUseDarkNavbar ? 'text-primary' : 'text-white'} />
                      {cartCount > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary cart-badge">
                          {cartCount > 99 ? '99+' : cartCount}
                        </span>
                      )}
                    </Link>
                  </div>
                </>
              )}
              
              {/* Theme Settings Button - Available for all users */}
              <div className="position-relative mx-1" ref={themeDropdownRef}>
                <button
                  className={`btn btn-icon btn-sm rounded-circle d-flex align-items-center justify-content-center hover-lift transition-all ${
                    shouldUseDarkNavbar ? 'btn-light' : 'btn-outline-light'
                  }`}
                  style={{ width: '38px', height: '38px' }}
                  onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                  title="Theme Settings"
                >
                  <FontAwesomeIcon 
                    icon={theme === 'dark' ? faSun : faMoon} 
                    className={shouldUseDarkNavbar ? 'text-primary' : 'text-white'} 
                  />
                </button>
                
                {themeDropdownOpen && (
                  <div className="dropdown-menu dropdown-menu-end show position-absolute" style={{ 
                    top: '100%', 
                    right: '0', 
                    minWidth: '180px',
                    zIndex: 1000,
                    marginTop: '8px'
                  }}>
                    <h6 className="dropdown-header">
                      <FontAwesomeIcon icon={faPalette} className="me-2" />
                      Theme Settings
                    </h6>
                    <button 
                      className={`dropdown-item d-flex align-items-center ${theme === 'light' ? 'active' : ''}`}
                      onClick={() => {
                        setLightTheme();
                        setThemeDropdownOpen(false);
                      }}
                    >
                      <FontAwesomeIcon icon={faSun} className="me-2" />
                      Light Theme
                    </button>
                    <button 
                      className={`dropdown-item d-flex align-items-center ${theme === 'dark' ? 'active' : ''}`}
                      onClick={() => {
                        setDarkTheme();
                        setThemeDropdownOpen(false);
                      }}
                    >
                      <FontAwesomeIcon icon={faMoon} className="me-2" />
                      Dark Theme
                    </button>
                  </div>
                )}
              </div>
              
              {/* Login/Register buttons for non-logged in users */}
              {!isAuthenticated ? (
                <div className="login-buttons d-flex gap-2">
                  <Link to="/login" className={`btn btn-animated ${shouldUseDarkNavbar ? 'btn-outline-primary' : 'btn-outline-light'} btn-sm rounded-pill hover-lift`}>Log In</Link>
                  <Link to="/signup" className="btn btn-animated btn-primary btn-sm rounded-pill hover-lift">Sign Up</Link>
                </div>
              ) : (
                <UserProfileDropdown />
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Custom CSS for navbar */}
      <style jsx="true">{`
        /* Logo styles */
        .navbar-brand {
          text-decoration: none !important;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          position: relative;
        }

        .navbar-brand:hover {
          transform: scale(1.05);
          text-decoration: none !important;
        }

        .navbar-brand:focus,
        .navbar-brand:active {
          outline: none !important;
          box-shadow: none !important;
          text-decoration: none !important;
        }

        .logo-link {
          display: flex !important;
          align-items: center !important;
          user-select: none;
        }

        .brand-logo {
          transition: all 0.3s ease;
        }

        .navbar-brand:hover .brand-logo {
          transform: rotate(5deg) scale(1.1);
        }

        .navbar-brand:active {
          transform: scale(0.98);
        }

        .search-form.active {
          z-index: 100;
        }

        .dropdown-toggle::after {
          display: none;
        }

        /* Ensure no underlines on nav links */
        .navbar-nav .nav-link {
          text-decoration: none !important;
          border-bottom: none !important;
        }

        .navbar-nav .nav-link:focus,
        .navbar-nav .nav-link:active {
          outline: none !important;
          box-shadow: none !important;
        }

        /* Cart animations */
        .cart-bounce {
          animation: cartBounce 0.6s ease-in-out;
        }

        @keyframes cartBounce {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(0.95); }
          75% { transform: scale(1.1); }
        }

        .cart-badge {
          animation: badgePulse 0.3s ease-in-out;
          font-size: 0.7rem;
          min-width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        @keyframes badgePulse {
          0% { transform: scale(0.8); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        /* Hover effects for cart */
        .btn-icon:hover .cart-badge {
          transform: scale(1.1);
        }
      `}</style>
    </header>
    </>
  );
}

export default Header;