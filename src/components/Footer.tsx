import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="flex space-x-6 mb-4">
            <a
              href="https://github.com/beratmen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://linkedin.com/in/beratmen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="mailto:beratmen9@gmail.com"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <MdEmail size={24} />
            </a>
          </div>
          <div className="text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Berat MEN. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 