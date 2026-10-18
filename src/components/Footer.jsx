import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-3 sm:py-4 px-4 sm:px-8 overflow-hidden bg-[#f8fafc] dark:bg-slate-950  transition-colors duration-500 font-sans select-none">
      
     

      <div className="max-w-7xl mx-auto flex flex-wrap md:flex-row justify-between items-center gap-4">
        
        {/* LEFT: Logo + Open to Roles Badge */}
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-black tracking-tighter text-slate-900 dark:text-white leading-none">
            SANGAM<span className="text-blue-600">.</span>
          </h3>

          <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full shadow-sm backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Open to new roles
            </span>
          </div>
        </div>

        {/* CENTER: Copyright Text */}
        <div className="text-center md:text-left">
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-tight">
            © 2026. Designed & Developed by Sangam.{" "}
            <span className="hidden sm:inline text-[10px] opacity-60 italic ml-1">
              • Built with MERN, Framer Motion & ❤️
            </span>
          </p>
        </div>

        {/* RIGHT: Social Icons & Scroll Button */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 border-r border-slate-200 dark:border-white/10 pr-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={15} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-blue-500 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={15} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-sky-400 transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter size={15} />
            </a>
          </div>
          
          <motion.button 
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="p-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg shadow-sm text-slate-600 dark:text-white hover:border-blue-500/40 transition-colors"
            aria-label="Scroll to top"
          >
            <FaArrowUp size={12} />
          </motion.button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;