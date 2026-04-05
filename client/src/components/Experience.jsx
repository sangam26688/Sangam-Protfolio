import { motion } from 'framer-motion';
import { FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

const experiences = [
  {
    role: 'Web Development Intern',
    company: 'SM Digital',
    duration: 'July 2025 - Aug 2025',
    achievements: [
      'Mastered 10+ AI tools for development workflow',
      'Built 5+ responsive websites with modern stacks',
      'Optimized site performance by 40% using AI techniques'
    ]
  },
  {
    role: 'Vice President',
    company: 'Tech Express Club',
    duration: '2024 - Present',
    achievements: [
      'Led 50+ members in hackathons and tech events',
      'Organized workshops on AI/ML and web development',
      'Mentored juniors in competitive programming'
    ]
  },
  {
    role: 'Volunteer Developer',
    company: 'Local NGO',
    duration: '2023 - Present',
    achievements: [
      'Developed donation management system',
      'Created mobile-responsive volunteer portal',
      'Integrated payment gateways for fundraising'
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="relative py-32 px-6 overflow-hidden bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-500">
      
      {/* 🎨 MATCHING HERO BACKGROUND: Wahi blobs jo Hero mein the */}
      <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 dark:bg-blue-900/10 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] bg-purple-100 dark:bg-purple-900/10 rounded-full blur-[120px] opacity-60"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* HEADING: Same as Hero Style */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <motion.div
            className="inline-block px-4 py-1.5 mb-4 border border-blue-100 dark:border-white/10 rounded-full bg-white/40 dark:bg-white/5 backdrop-blur-md shadow-sm"
          >
            <span className="text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Career Path
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight">
            Work <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">Experience</span>
          </h2>
        </motion.div>

        {/* TIMELINE */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent"></div>

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`relative flex items-center justify-between w-full ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-4 border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)] z-20"></div>

                {/* Card */}
                <div className="w-full ml-12 md:ml-0 md:w-[45%]">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="p-8 rounded-[2rem] bg-white/60 dark:bg-white/5 backdrop-blur-2xl border border-white dark:border-white/10 shadow-xl shadow-blue-500/5 hover:shadow-blue-500/10 transition-all duration-500"
                  >
                    <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
                      <span className="flex items-center gap-2 text-xs font-bold px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full uppercase tracking-wider">
                        <FaCalendarAlt size={10} /> {exp.duration}
                      </span>
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{exp.company}</h4>
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                      {exp.role}
                    </h3>

                    <ul className="space-y-4">
                      {exp.achievements.map((ach, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                          <FaCheckCircle className="mt-1 text-purple-500 shrink-0" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                <div className="hidden md:block w-[45%]"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Experience };