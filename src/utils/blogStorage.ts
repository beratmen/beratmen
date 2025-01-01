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

const STORAGE_KEY = 'blog_posts';

// Helper function to handle storage errors
const handleStorageError = (error: unknown, operation: string) => {
  console.error(`Error during ${operation}:`, error);
  throw new Error(`Failed to ${operation}`);
};

export const getBlogPosts = (): BlogPost[] => {
  try {
    const posts = localStorage.getItem(STORAGE_KEY);
    return posts ? JSON.parse(posts) : [];
  } catch (error) {
    return handleStorageError(error, 'get blog posts');
  }
};

export const getPublishedBlogPosts = (): BlogPost[] => {
  try {
    const posts = getBlogPosts();
    return posts
      .filter(post => !post.isDraft)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    return handleStorageError(error, 'get published blog posts');
  }
};

export const saveBlogPost = (post: BlogPost): void => {
  try {
    const posts = getBlogPosts();
    const existingIndex = posts.findIndex(p => p.id === post.id);
    
    if (existingIndex !== -1) {
      // Update existing post
      posts[existingIndex] = {
        ...post,
        date: new Date().toISOString().split('T')[0]
      };
    } else {
      // Add new post at the beginning
      posts.unshift({
        ...post,
        date: new Date().toISOString().split('T')[0]
      });
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    handleStorageError(error, 'save blog post');
  }
};

export const getBlogPostById = (id: number): BlogPost | undefined => {
  try {
    const posts = getBlogPosts();
    return posts.find(post => post.id === id);
  } catch (error) {
    return handleStorageError(error, 'get blog post by ID');
  }
};

export const deleteBlogPost = (id: number): void => {
  try {
    const posts = getBlogPosts();
    const updatedPosts = posts.filter(post => post.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
  } catch (error) {
    handleStorageError(error, 'delete blog post');
  }
};

export const updateBlogPost = (updatedPost: BlogPost): void => {
  try {
    const posts = getBlogPosts();
    const index = posts.findIndex(post => post.id === updatedPost.id);
    if (index !== -1) {
      posts[index] = {
        ...updatedPost,
        date: new Date().toISOString().split('T')[0]
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } else {
      throw new Error('Blog post not found');
    }
  } catch (error) {
    handleStorageError(error, 'update blog post');
  }
}; 