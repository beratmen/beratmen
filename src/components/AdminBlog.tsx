import React, { useState, useEffect } from 'react';
import { FaSave, FaImage, FaTags, FaClock, FaTrash, FaEye, FaEyeSlash, FaDraftingCompass, FaFolder, 
         FaParagraph, FaCog, FaLink, FaHashtag, FaRegImage, FaMarkdown, FaBold, FaItalic, FaListUl,
         FaListOl, FaQuoteRight, FaCode, FaHeading, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { saveBlogPost, getBlogPosts, deleteBlogPost } from '../utils/blogStorage';
import { useNavigate } from 'react-router-dom';

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

interface EditorStats {
  words: number;
  characters: number;
}

const CATEGORIES = [
  'Technology',
  'Programming',
  'Web Development',
  'Software Engineering',
  'DevOps',
  'Career',
  'Tutorial',
  'Best Practices'
];

const ADMIN_CREDENTIALS = {
  username: 'beratmen',
  password: '@NB281109#'
};

const AdminBlog: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogPost, setBlogPost] = useState<BlogPost>({
    id: Date.now(),
    title: '',
    excerpt: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    imageUrl: '',
    tags: [],
    readTime: '5 min read',
    isDraft: true,
    goldenLinks: [],
    author: {
      name: 'Berat MEN',
      avatar: 'https://avatars.githubusercontent.com/u/76039810?v=4',
      role: 'Software Developer'
    }
  });
  const [previewMode, setPreviewMode] = useState(false);
  const [fullScreenPreview, setFullScreenPreview] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [showDrafts, setShowDrafts] = useState(false);
  const [linkInput, setLinkInput] = useState({ url: '', title: '' });
  const [customReadTime, setCustomReadTime] = useState(false);
  const [manualReadTime, setManualReadTime] = useState('5');
  const [activeTab, setActiveTab] = useState('content');
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [editorStats, setEditorStats] = useState<EditorStats>({ words: 0, characters: 0 });
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showManagePosts, setShowManagePosts] = useState(false);

  useEffect(() => {
    // Check for existing admin authentication
    const adminAuth = localStorage.getItem('admin_auth');
    if (adminAuth) {
      setIsAuthenticated(true);
    }

    const posts = getBlogPosts();
    setBlogPosts(posts);
  }, []);

  useEffect(() => {
    if (!customReadTime) {
      // Automatically calculate reading time based on content length
      const wordsPerMinute = 200;
      const words = blogPost.content.trim().split(/\s+/).length;
      const readingTime = Math.max(1, Math.ceil(words / wordsPerMinute));
      setBlogPost(prev => ({
        ...prev,
        readTime: `${readingTime} min read`
      }));
    } else {
      setBlogPost(prev => ({
        ...prev,
        readTime: `${manualReadTime} min read`
      }));
    }
  }, [blogPost.content, customReadTime, manualReadTime]);

  // Add stats calculation effect
  useEffect(() => {
    const content = blogPost.content.trim();
    const words = content ? content.split(/\s+/).length : 0;
    const characters = content.length;
    setEditorStats({ words, characters });
  }, [blogPost.content]);

  // Modify auto-save functionality
  useEffect(() => {
    if (autoSaveEnabled && blogPost.title && blogPost.content) {
      const autoSaveTimer = setTimeout(async () => {
        setIsSaving(true);
        try {
          await handleSave(true);
        } finally {
          setIsSaving(false);
          setLastSaved(new Date());
        }
      }, 60000);

      return () => clearTimeout(autoSaveTimer);
    }
  }, [blogPost, autoSaveEnabled]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      loginForm.username === ADMIN_CREDENTIALS.username && 
      loginForm.password === ADMIN_CREDENTIALS.password
    ) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      setIsAuthenticated(false);
      localStorage.removeItem('admin_auth');
      navigate('/blog');
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!blogPost.tags.includes(tagInput.trim())) {
        setBlogPost(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setBlogPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = async (asDraft: boolean = false) => {
    if (!blogPost.title || !blogPost.content) {
      alert('Please fill in at least the title and content');
      return;
    }

    try {
      const postToSave = {
        ...blogPost,
        isDraft: asDraft,
        date: new Date().toISOString().split('T')[0],
        goldenLinks: blogPost.goldenLinks || []
      };
      saveBlogPost(postToSave);
      alert(`Blog post ${asDraft ? 'saved as draft' : 'published'} successfully!`);
      if (!asDraft) {
        navigate('/blog');
      } else {
        const posts = getBlogPosts();
        setBlogPosts(posts);
        // Reset form for new draft
        setBlogPost({
          ...blogPost,
          id: Date.now(),
          title: '',
          excerpt: '',
          content: '',
          tags: [],
          category: '',
          imageUrl: '',
          isDraft: true,
          goldenLinks: []
        });
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert('Failed to save blog post. Please try again.');
    }
  };

  const handleDeleteDraft = (id: number) => {
    if (window.confirm('Are you sure you want to delete this draft?')) {
      deleteBlogPost(id);
      const posts = getBlogPosts();
      setBlogPosts(posts);
    }
  };

  const loadDraft = (draft: BlogPost) => {
    setBlogPost({
      ...draft,
      goldenLinks: draft.goldenLinks || []
    });
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (linkInput.url.trim() && linkInput.title.trim()) {
      const newLink = {
        url: linkInput.url.trim(),
        title: linkInput.title.trim()
      };
      
      setBlogPost(prev => ({
        ...prev,
        goldenLinks: [...(prev.goldenLinks || []), newLink]
      }));
      
      // Clear the input fields after adding
      setLinkInput({ url: '', title: '' });
    }
  };

  const handleRemoveLink = (urlToRemove: string) => {
    setBlogPost(prev => ({
      ...prev,
      goldenLinks: prev.goldenLinks?.filter(link => link.url !== urlToRemove) || []
    }));
  };

  // Add markdown toolbar handlers
  const insertMarkdown = (prefix: string, suffix: string = '') => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = blogPost.content.substring(start, end);
    const beforeText = blogPost.content.substring(0, start);
    const afterText = blogPost.content.substring(end);

    const newContent = `${beforeText}${prefix}${selectedText}${suffix}${afterText}`;
    setBlogPost(prev => ({ ...prev, content: newContent }));

    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        end + prefix.length
      );
    }, 0);
  };

  const renderMarkdownToolbar = () => (
    <div className="flex items-center space-x-2 mb-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <button
        onClick={() => insertMarkdown('**', '**')}
        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
        title="Bold"
      >
        <FaBold />
      </button>
      <button
        onClick={() => insertMarkdown('*', '*')}
        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
        title="Italic"
      >
        <FaItalic />
      </button>
      <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
      <button
        onClick={() => insertMarkdown('### ')}
        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
        title="Heading"
      >
        <FaHeading />
      </button>
      <button
        onClick={() => insertMarkdown('> ')}
        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
        title="Quote"
      >
        <FaQuoteRight />
      </button>
      <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
      <button
        onClick={() => insertMarkdown('- ')}
        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
        title="Unordered List"
      >
        <FaListUl />
      </button>
      <button
        onClick={() => insertMarkdown('1. ')}
        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
        title="Ordered List"
      >
        <FaListOl />
      </button>
      <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
      <button
        onClick={() => insertMarkdown('\`', '\`')}
        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
        title="Inline Code"
      >
        <FaCode />
      </button>
    </div>
  );

  // Modify the content editor section in renderEditorTab
  const renderContentEditor = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Content <span className="text-sm text-gray-500">(Markdown supported)</span>
      </label>
      <div className="space-y-2">
        {renderMarkdownToolbar()}
        <div className="relative">
          <textarea
            value={blogPost.content}
            onChange={(e) => setBlogPost(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Write your blog post content here..."
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 
                     border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 
                     focus:outline-none resize-none h-96 font-mono"
          />
          <div className="absolute right-2 bottom-2 flex items-center space-x-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {editorStats.words} words | {editorStats.characters} characters
            </div>
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="p-2 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 
                       dark:hover:bg-gray-500 transition-colors duration-200"
              title={previewMode ? "Edit Mode" : "Preview Mode"}
            >
              {previewMode ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Add auto-save indicator in the header
  const renderAutoSaveIndicator = () => (
    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2">
      {isSaving ? (
        <>
          <FaSpinner className="animate-spin" />
          <span>Saving...</span>
        </>
      ) : lastSaved ? (
        <>
          <FaCheckCircle className="text-green-500" />
          <span>Saved {new Date(lastSaved).toLocaleTimeString()}</span>
        </>
      ) : null}
    </div>
  );

  const toggleFullScreenPreview = () => {
    setFullScreenPreview(!fullScreenPreview);
    setPreviewMode(true);
  };

  // Add preview mode component
  const PreviewMode = () => (
    <div className={`${fullScreenPreview ? 'fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto' : ''}`}>
      <div className={`${fullScreenPreview ? 'max-w-4xl mx-auto px-4 py-8' : ''}`}>
        {fullScreenPreview && (
          <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 py-4 mb-6 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Preview Mode</h2>
            <div className="flex space-x-3">
              <button
                onClick={() => setPreviewMode(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Edit
              </button>
              <button
                onClick={toggleFullScreenPreview}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Exit Full Screen
              </button>
            </div>
          </div>
        )}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h1>{blogPost.title || 'Untitled Post'}</h1>
          {blogPost.imageUrl && (
            <img
              src={blogPost.imageUrl}
              alt={blogPost.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={blogPost.author.avatar}
              alt={blogPost.author.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div className="font-medium">{blogPost.author.name}</div>
              <div className="text-sm text-gray-500">{blogPost.author.role}</div>
            </div>
          </div>
          <div className="mb-6">
            <div className="text-sm text-gray-500">
              {blogPost.category && (
                <span className="mr-4">
                  <FaFolder className="inline mr-1" />
                  {blogPost.category}
                </span>
              )}
              <span>
                <FaClock className="inline mr-1" />
                {blogPost.readTime}
              </span>
            </div>
          </div>
          {blogPost.excerpt && (
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6 italic">
              {blogPost.excerpt}
            </div>
          )}
          <ReactMarkdown>{blogPost.content || 'No content yet...'}</ReactMarkdown>
          {blogPost.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {blogPost.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 
                           dark:text-blue-400 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Golden Links Preview */}
          {blogPost.goldenLinks && blogPost.goldenLinks.length > 0 && (
            <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-4">
                Featured Links
              </h3>
              <div className="space-y-2">
                {blogPost.goldenLinks.map((link, index) => (
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
        </div>
      </div>
    </div>
  );

  const renderEditorTab = () => {
    switch (activeTab) {
      case 'content':
        return renderContentEditor();

      case 'media':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cover Image URL
              </label>
              <div className="space-y-4">
                <input
                  type="text"
                  value={blogPost.imageUrl}
                  onChange={(e) => setBlogPost(prev => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="Enter image URL"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 
                           border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
                />
                {blogPost.imageUrl && (
                  <div className="relative">
                    <img
                      src={blogPost.imageUrl}
                      alt="Cover preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setBlogPost(prev => ({ ...prev, imageUrl: '' }))}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full 
                               hover:bg-red-600 transition-colors duration-200"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Golden Links</h3>
              <form onSubmit={handleAddLink} className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="url"
                    value={linkInput.url}
                    onChange={(e) => setLinkInput(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="Enter URL"
                    className="w-full px-4 py-2 bg-white dark:bg-gray-600 rounded-lg border-2 
                             border-gray-200 dark:border-gray-500 focus:ring-2 focus:ring-blue-400"
                    required
                  />
                  <input
                    type="text"
                    value={linkInput.title}
                    onChange={(e) => setLinkInput(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Link Title"
                    className="w-full px-4 py-2 bg-white dark:bg-gray-600 rounded-lg border-2 
                             border-gray-200 dark:border-gray-500 focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg 
                           hover:bg-yellow-600 transition-colors duration-200"
                >
                  Add Link
                </button>
              </form>
              <div className="mt-4 space-y-2">
                {(blogPost.goldenLinks || []).map((link, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 
                             border-2 border-yellow-200 dark:border-yellow-700 rounded-lg"
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 
                               dark:hover:text-yellow-300 transition-colors duration-200"
                    >
                      {link.title}
                    </a>
                    <button
                      onClick={() => handleRemoveLink(link.url)}
                      className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 
                               dark:hover:text-yellow-300"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'tags':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags
              </label>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Add tags (press Enter)"
                    className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 
                             border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {blogPost.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 
                               dark:text-blue-400 rounded-full text-sm flex items-center"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-blue-400 hover:text-blue-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Reading Time Settings</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Custom reading time
                  </span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={customReadTime}
                      onChange={(e) => setCustomReadTime(e.target.checked)}
                      className="sr-only"
                    />
                    <div className="w-10 h-6 bg-gray-300 rounded-full shadow-inner"></div>
                    <div className={`absolute w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ease-in-out transform ${customReadTime ? 'translate-x-5' : 'translate-x-1'} top-1`}></div>
                  </div>
                </label>
                {customReadTime ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="1"
                      value={manualReadTime}
                      onChange={(e) => setManualReadTime(e.target.value)}
                      className="w-20 px-3 py-2 bg-white dark:bg-gray-600 rounded border-2 
                               border-gray-200 dark:border-gray-500 focus:ring-2 
                               focus:ring-blue-400 text-center"
                    />
                    <span className="text-gray-600 dark:text-gray-300">minutes</span>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Automatically calculated based on content length ({blogPost.readTime})
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Editor Settings</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Enable auto-save (every minute)
                  </span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={autoSaveEnabled}
                      onChange={(e) => setAutoSaveEnabled(e.target.checked)}
                      className="sr-only"
                    />
                    <div className="w-10 h-6 bg-gray-300 rounded-full shadow-inner"></div>
                    <div className={`absolute w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ease-in-out transform ${autoSaveEnabled ? 'translate-x-5' : 'translate-x-1'} top-1`}></div>
                  </div>
                </label>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Author Information</h3>
              <div className="flex items-center space-x-4">
                <img
                  src={blogPost.author.avatar}
                  alt={blogPost.author.name}
                  className="w-16 h-16 rounded-full border-2 border-gray-200 dark:border-gray-600"
                />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{blogPost.author.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{blogPost.author.role}</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Add this function to handle post deletion
  const handleDeletePost = (id: number, isDraft: boolean) => {
    if (window.confirm(`Are you sure you want to delete this ${isDraft ? 'draft' : 'published post'}? This action cannot be undone.`)) {
      try {
        deleteBlogPost(id);
        const posts = getBlogPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete the post. Please try again.');
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Admin Login
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="Enter username"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 
                           border border-gray-200 dark:border-gray-600 focus:outline-none 
                           focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500
                           text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 
                           border border-gray-200 dark:border-gray-600 focus:outline-none 
                           focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500
                           text-gray-900 dark:text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg 
                         hover:bg-blue-700 transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="sticky top-16 z-40 bg-gray-50 dark:bg-gray-900 py-2">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Blog Post Editor
                </h1>
                {autoSaveEnabled && renderAutoSaveIndicator()}
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowManagePosts(!showManagePosts)}
                  className="flex items-center px-3 py-1.5 bg-purple-500 text-white rounded-lg
                           hover:bg-purple-600 transition-colors duration-200 text-sm"
                >
                  <FaFolder className="mr-2" />
                  {showManagePosts ? 'Hide Posts' : 'Manage Posts'}
                </button>
                <button
                  onClick={() => setShowDrafts(!showDrafts)}
                  className="flex items-center px-3 py-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg
                           hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 text-sm"
                >
                  <FaDraftingCompass className="mr-2" />
                  {showDrafts ? 'Hide Drafts' : 'Show Drafts'}
                </button>
                {!previewMode ? (
                  <button
                    onClick={toggleFullScreenPreview}
                    className="flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-lg
                             hover:bg-blue-600 transition-colors duration-200 text-sm"
                  >
                    <FaEye className="mr-2" />
                    Preview
                  </button>
                ) : !fullScreenPreview && (
                  <button
                    onClick={() => setPreviewMode(false)}
                    className="flex items-center px-3 py-1.5 bg-gray-500 text-white rounded-lg
                             hover:bg-gray-600 transition-colors duration-200 text-sm"
                  >
                    <FaEyeSlash className="mr-2" />
                    Edit
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-1.5 bg-red-500 text-white rounded-lg
                           hover:bg-red-600 transition-colors duration-200 text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="mt-16">
            {/* Manage Posts Panel */}
            {showManagePosts && (
              <div className="mb-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Manage All Posts</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {blogPosts.map(post => (
                      <div 
                        key={post.id} 
                        className={`flex items-center justify-between p-4 rounded-lg ${
                          post.isDraft 
                            ? 'bg-gray-50 dark:bg-gray-700' 
                            : 'bg-green-50 dark:bg-green-900/20'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {post.title || 'Untitled Post'}
                            </h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              post.isDraft 
                                ? 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300' 
                                : 'bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300'
                            }`}>
                              {post.isDraft ? 'Draft' : 'Published'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Last edited: {post.date}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => loadDraft(post)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.id, !!post.isDraft)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Drafts Panel */}
            {showDrafts && !fullScreenPreview && (
              <div className="mb-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Saved Drafts</h2>
                <div className="space-y-4">
                  {blogPosts.filter(post => post.isDraft).map(draft => (
                    <div key={draft.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{draft.title || 'Untitled Draft'}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Last edited: {draft.date}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => loadDraft(draft)}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteDraft(draft.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Main Editor */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
              {previewMode ? (
                <PreviewMode />
              ) : (
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={blogPost.title}
                      onChange={(e) => setBlogPost(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Blog Title"
                      className="w-full px-4 py-3 text-xl font-bold bg-transparent border-2 border-gray-200 
                               dark:border-gray-700 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 
                               focus:outline-none text-gray-900 dark:text-white"
                    />
                  </div>

                  {/* Category and Image URL */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        value={blogPost.category}
                        onChange={(e) => setBlogPost(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 
                                 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="">Select Category</option>
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Cover Image URL
                      </label>
                      <input
                        type="text"
                        value={blogPost.imageUrl}
                        onChange={(e) => setBlogPost(prev => ({ ...prev, imageUrl: e.target.value }))}
                        placeholder="Enter image URL"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 
                                 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Excerpt
                    </label>
                    <textarea
                      value={blogPost.excerpt}
                      onChange={(e) => setBlogPost(prev => ({ ...prev, excerpt: e.target.value }))}
                      placeholder="Brief excerpt/summary of the blog post..."
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 
                               border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 
                               dark:focus:ring-blue-500 focus:outline-none resize-none h-24"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tags
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={handleAddTag}
                          placeholder="Add tags (press Enter)"
                          className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 
                                   border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {blogPost.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 
                                     dark:text-blue-400 rounded-full text-sm flex items-center"
                          >
                            {tag}
                            <button
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-2 text-blue-400 hover:text-blue-600"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content Editor */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Content <span className="text-sm text-gray-500">(Markdown supported)</span>
                    </label>
                    <div className="space-y-2">
                      {renderMarkdownToolbar()}
                      <div className="relative">
                        <textarea
                          value={blogPost.content}
                          onChange={(e) => setBlogPost(prev => ({ ...prev, content: e.target.value }))}
                          placeholder="Write your blog post content here..."
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 
                                   border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 
                                   focus:outline-none resize-none h-96 font-mono"
                        />
                        <div className="absolute right-2 bottom-2 flex items-center space-x-4">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {editorStats.words} words | {editorStats.characters} characters
                          </div>
                          <button
                            onClick={() => setPreviewMode(!previewMode)}
                            className="p-2 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 
                                     dark:hover:bg-gray-500 transition-colors duration-200"
                            title={previewMode ? "Edit Mode" : "Preview Mode"}
                          >
                            {previewMode ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reading Time Settings */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Reading Time Settings</h3>
                      <label className="flex items-center cursor-pointer">
                        <span className="mr-3 text-sm text-gray-600 dark:text-gray-300">
                          Custom reading time
                        </span>
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={customReadTime}
                            onChange={(e) => setCustomReadTime(e.target.checked)}
                            className="sr-only"
                          />
                          <div className="w-10 h-6 bg-gray-300 rounded-full shadow-inner"></div>
                          <div className={`absolute w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ease-in-out transform ${customReadTime ? 'translate-x-5' : 'translate-x-1'} top-1`}></div>
                        </div>
                      </label>
                    </div>
                    {customReadTime ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          min="1"
                          value={manualReadTime}
                          onChange={(e) => setManualReadTime(e.target.value)}
                          className="w-20 px-3 py-2 bg-white dark:bg-gray-600 rounded border-2 
                                   border-gray-200 dark:border-gray-500 focus:ring-2 
                                   focus:ring-blue-400 text-center"
                        />
                        <span className="text-gray-600 dark:text-gray-300">minutes</span>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Automatically calculated based on content length ({blogPost.readTime})
                      </p>
                    )}
                  </div>

                  {/* Golden Links */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Golden Links</h3>
                    <form onSubmit={handleAddLink} className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="url"
                          value={linkInput.url}
                          onChange={(e) => setLinkInput(prev => ({ ...prev, url: e.target.value }))}
                          placeholder="Enter URL"
                          className="w-full px-4 py-2 bg-white dark:bg-gray-600 rounded-lg border-2 
                                   border-gray-200 dark:border-gray-500 focus:ring-2 focus:ring-blue-400"
                          required
                        />
                        <input
                          type="text"
                          value={linkInput.title}
                          onChange={(e) => setLinkInput(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Link Title"
                          className="w-full px-4 py-2 bg-white dark:bg-gray-600 rounded-lg border-2 
                                   border-gray-200 dark:border-gray-500 focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg 
                                 hover:bg-yellow-600 transition-colors duration-200"
                      >
                        Add Link
                      </button>
                    </form>
                    <div className="mt-4 space-y-2">
                      {(blogPost.goldenLinks || []).map((link, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 
                                   border-2 border-yellow-200 dark:border-yellow-700 rounded-lg"
                        >
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 
                                     dark:hover:text-yellow-300 transition-colors duration-200"
                          >
                            {link.title}
                          </a>
                          <button
                            onClick={() => handleRemoveLink(link.url)}
                            className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 
                                     dark:hover:text-yellow-300"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <FaClock className="inline mr-2" />
                      Estimated reading time: {blogPost.readTime}
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleSave(true)}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg 
                                 hover:bg-gray-600 transition-colors duration-200"
                      >
                        Save as Draft
                      </button>
                      <button
                        onClick={() => handleSave(false)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg 
                                 hover:bg-blue-700 transition-colors duration-200"
                      >
                        Publish
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlog; 