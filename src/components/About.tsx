import React from 'react';
import { FaCode, FaDatabase, FaCloud, FaTools, FaGraduationCap, FaCertificate, FaLaptopCode, FaUserTie } from 'react-icons/fa';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white">
          About Me
        </h2>

        {/* Professional Summary */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transform hover:scale-[1.01] transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400 flex items-center">
              <FaUserTie className="mr-3" /> Professional Summary
            </h3>
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  I am a dedicated Software Developer with a strong foundation in both front-end and back-end development.
                  My expertise lies in creating efficient, scalable web applications and implementing robust software solutions.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Currently pursuing Computer Programming at Gaziantep University, I am passionate about learning and implementing
                  new technologies. My focus is on modern web development, particularly with React.js and its ecosystem.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800/50">
                  <h4 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-4">Key Strengths</h4>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Full-stack Development</li>
                    <li>Problem Solving</li>
                    <li>Technical Leadership</li>
                    <li>Code Optimization</li>
                    <li>Fast Learning</li>
                    <li>Team Collaboration</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800/50">
                  <h4 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-4">Focus Areas</h4>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Web Applications</li>
                    <li>API Development</li>
                    <li>Cloud Solutions</li>
                    <li>Performance Optimization</li>
                    <li>Responsive Design</li>
                    <li>Modern JavaScript</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50/50 to-blue-100/50 dark:from-blue-900/10 dark:to-blue-800/10 p-6 rounded-lg border border-blue-100/50 dark:border-blue-800/30">
                  <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-3">Development Approach</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    Focus on writing clean, maintainable code with emphasis on best practices and modern development patterns.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-50/50 to-blue-100/50 dark:from-blue-900/10 dark:to-blue-800/10 p-6 rounded-lg border border-blue-100/50 dark:border-blue-800/30">
                  <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-3">Learning Philosophy</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    Continuous learning and staying updated with the latest technologies and industry trends.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-50/50 to-blue-100/50 dark:from-blue-900/10 dark:to-blue-800/10 p-6 rounded-lg border border-blue-100/50 dark:border-blue-800/30">
                  <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-3">Project Goals</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    Building user-centric applications that combine functionality with excellent user experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transform hover:scale-[1.01] transition-all duration-300">
            <h3 className="text-2xl font-bold mb-8 text-green-600 dark:text-green-400 flex items-center">
              <FaGraduationCap className="mr-3" /> Education
            </h3>
            <div className="relative border-l-4 border-green-500 pl-8 ml-4">
              <div className="absolute w-4 h-4 bg-green-500 rounded-full -left-[10px] top-0"></div>
              <div className="mb-8">
                <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Computer Programming</h4>
                <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">Gaziantep University</p>
                <p className="text-lg text-gray-500 dark:text-gray-500 mt-1">2023 - 2025</p>
                <div className="mt-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-lg border border-green-100 dark:border-green-800/50">
                  <h5 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-4">Current Focus</h5>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Software Development Fundamentals</li>
                    <li>Web Development Technologies</li>
                    <li>Database Management Systems</li>
                    <li>Programming Languages & Frameworks</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transform hover:scale-[1.01] transition-all duration-300">
            <h3 className="text-2xl font-bold mb-8 text-purple-600 dark:text-purple-400 flex items-center">
              <FaCertificate className="mr-3" /> Certifications
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <a 
                href="https://www.credly.com/org/amazon-web-services/badge/aws-certified-cloud-practitioner"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-5 rounded-lg border border-purple-100 dark:border-purple-800/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
              >
                <h4 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-2 group-hover:text-purple-600">AWS Cloud Practitioner</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Amazon Web Services</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">2023</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                  Comprehensive understanding of AWS Cloud services, security, architecture, pricing, and support.
                </p>
              </a>

              <a 
                href="https://www.freecodecamp.org/certification/fcc-random/responsive-web-design"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-5 rounded-lg border border-purple-100 dark:border-purple-800/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
              >
                <h4 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-2 group-hover:text-purple-600">Responsive Web Design</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">freeCodeCamp</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">2023</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                  Mastery in HTML5, CSS3, responsive design principles, and web accessibility standards.
                </p>
              </a>

              <a 
                href="https://www.hackerrank.com/certificates/typescript"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-5 rounded-lg border border-purple-100 dark:border-purple-800/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
              >
                <h4 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-2 group-hover:text-purple-600">TypeScript (Basic)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">HackerRank</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">2023</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                  Proficiency in TypeScript fundamentals, types, interfaces, and modern ES6+ features.
                </p>
              </a>

              <a 
                href="https://www.coursera.org/account/accomplishments/verify/react-development"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-5 rounded-lg border border-purple-100 dark:border-purple-800/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
              >
                <h4 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-2 group-hover:text-purple-600">React Development</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Coursera</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">2023</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                  Advanced concepts in React, including hooks, context, and state management.
                </p>
              </a>

              <a 
                href="https://www.udemy.com/certificate/UC-tailwind-css"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-5 rounded-lg border border-purple-100 dark:border-purple-800/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
              >
                <h4 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-2 group-hover:text-purple-600">Tailwind CSS Mastery</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Udemy</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">2023</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                  Comprehensive understanding of Tailwind CSS framework and modern UI development.
                </p>
              </a>

              <a 
                href="https://www.sololearn.com/certificates/javascript"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-5 rounded-lg border border-purple-100 dark:border-purple-800/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
              >
                <h4 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-2 group-hover:text-purple-600">JavaScript Fundamentals</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">SoloLearn</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">2023</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                  Core JavaScript concepts, ES6+ features, and modern development practices.
                </p>
              </a>
            </div>
          </div>
        </div>

        {/* Technical Skills */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transform hover:scale-[1.01] transition-all duration-300">
            <h3 className="text-2xl font-bold mb-8 text-indigo-600 dark:text-indigo-400 flex items-center">
              <FaLaptopCode className="mr-3" /> Technical Skills
            </h3>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
                  <FaCode className="mr-2" /> Frontend Development
                </h4>
                <div className="space-y-5">
                  {[
                    { name: 'React.js', level: 'Intermediate', progress: '75%' },
                    { name: 'TypeScript', level: 'Intermediate', progress: '70%' },
                    { name: 'Next.js', level: 'Basic', progress: '50%' },
                    { name: 'Tailwind CSS', level: 'Intermediate', progress: '75%' }
                  ].map((skill, index) => (
                    <div key={index} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-sm text-blue-600 dark:text-blue-400">{skill.level}</span>
                      </div>
                      <div className="relative h-2 bg-blue-100 dark:bg-blue-900/40 rounded-full overflow-hidden">
                        <div 
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-full group-hover:animate-pulse"
                          style={{ width: skill.progress }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
                  <FaDatabase className="mr-2" /> Backend Development
                </h4>
                <div className="space-y-5">
                  {[
                    { name: 'Node.js', level: 'Basic', progress: '60%' },
                    { name: 'Express', level: 'Basic', progress: '55%' },
                    { name: 'MongoDB', level: 'Basic', progress: '50%' },
                    { name: 'PostgreSQL', level: 'Learning', progress: '40%' }
                  ].map((skill, index) => (
                    <div key={index} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-sm text-green-600 dark:text-green-400">{skill.level}</span>
                      </div>
                      <div className="relative h-2 bg-green-100 dark:bg-green-900/40 rounded-full overflow-hidden">
                        <div 
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-green-600 dark:from-green-400 dark:to-green-500 rounded-full group-hover:animate-pulse"
                          style={{ width: skill.progress }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
                  <FaCloud className="mr-2" /> Cloud & DevOps
                </h4>
                <div className="space-y-5">
                  {[
                    { name: 'AWS', level: 'Basic', progress: '45%' },
                    { name: 'Docker', level: 'Learning', progress: '35%' },
                    { name: 'CI/CD', level: 'Learning', progress: '30%' },
                    { name: 'Git', level: 'Intermediate', progress: '70%' }
                  ].map((skill, index) => (
                    <div key={index} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-sm text-purple-600 dark:text-purple-400">{skill.level}</span>
                      </div>
                      <div className="relative h-2 bg-purple-100 dark:bg-purple-900/40 rounded-full overflow-hidden">
                        <div 
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500 rounded-full group-hover:animate-pulse"
                          style={{ width: skill.progress }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
                  <FaTools className="mr-2" /> Other Skills
                </h4>
                <div className="space-y-5">
                  {[
                    { name: 'Agile', level: 'Basic', progress: '50%' },
                    { name: 'UI/UX Design', level: 'Basic', progress: '55%' },
                    { name: 'Testing', level: 'Learning', progress: '40%' },
                    { name: 'Documentation', level: 'Basic', progress: '60%' }
                  ].map((skill, index) => (
                    <div key={index} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-sm text-indigo-600 dark:text-indigo-400">{skill.level}</span>
                      </div>
                      <div className="relative h-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-full overflow-hidden">
                        <div 
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500 rounded-full group-hover:animate-pulse"
                          style={{ width: skill.progress }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 