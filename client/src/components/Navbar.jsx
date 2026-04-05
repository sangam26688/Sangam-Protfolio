import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaBars, FaTimes, FaLightbulb, FaRegLightbulb } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 1. Initial Theme Check (Jab page load ho)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemTheme)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // ✅ FIX: removeExternalListener ko hata kar removeEventListener kar diya
    return () => window.removeEventListener('scroll', handleScroll); 
  }, []);

  // 2. Toggle Function (Extreme Right Bulb ke liye)
  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled 
        ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 py-3 shadow-lg" 
        : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[100%] mx-auto px-4 md:px-10 flex justify-between items-center">
        
        {/* LEFT: LOGO */}
        <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-black cursor-pointer shrink-0">
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
            SANGAM.
          </span>
        </motion.div>

        {/* CENTER: DESKTOP MENU & SOCIALS */}
        <div className="hidden md:flex items-center space-x-10">
          <div className="flex space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="flex items-center space-x-4 border-l border-slate-200 dark:border-slate-700 pl-6">
            <a href="https://github.com" target="_blank" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-transform hover:-translate-y-1">
              <FaGithub size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" className="text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-transform hover:-translate-y-1">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* RIGHT: BULB (Extreme Corner) + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={toggleTheme}
            className={`p-3 rounded-full transition-all duration-300 ${
              isDarkMode 
              ? "bg-yellow-400/20 text-yellow-400 border border-yellow-400/50 shadow-[0_0_20px_rgba(250,204,21,0.4)]" 
              : "bg-slate-100 text-slate-600 border border-slate-200 hover:shadow-md"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isDarkMode ? 'bulb-on' : 'bulb-off'}
                initial={{ opacity: 0, rotate: 45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -45 }}
                transition={{ duration: 0.2 }}
              >
                {isDarkMode ? <FaLightbulb size={22} /> : <FaRegLightbulb size={22} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Mobile Hamburger */}
          <button className="md:hidden p-2 text-slate-800 dark:text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-white dark:bg-slate-950 z-[90] flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)} 
                className="text-4xl font-black text-slate-800 dark:text-white hover:text-blue-600"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;