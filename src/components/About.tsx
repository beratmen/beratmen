import React from 'react';
import { FaCode, FaDatabase, FaCloud, FaTools } from 'react-icons/fa';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          About Me
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              I am a dedicated Software Developer with a strong foundation in both front-end and back-end development.
              My expertise lies in creating efficient, scalable web applications and implementing robust software solutions.
              I am passionate about clean code, performance optimization, and staying current with emerging technologies.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-gray-200">
                  <FaCode className="mr-2" /> Frontend Development
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• React.js & Next.js</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• Redux & Context API</li>
                  <li>• Responsive Design</li>
                  <li>• Web Accessibility</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-gray-200">
                  <FaDatabase className="mr-2" /> Backend Development
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Node.js & Express</li>
                  <li>• RESTful APIs</li>
                  <li>• MongoDB & PostgreSQL</li>
                  <li>• Authentication & Security</li>
                  <li>• Performance Optimization</li>
                  <li>• Microservices Architecture</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-gray-200">
                  <FaCloud className="mr-2" /> Cloud & DevOps
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• AWS Services</li>
                  <li>• Docker & Containerization</li>
                  <li>• CI/CD Pipelines</li>
                  <li>• Version Control (Git)</li>
                  <li>• Cloud Infrastructure</li>
                  <li>• Monitoring & Logging</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-gray-200">
                  <FaTools className="mr-2" /> Additional Skills
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Agile Methodologies</li>
                  <li>• Test-Driven Development</li>
                  <li>• UI/UX Design Principles</li>
                  <li>• Technical Documentation</li>
                  <li>• Problem Solving</li>
                  <li>• Team Collaboration</li>
                </ul>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              I am constantly expanding my knowledge and skills in software development, with a particular
              interest in cloud technologies and modern web frameworks. I enjoy tackling complex problems
              and creating solutions that deliver real value to users.
            </p>

            <p className="text-lg text-gray-700 dark:text-gray-300">
              I am open to collaboration on innovative projects and always excited to learn from and
              contribute to the developer community. Let's connect and create something amazing together!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 