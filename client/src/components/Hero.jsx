import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaDownload, FaArrowRight } from 'react-icons/fa';

const Hero = () => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    'Building Future with MERN & AI 🚀',
    'Full Stack Developer | AI Specialist',
    'VP @ Tech Express Club | B.Sc. IT'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f8fafc] pt-20 px-6">
      
      {/* 🎨 UNIQUE MESH BACKGROUND: Dark ki jagah soft colors */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-100 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-cyan-50 rounded-full blur-[100px] opacity-80"></div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        
        {/* MODERN BADGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1.5 mb-8 border border-blue-100 rounded-full bg-white/40 backdrop-blur-md shadow-sm"
        >
          <span className="text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Available for Projects
          </span>
        </motion.div>

        {/* MAIN HEADING: Deep Navy/Black for Premium Look */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight text-slate-900"
        >
          Hi, I'm <br className="md:hidden" /> 
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Sangam
          </span>
        </motion.h1>

        {/* ANIMATED TEXT: Dark Gray for readability */}
        <div className="h-12 md:h-16 mb-10">
          <AnimatePresence mode="wait">
            <motion.p 
              key={textIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-3xl font-medium text-slate-600"
            >
              {texts[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* BUTTONS: Shadow & Border Style */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          <a 
            href="/resume.pdf" 
            className="group relative px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-2 overflow-hidden transition-all shadow-xl hover:shadow-blue-200"
          >
            <span className="relative z-10">Download CV</span>
            <FaDownload className="relative z-10 transition-all group-hover:bounce" />
          </a>

          <a 
            href="#projects"
            className="group px-8 py-4 border-2 border-slate-200 bg-white/50 hover:bg-white text-slate-900 rounded-2xl font-bold transition-all backdrop-blur-sm flex items-center gap-2 shadow-sm hover:border-blue-400"
          >
            Explore Work
            <FaArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-1 h-12 rounded-full bg-slate-200 overflow-hidden">
           <motion.div 
             animate={{ y: [0, 48, 0] }} 
             transition={{ repeat: Infinity, duration: 2 }}
             className="w-full h-1/3 bg-blue-500"
           />
        </div>
      </motion.div>
    </section>
  )
}

export { Hero };