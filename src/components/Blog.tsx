import React, { useState, useEffect } from 'react';
import { FaSearch, FaTag, FaClock, FaChevronRight, FaBookmark } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getPublishedBlogPosts } from '../utils/blogStorage';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  imageUrl: string;
  tags: string[];
  readTime: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
}

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Load published blog posts
    const posts = getPublishedBlogPosts();
    setBlogPosts(posts);
  }, []);

  // Technology color mapping
  const techColors: { [key: string]: { bg: string; text: string; darkBg: string; darkText: string } } = {
    'React': { 
      bg: 'bg-blue-100', 
      text: 'text-blue-600',
      darkBg: 'dark:bg-blue-900/30',
      darkText: 'dark:text-blue-400'
    },
    'TypeScript': { 
      bg: 'bg-blue-100', 
      text: 'text-blue-700',
      darkBg: 'dark:bg-blue-900/30',
      darkText: 'dark:text-blue-300'
    },
    'Node.js': { 
      bg: 'bg-green-100', 
      text: 'text-green-700',
      darkBg: 'dark:bg-green-900/30',
      darkText: 'dark:text-green-400'
    },
    'Express': { 
      bg: 'bg-gray-100', 
      text: 'text-gray-700',
      darkBg: 'dark:bg-gray-800',
      darkText: 'dark:text-gray-300'
    },
    'Docker': { 
      bg: 'bg-blue-100', 
      text: 'text-blue-600',
      darkBg: 'dark:bg-blue-900/30',
      darkText: 'dark:text-blue-400'
    },
    'Git': { 
      bg: 'bg-orange-100', 
      text: 'text-orange-700',
      darkBg: 'dark:bg-orange-900/30',
      darkText: 'dark:text-orange-400'
    },
    'CSS': { 
      bg: 'bg-blue-100', 
      text: 'text-blue-600',
      darkBg: 'dark:bg-blue-900/30',
      darkText: 'dark:text-blue-400'
    },
    'Tailwind': { 
      bg: 'bg-cyan-100', 
      text: 'text-cyan-700',
      darkBg: 'dark:bg-cyan-900/30',
      darkText: 'dark:text-cyan-400'
    },
    'Redux': { 
      bg: 'bg-purple-100', 
      text: 'text-purple-700',
      darkBg: 'dark:bg-purple-900/30',
      darkText: 'dark:text-purple-400'
    }
  };

  // Default colors for tags without specific mapping
  const defaultColors = {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    darkBg: 'dark:bg-gray-800',
    darkText: 'dark:text-gray-300'
  };

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Update the date formatting in the blog post card
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Blog & Articles
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Explore the latest articles about web development, design patterns, and software engineering best practices.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles by title or tags..."
                className="w-full px-6 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                         rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500
                         text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <FaSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl 
                         transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Post Image */}
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10"></div>
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 z-20 flex items-center space-x-3">
                    <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
                      {post.category}
                    </span>
                    <span className="text-white text-sm flex items-center">
                      <FaBookmark className="mr-2" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-500 
                               dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Author and Meta Information */}
                  <div className="flex flex-col space-y-4">
                    {/* Author Info */}
                    <div className="flex items-center space-x-3 group-hover:transform group-hover:scale-105 transition-transform duration-300">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-green-500/30 rounded-full blur-lg transform group-hover:scale-110 transition-all duration-300
                                      animate-[glow_2s_ease-in-out_infinite]"></div>
                        <img
                          src={post.author?.avatar}
                          alt={post.author?.name}
                          className="relative w-12 h-12 rounded-full border-2 border-green-500/50 
                                   transform transition-all duration-300 group-hover:scale-110
                                   shadow-[0_0_15px_2px_rgba(34,197,94,0.5)] dark:shadow-[0_0_15px_2px_rgba(34,197,94,0.6)]"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-green-500 transition-colors duration-300">
                          {post.author?.name}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {post.author?.role}
                        </p>
                      </div>
                    </div>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <FaClock className="mr-2" />
                          {formatDate(post.date)}
                        </span>
                        <div className="flex items-center space-x-2">
                          <FaTag className="mr-1" />
                          {post.tags.slice(0, 2).map((tag, index) => {
                            const colors = techColors[tag] || defaultColors;
                            return (
                              <span
                                key={index}
                                className={`px-2 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText}`}
                              >
                                {tag}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      <FaChevronRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* No Results Message */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
                No articles found matching your search criteria.
              </p>
              <p className="text-gray-500 dark:text-gray-500">
                Try adjusting your search terms or browse all articles.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog; 