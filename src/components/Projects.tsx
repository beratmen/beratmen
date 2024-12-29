import React, { useEffect, useState, useRef } from 'react';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { githubColors } from '../utils/githubColors';

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  language: string;
  fork: boolean;
  created_at: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

const Projects: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getLanguageColor = (language: string) => {
    return githubColors[language] || '#858585';
  };

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      const newScrollLeft = direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollability);
      // Initial check
      checkScrollability();
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollability);
      }
    };
  }, [repositories]);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch('https://api.github.com/users/beratmen/repos');
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        // Filter out forked repositories and sort by creation date
        const filteredRepos = data
          .filter((repo: Repository) => !repo.fork)
          .sort((a: Repository, b: Repository) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        setRepositories(filteredRepos);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            My Projects
          </h2>
          <div className="text-center text-gray-600 dark:text-gray-400">Loading projects...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            My Projects
          </h2>
          <div className="text-center text-red-600 dark:text-red-400">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <style>
        {`
          @keyframes borderAnimation {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          .animated-border {
            position: relative;
          }
          .animated-border::before {
            content: '';
            position: absolute;
            inset: -2px;
            z-index: -1;
            background: linear-gradient(
              90deg,
              #3178c6,
              #00ADD8,
              #41b883,
              #3178c6
            );
            background-size: 300% 300%;
            animation: borderAnimation 8s ease infinite;
            border-radius: 0.5rem;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          .animated-border:hover::before {
            opacity: 1;
          }
        `}
      </style>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          My Projects
        </h2>
        <div className="relative group">
          {/* Left scroll button */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 dark:bg-gray-800/90 rounded-full p-4 shadow-xl transition-all duration-300 backdrop-blur-sm ${
              canScrollLeft
                ? 'opacity-100 translate-x-0 hover:bg-white dark:hover:bg-gray-700 hover:scale-110'
                : 'opacity-0 -translate-x-full cursor-default'
            }`}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <FaChevronLeft className="text-gray-600 dark:text-gray-300 text-2xl" />
          </button>

          {/* Right scroll button */}
          <button
            onClick={() => scroll('right')}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 dark:bg-gray-800/90 rounded-full p-4 shadow-xl transition-all duration-300 backdrop-blur-sm ${
              canScrollRight
                ? 'opacity-100 translate-x-0 hover:bg-white dark:hover:bg-gray-700 hover:scale-110'
                : 'opacity-0 translate-x-full cursor-default'
            }`}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <FaChevronRight className="text-gray-600 dark:text-gray-300 text-2xl" />
          </button>

          {/* Add gradient overlays for better button visibility */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>

          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto pb-4 hide-scrollbar scroll-smooth relative"
          >
            <div className="inline-flex space-x-6" style={{ minWidth: 'max-content' }}>
              {repositories.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block animated-border"
                >
                  <div
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer flex flex-col relative z-10"
                    style={{ width: '350px', height: '400px' }}
                  >
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate max-w-[200px]">
                          {repo.name}
                        </h3>
                        <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                          <div className="flex items-center group cursor-pointer">
                            <FaStar className="mr-1 text-yellow-400 group-hover:text-yellow-500 transform group-hover:scale-110 transition-all duration-200" />
                            <span className="group-hover:text-yellow-500 transition-colors duration-200">{repo.stargazers_count}</span>
                          </div>
                          <div className="flex items-center group cursor-pointer">
                            <FaCodeBranch className="mr-1 group-hover:text-blue-500 transform group-hover:scale-110 transition-all duration-200" />
                            <span className="group-hover:text-blue-500 transition-colors duration-200">{repo.forks_count}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4 flex-grow">
                        <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                          {repo.description || 'No description available'}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {repo.language && (
                            <span 
                              className="px-3 py-1 rounded-full text-sm flex items-center"
                              style={{
                                backgroundColor: `${getLanguageColor(repo.language)}20`,
                                color: getLanguageColor(repo.language)
                              }}
                            >
                              <span 
                                className="w-2 h-2 rounded-full mr-2"
                                style={{ backgroundColor: getLanguageColor(repo.language) }}
                              ></span>
                              {repo.language}
                            </span>
                          )}
                          {repo.topics?.slice(0, 3).map((topic, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                            >
                              {topic}
                            </span>
                          ))}
                          {repo.topics?.length > 3 && (
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                              +{repo.topics.length - 3} more
                            </span>
                          )}
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex space-x-4">
                            <span className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                              <FaGithub className="text-xl" />
                            </span>
                            {repo.homepage && (
                              <a
                                href={repo.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <FaExternalLinkAlt className="text-xl" />
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          <p>Created: {formatDate(repo.created_at)}</p>
                          <p>Last updated: {formatDate(repo.updated_at)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects; 