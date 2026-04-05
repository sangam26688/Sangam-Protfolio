import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaReact, FaNodeJs, FaPython, FaDatabase, FaJs, FaRobot } from 'react-icons/fa'

const skills = [
  { name: 'React.js', category: 'Frontend', level: 90, icon: FaReact, color: 'text-cyan-400' },
  { name: 'Node.js', category: 'Backend', level: 85, icon: FaNodeJs, color: 'text-green-500' },
  { name: 'Python', category: 'Programming', level: 88, icon: FaPython, color: 'text-blue-500' },
  { name: 'MongoDB', category: 'Database', level: 82, icon: FaDatabase, color: 'text-emerald-500' },
  { name: 'JavaScript', category: 'Core', level: 95, icon: FaJs, color: 'text-yellow-400' },
  { name: 'AI Tools', category: 'Specialized', level: 92, icon: FaRobot, color: 'text-purple-500' }
]

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null)

  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-500">
      
      {/* 🎨 MATCHING HERO BLOBS */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 dark:bg-blue-900/10 rounded-full blur-[120px] opacity-50"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-100 dark:bg-purple-900/10 rounded-full blur-[120px] opacity-50"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* HEADING SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-block px-4 py-1.5 mb-4 border border-blue-100 dark:border-white/10 rounded-full bg-white/40 dark:bg-white/5 backdrop-blur-md">
            <span className="text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Technical Arsenal
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight">
            Expertise & <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">Skills</span>
          </h2>
        </motion.div>

        {/* SKILLS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white/60 dark:bg-white/5 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white dark:border-white/10 shadow-xl shadow-blue-500/5 hover:shadow-blue-500/15 transition-all duration-500 cursor-pointer"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="flex items-center mb-8">
                  <div className={`w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center mr-5 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${skill.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">{skill.name}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest">{skill.category}</p>
                  </div>
                </div>

                {/* PROGRESS BAR */}
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Proficiency</span>
                    <span className="text-xs font-black text-blue-600 dark:text-blue-400">{skill.level}%</span>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded-full bg-slate-100 dark:bg-slate-800">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-600 to-purple-600"
                    />
                  </div>
                </div>
                
                {/* INTERACTIVE TOOLTIP */}
                <div className="h-0 group-hover:h-12 transition-all duration-300 overflow-hidden">
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredSkill === skill.name ? 1 : 0 }}
                    className="mt-4 text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-tight italic"
                  >
                    "Advanced proficiency with real-world MERN & AI project experience."
                  </motion.p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { Skills }