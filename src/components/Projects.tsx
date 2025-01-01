import React, { useEffect, useState, useRef } from 'react';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch, FaChevronLeft, FaChevronRight, FaCode, FaCalendar } from 'react-icons/fa';
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
      <section id="projects" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
              My Projects
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Loading my latest projects and contributions...
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
              My Projects
            </span>
          </h2>
          <div className="text-center text-red-500 dark:text-red-400 mt-8">
            <p className="text-xl font-semibold mb-2">Oops! Something went wrong</p>
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
            My Projects
          </span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Explore my latest projects and contributions. Each project represents a unique challenge and learning experience.
        </p>

        <div className="relative group">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-20 
                     bg-white/90 dark:bg-gray-800/90 rounded-full p-4 shadow-lg backdrop-blur-sm
                     transition-all duration-300 ${
                       canScrollLeft
                         ? 'opacity-100 translate-x-0 hover:scale-110'
                         : 'opacity-0 -translate-x-full'
                     }`}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <FaChevronLeft className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          </button>

          <button
            onClick={() => scroll('right')}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-20 
                     bg-white/90 dark:bg-gray-800/90 rounded-full p-4 shadow-lg backdrop-blur-sm
                     transition-all duration-300 ${
                       canScrollRight
                         ? 'opacity-100 translate-x-0 hover:scale-110'
                         : 'opacity-0 translate-x-full'
                     }`}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <FaChevronRight className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          </button>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>

          {/* Projects Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto hide-scrollbar pb-8 pt-2"
          >
            <div className="inline-flex space-x-6">
              {repositories.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-[380px] transform transition-all duration-300 group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg 
                               border border-gray-100 dark:border-gray-700
                               transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/10 h-full">
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {repo.name}
                        </h3>
                        <div className="flex space-x-3">
                          {repo.homepage && (
                            <a
                              href={repo.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200
                                       transform transition-all duration-200 hover:scale-110"
                              aria-label="Live demo"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <FaExternalLinkAlt className="w-5 h-5" />
                            </a>
                          )}
                          <span className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200
                                       transform transition-all duration-200 hover:scale-110">
                            <FaGithub className="w-5 h-5" />
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                        {repo.description || 'No description available'}
                      </p>

                      {/* Tech Stack & Topics */}
                      <div className="space-y-4">
                        {/* Language */}
                        {repo.language && (
                          <div className="flex items-center space-x-2">
                            <FaCode className="text-gray-500 dark:text-gray-400" />
                            <span
                              className="px-3 py-1 rounded-full text-sm transition-colors"
                              style={{
                                backgroundColor: `${getLanguageColor(repo.language)}20`,
                                color: getLanguageColor(repo.language)
                              }}
                            >
                              {repo.language}
                            </span>
                          </div>
                        )}

                        {/* Topics */}
                        {repo.topics.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {repo.topics.slice(0, 3).map((topic) => (
                              <span
                                key={topic}
                                className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400
                                         rounded-full font-medium transition-colors"
                              >
                                {topic}
                              </span>
                            ))}
                            {repo.topics.length > 3 && (
                              <span className="px-3 py-1 text-sm bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400
                                           rounded-full font-medium transition-colors">
                                +{repo.topics.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Stats & Date */}
                      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center text-yellow-500 dark:text-yellow-400">
                              <FaStar className="w-4 h-4 mr-1" />
                              <span className="text-sm">{repo.stargazers_count}</span>
                            </div>
                            <div className="flex items-center text-blue-500 dark:text-blue-400">
                              <FaCodeBranch className="w-4 h-4 mr-1" />
                              <span className="text-sm">{repo.forks_count}</span>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                            <FaCalendar className="w-4 h-4 mr-2" />
                            <span className="text-sm">{formatDate(repo.created_at)}</span>
                          </div>
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