import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaArrowDown } from 'react-icons/fa';
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

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(99,102,241,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.05),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(99,102,241,0.05),transparent_50%)]"></div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Text Content */}
            <div className={`space-y-8 text-center md:text-left transform transition-all duration-1000 ease-out ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
              <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold tracking-tighter">
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                  Berat
                </span>
                <span className="text-gray-900 dark:text-white">
                  {' MEN'}
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl xl:text-4xl text-gray-600 dark:text-gray-400">
                Software Developer
              </h2>
              <p className="text-lg xl:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                Passionate about creating modern web applications with cutting-edge technologies.
                Focused on delivering high-quality, user-centric solutions.
              </p>

              {/* Social Links */}
              <div className="flex justify-center md:justify-start space-x-8">
                <a
                  href="https://github.com/beratmen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white 
                           transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://linkedin.com/in/beratmen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white 
                           transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="mailto:beratmen9@gmail.com"
                  className="text-3xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white 
                           transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                >
                  <MdEmail />
                </a>
              </div>
            </div>

            {/* Right Column - Profile Picture */}
            <div className={`flex justify-center transform transition-all duration-1000 ease-out ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
              <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 
                             rounded-full opacity-75 group-hover:opacity-100 blur-lg transition-all duration-500 
                             group-hover:blur-xl animate-pulse"></div>
                
                {/* Image Container */}
                <div className="relative rounded-full p-1 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 
                             dark:to-blue-300 transform transition-transform duration-500 group-hover:scale-105">
                  <div className="rounded-full overflow-hidden bg-white dark:bg-gray-900">
                    <img
                      src={avatarUrl || '/profile-picture.jpg'}
                      alt="Berat MEN"
                      className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover transform transition-all duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white 
                     transition-colors duration-300 animate-bounce p-4 bg-white/80 dark:bg-gray-800/80 
                     rounded-full shadow-lg backdrop-blur-sm border border-gray-200 dark:border-gray-700
                     hover:shadow-xl hover:bg-white dark:hover:bg-gray-800"
            aria-label="Scroll to About section"
          >
            <FaArrowDown className="text-2xl" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home; 