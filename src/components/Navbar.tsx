import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Handle smooth scrolling for hash links
  useEffect(() => {
    const handleHashScroll = () => {
      if (location.hash) {
        const id = location.hash.slice(1);
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }, 0);
        }
      }
    };

    handleHashScroll();
  }, [location.hash]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  // Close mobile menu on resize if open
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const isMainPage = location.pathname === '/';

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md z-50 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="group flex items-center space-x-2 focus:outline-none">
            <div className="text-2xl md:text-3xl font-bold tracking-tighter">
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent transition-colors duration-200">
                Berat
              </span>
              <span className="text-gray-900 dark:text-white">
                {' MEN'}
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {isMainPage ? (
              <>
                <button 
                  onClick={() => scrollToSection('home')} 
                  className="nav-link relative px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group focus:outline-none"
                >
                  <span className="relative z-10">Home</span>
                  <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200 ease-out origin-center"></div>
                </button>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="nav-link relative px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group focus:outline-none"
                >
                  <span className="relative z-10">About</span>
                  <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200 ease-out origin-center"></div>
                </button>
                <button 
                  onClick={() => scrollToSection('projects')} 
                  className="nav-link relative px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group focus:outline-none"
                >
                  <span className="relative z-10">Projects</span>
                  <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200 ease-out origin-center"></div>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/" 
                  className="nav-link relative px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group focus:outline-none"
                >
                  <span className="relative z-10">Home</span>
                  <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200 ease-out origin-center"></div>
                </Link>
                <Link 
                  to="/#about" 
                  className="nav-link relative px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group focus:outline-none"
                >
                  <span className="relative z-10">About</span>
                  <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200 ease-out origin-center"></div>
                </Link>
                <Link 
                  to="/#projects" 
                  className="nav-link relative px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group focus:outline-none"
                >
                  <span className="relative z-10">Projects</span>
                  <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200 ease-out origin-center"></div>
                </Link>
              </>
            )}
            <Link 
              to="/blog" 
              className="nav-link relative px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group focus:outline-none"
            >
              <span className="relative z-10">Blog</span>
              <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200 ease-out origin-center"></div>
            </Link>
            {isMainPage ? (
              <button
                onClick={() => scrollToSection('donate')}
                className="nav-link relative px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 text-white rounded-lg hover:shadow-lg transition-all duration-200 focus:outline-none"
              >
                Donate
              </button>
            ) : (
              <Link
                to="/#donate"
                className="nav-link relative px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 text-white rounded-lg hover:shadow-lg transition-all duration-200 focus:outline-none"
              >
                Donate
              </Link>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
              aria-label="Toggle theme"
            >
              {isDark ? <FaSun size={24} /> : <FaMoon size={24} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
              aria-label="Toggle theme"
            >
              {isDark ? <FaSun size={24} /> : <FaMoon size={24} />}
            </button>
            <button
              className="menu-button p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mobile-menu md:hidden absolute left-0 right-0 top-16 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg">
            <div className="px-4 py-3 space-y-3">
              {isMainPage ? (
                <>
                  <button
                    onClick={() => {
                      scrollToSection('home');
                      setIsOpen(false);
                    }}
                    className="nav-link block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white 
                             hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 focus:outline-none"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection('about');
                      setIsOpen(false);
                    }}
                    className="nav-link block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white 
                             hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 focus:outline-none"
                  >
                    About
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection('projects');
                      setIsOpen(false);
                    }}
                    className="nav-link block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white 
                             hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 focus:outline-none"
                  >
                    Projects
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    className="nav-link block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white 
                             hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 focus:outline-none"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/#about"
                    className="nav-link block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white 
                             hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 focus:outline-none"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    to="/#projects"
                    className="nav-link block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white 
                             hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 focus:outline-none"
                    onClick={() => setIsOpen(false)}
                  >
                    Projects
                  </Link>
                </>
              )}
              <Link
                to="/blog"
                className="nav-link block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white 
                         hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 focus:outline-none"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              {isMainPage ? (
                <button
                  onClick={() => {
                    scrollToSection('donate');
                    setIsOpen(false);
                  }}
                  className="nav-link block w-full text-left px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 
                           text-white rounded-lg hover:shadow-lg transition-all duration-200 focus:outline-none"
                >
                  Donate
                </button>
              ) : (
                <Link
                  to="/#donate"
                  className="nav-link block px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 
                           text-white rounded-lg hover:shadow-lg transition-all duration-200 focus:outline-none"
                  onClick={() => setIsOpen(false)}
                >
                  Donate
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 