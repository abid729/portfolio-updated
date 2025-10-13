import { skills } from '@/lib/portfolioData'

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Technologies and tools I work with to bring your ideas to life
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <span className="w-2 h-8 bg-gradient-to-b from-primary to-accent rounded mr-3"></span>
                {category.category}
              </h3>
              <div className="space-y-5">
                {category.items.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 font-medium">{skill.name}</span>
                      <span className="text-primary font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-2.5 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills or Technologies */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
            Technologies & Tools
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Laravel', 'PHP', 'React', 'Next.js', 'JavaScript', 'TypeScript',
              'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Docker',
              'Git', 'REST API', 'GraphQL', 'Tailwind CSS', 'Bootstrap', 'Vue.js',
              'Node.js', 'Express', 'Socket.io', 'Webpack', 'Vite', 'Linux'
            ].map((tech, index) => (
              <span
                key={index}
                className="px-6 py-3 bg-white text-gray-700 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

