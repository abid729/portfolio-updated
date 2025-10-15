import { personalInfo, experiences, education, certifications } from '@/lib/portfolioData'
import { FaBriefcase, FaGraduationCap, FaCertificate } from 'react-icons/fa'

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </div>

        {/* About Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Image/Info */}
          <div className="flex flex-col justify-center">
            <div className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Who I Am</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {personalInfo.bio}
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-gray-600 font-semibold">Name:</p>
                  <p className="text-gray-800">{personalInfo.name}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Location:</p>
                  <p className="text-gray-800">{personalInfo.location}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Experience:</p>
                  <p className="text-gray-800">{personalInfo.experience}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Email:</p>
                  <p className="text-gray-800 text-sm">{personalInfo.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold mb-2">4+</div>
              <div className="text-blue-100">Years Experience</div>
            </div>
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold mb-2">35+</div>
              <div className="text-teal-100">Projects Completed</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="text-purple-100">Happy Clients</div>
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold mb-2">3</div>
              <div className="text-pink-100">Certifications</div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <FaBriefcase className="text-primary text-3xl" />
            <h3 className="text-3xl font-bold text-gray-800">Experience</h3>
          </div>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">{exp.position}</h4>
                    <p className="text-primary font-semibold">{exp.company}</p>
                  </div>
                  <div className="text-gray-600 mt-2 md:mt-0">
                    <p>{exp.period}</p>
                    <p className="text-sm">{exp.location}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">{exp.description}</p>
                <ul className="list-disc list-inside space-y-1">
                  {exp.achievements.map((achievement, index) => (
                    <li key={index} className="text-gray-600 text-sm">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <FaGraduationCap className="text-primary text-3xl" />
              <h3 className="text-2xl font-bold text-gray-800">Education</h3>
            </div>
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6 shadow-md"
              >
                <h4 className="text-lg font-bold text-gray-800 mb-2">{edu.degree}</h4>
                <p className="text-primary font-semibold">{edu.institution}</p>
                <p className="text-gray-600 text-sm mt-1">{edu.location}</p>
                <div className="flex justify-between mt-3">
                  <p className="text-gray-700">{edu.year}</p>
                  <p className="text-gray-700 font-semibold">{edu.grade}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <FaCertificate className="text-primary text-3xl" />
              <h3 className="text-2xl font-bold text-gray-800">Certifications</h3>
            </div>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <h4 className="text-lg font-bold text-gray-800">{cert.name}</h4>
                  <div className="flex justify-between mt-2">
                    <p className="text-primary font-semibold text-sm">{cert.issuer}</p>
                    <p className="text-gray-600 text-sm">{cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

