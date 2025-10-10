import React from 'react';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaArrowUp } from 'react-icons/fa';
import { personalInfo, socialLinks } from '../data/portfolioData';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gradient bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              {personalInfo.name}
            </h3>
            <p className="text-gray-400 mb-4">
              Full-Stack Developer passionate about creating innovative web solutions.
            </p>
            <div className="flex gap-4">
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
                >
                  <FaGithub size={24} />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
                >
                  <FaLinkedin size={24} />
                </a>
              )}
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
              >
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['home', 'about', 'skills', 'projects', 'resume', 'contact'].map((link) => (
                <li key={link}>
                  <Link
                    to={link}
                    smooth
                    duration={500}
                    className="text-gray-400 hover:text-white cursor-pointer transition-colors capitalize"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href={`mailto:${personalInfo.email}`} className="hover:text-white transition-colors">
                  {personalInfo.email}
                </a>
              </li>
              <li>{personalInfo.phone}</li>
              <li>{personalInfo.location}</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              Made with <FaHeart className="text-red-500" /> by {personalInfo.name}
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition-all duration-300 transform hover:scale-110"
        aria-label="Scroll to top"
      >
        <FaArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;

