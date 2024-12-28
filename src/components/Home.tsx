import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Home: React.FC = () => {
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  useEffect(() => {
    const fetchGithubProfile = async () => {
      try {
        const response = await fetch('https://api.github.com/users/beratmen');
        if (response.ok) {
          const data = await response.json();
          setAvatarUrl(data.avatar_url);
        }
      } catch (error) {
        console.error('Failed to fetch GitHub profile:', error);
      }
    };

    fetchGithubProfile();
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 rounded-full animate-pulse"></div>
            <img
              src={avatarUrl || '/profile-picture.jpg'}
              alt="Berat MEN"
              className="relative w-48 h-48 rounded-full shadow-lg object-cover ring-4 ring-white dark:ring-gray-900"
            />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
            Berat
          </span>
          <span className="text-gray-900 dark:text-white">
            {' MEN'}
          </span>
        </h1>
        <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400 mb-8">
          Software Developer
        </h2>
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/beratmen"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/beratmen"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:beratmen9@gmail.com"
            className="text-3xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <MdEmail />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home; 