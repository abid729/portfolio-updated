import React from 'react';
import { 
  FaDownload, 
  FaUser, 
  FaBriefcase, 
  FaGraduationCap, 
  FaCertificate,
  FaCode,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin
} from 'react-icons/fa';
import { personalInfo, experiences, education, certifications, skills, socialLinks } from '../data/portfolioData';

const Resume = () => {
  const handleDownload = () => {
    // Create a printable version
    window.print();
  };

  return (
    <section id="resume" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient">Resume</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg mb-6">
            Download or view my professional resume
          </p>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <FaDownload />
            Download Resume
          </button>
        </div>

        {/* Resume Preview - Google Dev Style */}
        <div id="resume-content" className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden print:shadow-none">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-8">
            <h1 className="text-4xl font-bold mb-2">{personalInfo.name}</h1>
            <h2 className="text-xl font-medium mb-4 opacity-90">{personalInfo.subtitle}</h2>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <FaEnvelope />
                <span>{personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhone />
                <span>{personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt />
                <span>{personalInfo.location}</span>
              </div>
            </div>
            
            <div className="flex gap-4 mt-3 text-sm">
              {socialLinks.github && (
                <a href={socialLinks.github} className="flex items-center gap-1 hover:underline">
                  <FaGithub /> GitHub
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} className="flex items-center gap-1 hover:underline">
                  <FaLinkedin /> LinkedIn
                </a>
              )}
            </div>
          </div>

          <div className="p-8">
            {/* Summary */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <FaUser className="text-primary text-xl" />
                <h3 className="text-2xl font-bold text-gray-800">Professional Summary</h3>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="text-gray-700 leading-relaxed">{personalInfo.bio}</p>
              </div>
            </div>

            {/* Experience */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <FaBriefcase className="text-primary text-xl" />
                <h3 className="text-2xl font-bold text-gray-800">Work Experience</h3>
              </div>
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id} className="border-l-4 border-gray-300 pl-4 hover:border-primary transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-gray-800">{exp.position}</h4>
                        <p className="text-primary font-semibold">{exp.company} • {exp.location}</p>
                      </div>
                      <span className="text-gray-600 text-sm whitespace-nowrap">{exp.period}</span>
                    </div>
                    <p className="text-gray-700 mb-2 text-sm">{exp.description}</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <FaCode className="text-primary text-xl" />
                <h3 className="text-2xl font-bold text-gray-800">Technical Skills</h3>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {skills.map((category, index) => (
                    <div key={index}>
                      <h4 className="font-bold text-gray-800 mb-2">{category.category}</h4>
                      <p className="text-gray-700 text-sm">
                        {category.items.map(skill => skill.name).join(' • ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <FaGraduationCap className="text-primary text-xl" />
                <h3 className="text-2xl font-bold text-gray-800">Education</h3>
              </div>
              {education.map((edu, index) => (
                <div key={index} className="border-l-4 border-gray-300 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">{edu.degree}</h4>
                      <p className="text-primary font-semibold">{edu.institution} • {edu.location}</p>
                      <p className="text-gray-600 text-sm mt-1">{edu.grade}</p>
                    </div>
                    <span className="text-gray-600 text-sm">{edu.year}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaCertificate className="text-primary text-xl" />
                <h3 className="text-2xl font-bold text-gray-800">Certifications</h3>
              </div>
              <div className="border-l-4 border-primary pl-4 space-y-2">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-gray-800">{cert.name}</h4>
                      <p className="text-primary text-sm">{cert.issuer}</p>
                    </div>
                    <span className="text-gray-600 text-sm">{cert.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #resume-content,
          #resume-content * {
            visibility: visible;
          }
          #resume-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Resume;

