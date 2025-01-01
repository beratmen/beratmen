import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaClock, FaTag, FaArrowLeft, FaBookmark, FaShare, FaTrash, FaEdit } from 'react-icons/fa';
import { getBlogPostById, deleteBlogPost } from '../utils/blogStorage';
import ReactMarkdown from 'react-markdown';

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
  isDraft?: boolean;
  goldenLinks?: {
    url: string;
    title: string;
  }[];
  customReadTime?: boolean;
}

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const adminAuth = localStorage.getItem('admin_auth');
    setIsAdmin(!!adminAuth);
  }, []);

  useEffect(() => {
    const loadPost = () => {
      setIsLoading(true);
      setError(null);
      
      try {
        if (!id) {
          throw new Error('Post ID is required');
        }

        const blogPost = getBlogPostById(Number(id));
        if (!blogPost) {
          throw new Error('Post not found');
        }

        if (blogPost.isDraft && !isAdmin) {
          throw new Error('This post is not published yet');
        }

        setPost(blogPost);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load post');
        console.error('Error loading post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [id, isAdmin]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const handleDelete = async () => {
    if (!post || !window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return;
    }

    try {
      deleteBlogPost(post.id);
      navigate('/blog', { replace: true });
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete the post. Please try again.');
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {error || 'Post not found'}
          </h2>
          <Link
            to="/blog"
            className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <Link
                  to="/blog"
                  className="inline-flex items-center text-white hover:text-blue-300 transition-colors duration-200"
                >
                  <FaArrowLeft className="mr-2" />
                  Back to Blog
                </Link>
                <div className="flex items-center space-x-4">
                  {isAdmin && (
                    <>
                      <Link
                        to={`/admin/blog?edit=${post.id}`}
                        className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg 
                                 hover:bg-blue-600 transition-colors duration-200"
                      >
                        <FaEdit className="mr-2" />
                        Edit Post
                      </Link>
                      <button
                        onClick={handleDelete}
                        className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg 
                                 hover:bg-red-600 transition-colors duration-200"
                      >
                        <FaTrash className="mr-2" />
                        Delete
                      </button>
                    </>
                  )}
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg 
                             hover:bg-gray-600 transition-colors duration-200"
                  >
                    <FaShare className="mr-2" />
                    Share
                  </button>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {post.title}
              </h1>
              <div className="flex items-center space-x-6 text-white/90">
                <div className="flex items-center space-x-2">
                  <FaClock />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaBookmark />
                  <span>{post.category}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaTag />
                  <span>{post.tags.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Author Info */}
          <div className="flex items-center space-x-4 mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="relative">
              <div className="absolute -inset-1 bg-green-500/30 rounded-full blur-lg transform group-hover:scale-110 transition-all duration-300
                            animate-[glow_2s_ease-in-out_infinite]"></div>
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="relative w-16 h-16 rounded-full border-2 border-green-500/50 
                         transform transition-all duration-300
                         shadow-[0_0_15px_2px_rgba(34,197,94,0.5)] dark:shadow-[0_0_15px_2px_rgba(34,197,94,0.6)]"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {post.author.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {post.author.role}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Published on {formatDate(post.date)}
              </p>
            </div>
          </div>

          {/* Blog Content */}
          <article className="prose prose-lg dark:prose-invert max-w-none bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
            <ReactMarkdown>{post.content}</ReactMarkdown>

            {/* Golden Links Section */}
            {post.goldenLinks && post.goldenLinks.length > 0 && (
              <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg not-prose">
                <h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-4">
                  Featured Links
                </h3>
                <div className="space-y-2">
                  {post.goldenLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-2 text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 
                               dark:hover:text-yellow-300 transition-colors duration-200"
                    >
                      {link.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 
                         rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost; 