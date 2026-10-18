import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaBars, FaTimes, FaLightbulb, FaRegLightbulb } from 'react-icons/fa';

/* Glass styles live here so no Tailwind config is needed */
const glassCSS = `
.glass-bar {
  background: linear-gradient(180deg, rgba(255,255,255,.62), rgba(255,255,255,.38));
  -webkit-backdrop-filter: blur(16px) saturate(170%);
  backdrop-filter: blur(16px) saturate(170%);
  border-bottom: 1px solid rgba(255,255,255,.6);
  box-shadow: 0 8px 30px rgba(15,23,42,.08), inset 0 1px 0 rgba(255,255,255,.8);
}
.dark .glass-bar {
  background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.03));
  border-bottom-color: rgba(255,255,255,.10);
  box-shadow: 0 8px 30px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.12);
}
.glass-bar::before {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(320px circle at var(--mx, 50%) 0%, rgba(99,102,241,.16), transparent 70%);
  opacity: 0; transition: opacity .4s;
}
.glass-bar:hover::before { opacity: 1; }
.glass-panel {
  background: linear-gradient(135deg, rgba(255,255,255,.72), rgba(255,255,255,.45));
  -webkit-backdrop-filter: blur(20px) saturate(170%);
  backdrop-filter: blur(20px) saturate(170%);
  border: 1px solid rgba(255,255,255,.65);
  box-shadow: 0 20px 50px rgba(15,23,42,.18), inset 0 1px 0 rgba(255,255,255,.8);
}
.dark .glass-panel {
  background: linear-gradient(135deg, rgba(255,255,255,.10), rgba(255,255,255,.04));
  border-color: rgba(255,255,255,.12);
  box-shadow: 0 20px 50px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.14);
}
@media (max-width: 767px) {
  .glass-bar { -webkit-backdrop-filter: blur(12px) saturate(150%); backdrop-filter: blur(12px) saturate(150%); }
}
@media (prefers-reduced-motion: reduce) { .glass-bar::before { display: none; } }
`;

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Education', href: '#education' }, // <-- Education Tab Added Here
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Leadership', href: '#leadership' }, // <-- Leadership Tab Added Here
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [active, setActive] = useState('#hero');
  const [hovered, setHovered] = useState(null);
  const barRef = useRef(null);
  const reduce = useReducedMotion();

  // scroll progress line under the bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = savedTheme === 'dark' || (!savedTheme && systemTheme);
    setIsDarkMode(dark);
    document.documentElement.classList.toggle('dark', dark);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // highlight the link of the section currently on screen
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    navLinks.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // mobile menu: Esc closes, page scroll locked while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleTheme = () => {
    const next = !isDarkMode;
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    setIsDarkMode(next);
  };

  const onMove = (e) => barRef.current?.style.setProperty('--mx', `${e.clientX}px`);

  return (
    <>
      <style>{glassCSS}</style>

      <motion.nav
        ref={barRef}
        onMouseMove={onMove}
        initial={reduce ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 130, damping: 20 }}
        aria-label="Main"
        className={`fixed top-0 left-0 w-full z-[100] font-sans select-none border-b transition-[padding,background-color,border-color,box-shadow] duration-300 ${
          scrolled ? 'glass-bar border-transparent py-2.5' : 'bg-transparent border-transparent py-4'
        }`}
      >
        <div className="relative max-w-7xl mx-auto px-4 flex items-center justify-between sm:px-6">
          {/* 1. LEFT LOGO */}
          <motion.a
            href="#hero"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="text-2xl font-black tracking-tighter shrink-0 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent"
          >
            SANGAM<span className="text-purple-600">.</span>
          </motion.a>

          {/* 2. CENTER & RIGHT (DESKTOP MENU) */}
          <div className="hidden md:flex items-center gap-6">
            {/* Yahan gap-1 se gap barha ya ghata sakte hain (e.g. gap-1, gap-2, gap-3) */}
            <ul className="flex items-center gap-6" onMouseLeave={() => setHovered(null)}>
              {navLinks.map((link) => {
                const isActive = active === link.href;
                return (
                  <li key={link.name} className="relative">
                    <a
                      href={link.href}
                      onMouseEnter={() => setHovered(link.href)}
                      onFocus={() => setHovered(link.href)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`relative z-10 block px-3 py-1.5 text-sm font-bold transition-colors duration-200 ${
                        isActive
                          ? 'text-blue-600 dark:text-cyan-400'
                          : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400'
                      }`}
                    >
                      {link.name}
                    </a>
                    {hovered === link.href && (
                      <motion.span
                        layoutId="hover-pill"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-indigo-500/10 dark:bg-white/10"
                      />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="active-line"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                      />
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Divider & Social Icons */}
            <div className="flex items-center space-x-4 border-l border-slate-200 dark:border-slate-700 pl-6 text-slate-500 dark:text-slate-400">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                 className="hover:text-blue-600 dark:hover:text-white transition-transform hover:-translate-y-0.5">
                <FaGithub size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                 className="hover:text-blue-600 transition-transform hover:-translate-y-0.5">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* 3. FAR RIGHT: BULB BUTTON & MOBILE HAMBURGER */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-full bg-slate-100/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-200 backdrop-blur-md hover:shadow-md transition-shadow"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDarkMode ? 'bulb-on' : 'bulb-off'}
                  initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.6, rotate: 90 }}
                  transition={{ duration: 0.18 }}
                >
                  {isDarkMode ? <FaLightbulb size={16} className="text-amber-400" /> : <FaRegLightbulb size={16} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            <button
              className="md:hidden p-2 text-slate-800 dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
              onClick={() => setIsOpen((v) => !v)}
              aria-label="Toggle Navigation"
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? 'x' : 'bars'}
                  className="block"
                  initial={{ opacity: 0, rotate: -80 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 80 }}
                  transition={{ duration: 0.15 }}
                >
                  {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* scroll progress */}
        <motion.div
          style={{ scaleX: progress }}
          className={`absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 transition-opacity duration-300 ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </motion.nav>

      {/* 4. RESPONSIVE MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[98] bg-slate-950/30 backdrop-blur-[2px] md:hidden"
            />
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              className="glass-panel fixed inset-x-3 top-[4.25rem] z-[99] max-h-[calc(100dvh-5.5rem)] overflow-y-auto rounded-3xl px-5 py-5 md:hidden"
            >
              <motion.ul
                initial="hide"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } }}
                className="flex flex-col gap-1"
              >
                {navLinks.map((link) => (
                  <motion.li key={link.name} variants={{ hide: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }}>
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block rounded-xl px-3 py-2.5 text-base font-bold transition active:scale-[0.98] ${
                        active === link.href
                          ? 'bg-indigo-500/10 text-blue-600 dark:text-cyan-400'
                          : 'text-slate-700 dark:text-slate-200 hover:text-blue-600'
                      }`}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="mt-3 pt-3 border-t border-slate-300/50 dark:border-white/10 flex items-center gap-5 px-3 text-slate-600 dark:text-slate-300">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub size={20} /></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin size={20} /></a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;