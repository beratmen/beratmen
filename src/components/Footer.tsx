import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaPaperPlane, FaArrowUp, FaCode, FaServer, FaMobileAlt, FaDatabase, FaTools, FaCloud } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const skills = [
    { icon: <FaCode />, name: 'Frontend Development', color: 'text-blue-500' },
    { icon: <FaServer />, name: 'Backend Development', color: 'text-green-500' },
    { icon: <FaMobileAlt />, name: 'Responsive Design', color: 'text-purple-500' },
    { icon: <FaDatabase />, name: 'Database Management', color: 'text-yellow-500' },
    { icon: <FaTools />, name: 'DevOps', color: 'text-red-500' },
    { icon: <FaCloud />, name: 'Cloud Services', color: 'text-cyan-500' }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the subscription logic
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail('');
    }, 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Skills Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Skills & Expertise
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl 
                         transition-all duration-300 transform hover:-translate-y-1 hover:bg-gray-50 
                         dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700"
              >
                <div className={`text-3xl ${skill.color} mb-4 flex justify-center`}>
                  {skill.icon}
                </div>
                <h4 className="text-base font-semibold text-gray-900 dark:text-white text-center">
                  {skill.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* About Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  About Me
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Software developer passionate about creating modern web applications with cutting-edge technologies.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/beratmen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white 
                             transition-colors duration-300 transform hover:scale-110"
                  >
                    <FaGithub size={24} />
                  </a>
                  <a
                    href="https://linkedin.com/in/beratmen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white 
                             transition-colors duration-300 transform hover:scale-110"
                  >
                    <FaLinkedin size={24} />
                  </a>
                  <a
                    href="mailto:beratmen9@gmail.com"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white 
                             transition-colors duration-300 transform hover:scale-110"
                  >
                    <MdEmail size={24} />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 
                                        dark:hover:text-blue-400 transition-colors duration-300">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/#about" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 
                                              dark:hover:text-blue-400 transition-colors duration-300">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/#projects" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 
                                                dark:hover:text-blue-400 transition-colors duration-300">
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 
                                           dark:hover:text-blue-400 transition-colors duration-300">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Newsletter Subscription */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Subscribe to Blog Updates
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Stay updated with our latest articles and tech insights. No spam, unsubscribe at any time.
                </p>
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 
                               border border-gray-200 dark:border-gray-700
                               focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500
                               text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                               transition-colors duration-200"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 
                             dark:from-blue-500 dark:to-blue-300 text-white rounded-lg 
                             hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5
                             flex items-center justify-center space-x-2"
                  >
                    {isSubscribed ? (
                      <>
                        <span>Subscribed!</span>
                        <FaPaperPlane className="animate-ping" />
                      </>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <FaPaperPlane />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 dark:text-gray-400 text-center md:text-left">
                © {new Date().getFullYear()} Berat MEN. All rights reserved.
              </p>
              <button
                onClick={scrollToTop}
                className="mt-4 md:mt-0 flex items-center space-x-2 text-gray-600 dark:text-gray-400 
                         hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300
                         group"
              >
                <span>Back to Top</span>
                <FaArrowUp className="transform group-hover:-translate-y-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 