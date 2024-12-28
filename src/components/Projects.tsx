import React, { useEffect, useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          My Projects
        </h2>
        <div className="relative">
          <div className="overflow-x-auto pb-4 hide-scrollbar">
            <div className="inline-flex space-x-6" style={{ minWidth: 'max-content' }}>
              {repositories.map((repo) => (
                <div
                  key={repo.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all"
                  style={{ width: '350px' }}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{repo.name}</h3>
                      <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <FaStar className="mr-1" />
                          <span>{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center">
                          <FaCodeBranch className="mr-1" />
                          <span>{repo.forks_count}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 h-20 overflow-y-auto">
                      {repo.description || 'No description available'}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4 max-h-24 overflow-y-auto">
                      {repo.language && (
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                          {repo.language}
                        </span>
                      )}
                      {repo.topics?.map((topic, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex space-x-4">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                          <FaGithub className="text-xl" />
                        </a>
                        {repo.homepage && (
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                          >
                            <FaExternalLinkAlt className="text-xl" />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                      <p>Created: {formatDate(repo.created_at)}</p>
                      <p>Last updated: {formatDate(repo.updated_at)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Scroll indicators */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent w-12 h-full pointer-events-none"></div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent w-12 h-full pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default Projects; 