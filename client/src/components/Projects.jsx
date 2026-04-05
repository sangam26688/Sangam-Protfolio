import { motion } from 'framer-motion'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'

const projects = [
  {
    title: 'Event Photography Portfolio',
    tech: ['React.js', 'Framer Motion', 'Tailwind'],
    description: 'Dynamic photography portfolio with 3D hover effects and AI-optimized image loading.',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000', 
    live: 'https://event-portfolio.sangam.dev',
    github: 'https://github.com/yourusername/event-photography'
  },
  {
    title: 'AI Chat Assistant',
    tech: ['Node.js', 'OpenAI API', 'MongoDB'],
    description: 'Real-time AI conversation platform with memory context and multi-language support.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000',
    live: 'https://ai-chat.sangam.dev',
    github: 'https://github.com/yourusername/ai-chat'
  },
  {
    title: 'E-Commerce Dashboard',
    tech: ['React', 'Chart.js', 'Express'],
    description: 'Admin dashboard with real-time analytics, inventory management and sales forecasting.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000',
    live: 'https://ecommerce.sangam.dev',
    github: 'https://github.com/yourusername/ecommerce-dashboard'
  }
]

const Projects = () => {
  return (
    <section id="projects" className="relative py-32 px-6 bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      
      {/* 🎨 MATCHING HERO BLOBS */}
      <div className="absolute top-[20%] left-[-5%] w-[35%] h-[35%] bg-blue-100 dark:bg-blue-900/10 rounded-full blur-[120px] opacity-50"></div>
      <div className="absolute bottom-[20%] right-[-5%] w-[35%] h-[35%] bg-purple-100 dark:bg-purple-900/10 rounded-full blur-[120px] opacity-50"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* HEADING SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-1.5 mb-4 border border-blue-100 dark:border-white/10 rounded-full bg-white/40 dark:bg-white/5 backdrop-blur-md shadow-sm">
            <span className="text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Creative Works
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight">
            Featured <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h2>
        </motion.div>

        {/* PROJECTS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative flex flex-col rounded-[2.5rem] bg-white/60 dark:bg-white/5 backdrop-blur-2xl border border-white dark:border-white/10 shadow-xl shadow-blue-500/5 hover:shadow-blue-500/15 transition-all duration-500 overflow-hidden"
            >
              {/* IMAGE AREA */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                   <p className="text-white text-xs font-medium italic">Click source to view code</p>
                </div>
              </div>

              {/* CONTENT AREA */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                {/* TECH TAGS */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-800/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* LINKS */}
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100 dark:border-white/5">
                  <a 
                    href={project.live} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors"
                  >
                    Live Preview <FaExternalLinkAlt size={12} />
                  </a>
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 bg-slate-100 dark:bg-white/10 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
                  >
                    <FaGithub size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Projects }