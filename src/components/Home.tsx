import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaArrowDown, FaCode, FaServer, FaMobileAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Home: React.FC = () => {
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

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
    setIsVisible(true);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className={`space-y-6 text-center md:text-left transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                  Berat
                </span>
                <span className="text-gray-900 dark:text-white">
                  {' MEN'}
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400 mb-4">
                Software Developer
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Passionate about creating modern web applications with cutting-edge technologies.
                Focused on delivering high-quality, user-centric solutions.
              </p>
              
              {/* Skills Overview */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <FaCode className="text-3xl text-blue-500 dark:text-blue-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Frontend Dev</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <FaServer className="text-3xl text-green-500 dark:text-green-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Backend Dev</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <FaMobileAlt className="text-3xl text-purple-500 dark:text-purple-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Responsive</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center md:justify-start space-x-6">
                <a
                  href="https://github.com/beratmen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://linkedin.com/in/beratmen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="mailto:beratmen9@gmail.com"
                  className="text-3xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  <MdEmail />
                </a>
              </div>
            </div>

            {/* Right Column - Profile Picture */}
            <div className={`flex justify-center transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 rounded-full animate-pulse opacity-75 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
                <div className="relative ring-4 ring-white dark:ring-gray-900 rounded-full">
                  <img
                    src={avatarUrl || '/profile-picture.jpg'}
                    alt="Berat MEN"
                    className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <button
              onClick={scrollToAbout}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 animate-bounce"
              aria-label="Scroll to About section"
            >
              <FaArrowDown className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home; 