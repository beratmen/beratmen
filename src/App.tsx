import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Donate from './components/Donate';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import AdminBlog from './components/AdminBlog';
import Footer from './components/Footer';

const MainPage: React.FC = () => {
  return (
    <>
      <main className="relative">
        <Home />
        <About />
        <Projects />
        <Donate />
      </main>
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router basename="/beratmen">
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/admin/blog" element={<AdminBlog />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 