import { motion } from 'framer-motion'
import { FaUsers, FaHandsHelping } from 'react-icons/fa'

const leadership = [
  {
    title: 'Vice President - Tech Express Club',
    description: 'Led technical workshops, hackathons, and coding competitions for 50+ members. Organized AI/ML sessions and mentored juniors in competitive programming.',
    icon: FaUsers,
    gradient: 'from-blue-600 to-indigo-600'
  },
  {
    title: 'NGO Volunteer Developer',
    description: 'Developed full-stack applications for non-profits including donation management systems, volunteer portals, and community tools using MERN stack.',
    icon: FaHandsHelping,
    gradient: 'from-purple-600 to-pink-600'
  }
]

const Leadership = () => {
  return (
    <section id="leadership" className="relative py-32 px-6 overflow-hidden bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-500">
      
      {/* 🎨 MATCHING HERO BLOBS */}
      <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] bg-blue-100 dark:bg-blue-900/10 rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute bottom-[20%] left-[-10%] w-[35%] h-[35%] bg-purple-100 dark:bg-purple-900/10 rounded-full blur-[120px] opacity-40"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* HEADING SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-block px-4 py-1.5 mb-4 border border-blue-100 dark:border-white/10 rounded-full bg-white/40 dark:bg-white/5 backdrop-blur-md">
            <span className="text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Beyond Coding
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Leadership & <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">Community</span>
          </h2>
        </motion.div>

        {/* LEADERSHIP CARDS */}
        <div className="grid md:grid-cols-2 gap-10">
          {leadership.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* GLOW EFFECT ON HOVER */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-[2.6rem] blur opacity-0 group-hover:opacity-20 transition duration-500`}></div>

                <div className="relative h-full bg-white/60 dark:bg-white/5 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white dark:border-white/10 shadow-xl shadow-blue-500/5 hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden">
                  
                  {/* ICON BLOCK */}
                  <div className="flex items-center mb-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mr-6 shadow-lg group-hover:rotate-6 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed font-medium">
                    {item.description}
                  </p>

                  {/* DECORATIVE ELEMENT */}
                  <div className={`absolute bottom-[-20px] right-[-20px] w-24 h-24 bg-gradient-to-br ${item.gradient} opacity-[0.03] dark:opacity-[0.05] rounded-full blur-2xl`}></div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { Leadership }