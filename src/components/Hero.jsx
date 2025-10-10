import React from 'react';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown } from 'react-icons/fa';
import { personalInfo, socialLinks } from '../data/portfolioData';

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Greeting */}
          <p className="text-accent font-semibold text-lg md:text-xl mb-4 animate-fade-in">
            👋 السلام علیکم، I'm
          </p>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-slide-up">
            <span className="text-gradient">{personalInfo.name}</span>
          </h1>

          {/* Title */}
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-700 mb-6 animate-slide-up">
            {personalInfo.subtitle}
          </h2>

          {/* Bio */}
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed animate-fade-in">
            {personalInfo.bio}
          </p>

          {/* Location & Experience */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📍</span>
              <span>{personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💼</span>
              <span>{personalInfo.experience} Experience</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link
              to="contact"
              smooth
              duration={500}
              className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-blue-800 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Hire Me
            </Link>
            <Link
              to="projects"
              smooth
              duration={500}
              className="px-8 py-3 bg-white text-primary border-2 border-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View Projects
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-12">
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary transition-colors duration-300 transform hover:scale-110"
              >
                <FaGithub size={30} />
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary transition-colors duration-300 transform hover:scale-110"
              >
                <FaLinkedin size={30} />
              </a>
            )}
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-gray-700 hover:text-primary transition-colors duration-300 transform hover:scale-110"
            >
              <FaEnvelope size={30} />
            </a>
          </div>

          {/* Scroll Down Arrow */}
          <Link
            to="about"
            smooth
            duration={500}
            className="inline-block animate-bounce cursor-pointer"
          >
            <FaArrowDown size={24} className="text-gray-400" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

