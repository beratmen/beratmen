import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          About Me
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            I am a passionate Software Developer with expertise in building modern web applications.
            My journey in software development has equipped me with strong problem-solving skills
            and a deep understanding of software architecture.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            I specialize in full-stack development, with particular focus on:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-300 mb-6 space-y-2">
            <li>Frontend Development (React, TypeScript, Tailwind CSS)</li>
            <li>Backend Development</li>
            <li>Database Design and Management</li>
            <li>API Development and Integration</li>
          </ul>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            I am always eager to learn new technologies and contribute to innovative projects
            that make a positive impact.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About; 