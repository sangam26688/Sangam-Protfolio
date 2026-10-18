import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const css = `
.loader-glass {
  background: rgba(255,255,255,.55);
  -webkit-backdrop-filter: blur(14px) saturate(170%);
  backdrop-filter: blur(14px) saturate(170%);
  border: 1px solid rgba(255,255,255,.8);
  box-shadow: 0 8px 30px rgba(59,76,180,.12), inset 0 1px 0 rgba(255,255,255,.9);
}
.dark .loader-glass {
  background: rgba(255,255,255,.06);
  border-color: rgba(255,255,255,.12);
  box-shadow: 0 8px 30px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.12);
}
@keyframes loader-shimmer { to { background-position: 200% center; } }
.loader-shimmer { background-size: 200% auto; animation: loader-shimmer 3s linear infinite; }
@media (prefers-reduced-motion: reduce) { .loader-shimmer { animation: none; } }
`;

const DURATION = 2200; // Total loading animation duration in ms
const ease = [0.22, 1, 0.36, 1];

const Loader = ({ onDone }) => {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    // Lock scroll during loader
    document.body.style.overflow = 'hidden';

    const totalDuration = reduce ? 800 : DURATION;
    const startTime = performance.now();
    let animationFrame;

    const tick = (now) => {
      const elapsed = now - startTime;
      const progressRatio = Math.min(elapsed / totalDuration, 1);
      
      // Smooth cubic acceleration
      const easedProgress = 1 - Math.pow(1 - progressRatio, 3);
      const currentPercent = Math.floor(easedProgress * 100);

      setProgress(currentPercent);

      if (progressRatio < 1) {
        animationFrame = requestAnimationFrame(tick);
      } else {
        if (!doneRef.current) {
          doneRef.current = true;
          setProgress(100);
          setTimeout(() => {
            setShow(false);
            onDone?.();
          }, 400);
        }
      }
    };

    animationFrame = requestAnimationFrame(tick);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      document.body.style.overflow = '';
    };
  }, [reduce, onDone]);

  useEffect(() => {
    if (!show) {
      document.body.style.overflow = '';
    }
  }, [show]);

  const wordAnimation = (delay) => ({
    initial: reduce ? false : { y: '110%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="loader"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: reduce ? 0.3 : 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#f8fafc] dark:bg-slate-950 px-6 font-sans select-none rounded-b-[2.5rem] sm:rounded-b-[4rem]"
        >
          <style>{css}</style>

          {/* Ambient Glows */}
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[50%] bg-blue-200 dark:bg-blue-900/30 rounded-full blur-[110px] opacity-60" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[50%] bg-purple-200 dark:bg-purple-900/30 rounded-full blur-[110px] opacity-60" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Small Greeting */}
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-3 text-sm sm:text-base font-semibold tracking-[0.25em] uppercase text-slate-500 dark:text-slate-400"
            >
              Welcome to
            </motion.p>

            {/* Main Title Word Mask */}
            <h1 className="flex flex-wrap justify-center gap-x-3 sm:gap-x-5 text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[1.1]">
              {["Sangam's", 'World'].map((w, i) => (
                <span key={w} className="overflow-hidden pb-2">
                  <motion.span
                    {...wordAnimation(0.25 + i * 0.15)}
                    className="loader-shimmer inline-block bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-cyan-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent"
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-4 text-sm sm:text-lg font-medium text-slate-600 dark:text-slate-300"
            >
              Full Stack Developer | AI Specialist
            </motion.p>

            {/* Progress Bar Container */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 sm:mt-12 w-60 sm:w-80"
            >
              <div className="loader-glass h-2 w-full overflow-hidden rounded-full p-[2px]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-cyan-400 dark:via-indigo-400 dark:to-purple-400 transition-all duration-150 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                <span>{progress < 100 ? 'Loading portfolio' : 'Ready'}</span>
                <span className="tabular-nums">{progress}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;