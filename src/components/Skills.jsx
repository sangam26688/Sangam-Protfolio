import { useState, useEffect, useRef } from 'react';
import { motion, animate, useInView, useReducedMotion } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaDatabase, FaJs, FaRobot } from 'react-icons/fa';

const skills = [
  { name: 'React.js', category: 'Frontend', level: 90, icon: FaReact, color: 'text-cyan-400' },
  { name: 'Node.js', category: 'Backend', level: 85, icon: FaNodeJs, color: 'text-green-500' },
  { name: 'Python', category: 'Programming', level: 88, icon: FaPython, color: 'text-blue-500' },
  { name: 'MongoDB', category: 'Database', level: 82, icon: FaDatabase, color: 'text-emerald-500' },
  { name: 'JavaScript', category: 'Core', level: 95, icon: FaJs, color: 'text-yellow-400' },
  { name: 'AI Tools', category: 'Specialized', level: 92, icon: FaRobot, color: 'text-purple-500' },
];

const levelLabel = (n) => (n >= 90 ? 'Expert' : n >= 80 ? 'Advanced' : 'Proficient');

const css = `
.skill-card {
  position: relative; overflow: hidden;
  background: linear-gradient(135deg, rgba(255,255,255,.75), rgba(255,255,255,.42));
  -webkit-backdrop-filter: blur(20px) saturate(170%);
  backdrop-filter: blur(20px) saturate(170%);
  border: 1px solid rgba(255,255,255,.8);
  box-shadow: 0 12px 36px rgba(59,76,180,.12), inset 0 1px 0 rgba(255,255,255,.9);
  transition: box-shadow .4s, border-color .4s;
}
.dark .skill-card {
  background: linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.025));
  border-color: rgba(255,255,255,.10);
  box-shadow: 0 12px 36px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.12);
}
.skill-card:hover { box-shadow: 0 20px 50px rgba(59,76,180,.22), inset 0 1px 0 rgba(255,255,255,.9); border-color: rgba(99,102,241,.45); }
.dark .skill-card:hover { box-shadow: 0 20px 50px rgba(0,0,0,.6), 0 0 40px rgba(99,102,241,.12), inset 0 1px 0 rgba(255,255,255,.14); border-color: rgba(34,211,238,.4); }
.skill-card::before {
  content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  background: radial-gradient(260px circle at var(--mx, 50%) var(--my, 0%), rgba(99,102,241,.16), transparent 70%);
  opacity: 0; transition: opacity .35s;
}
.skill-card:hover::before { opacity: 1; }
.glass-pill {
  background: rgba(255,255,255,.55);
  -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,.75);
}
.dark .glass-pill { background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.12); }
.icon-glass {
  background: rgba(255,255,255,.7);
  border: 1px solid rgba(255,255,255,.9);
  box-shadow: inset 0 1px 2px rgba(15,23,42,.06), 0 4px 12px rgba(59,76,180,.08);
}
.dark .icon-glass { background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.12); box-shadow: inset 0 1px 0 rgba(255,255,255,.1); }
@keyframes bar-sheen { 0% { transform: translateX(-120%); } 100% { transform: translateX(320%); } }
.bar-sheen { animation: bar-sheen 2.8s ease-in-out infinite 1.6s; }
@media (max-width: 767px) {
  .skill-card { -webkit-backdrop-filter: blur(12px) saturate(150%); backdrop-filter: blur(12px) saturate(150%); }
}
@media (prefers-reduced-motion: reduce) { .skill-card::before { display: none; } .bar-sheen { animation: none; } }
`;

const onMove = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

/* percentage counts up when the card scrolls into view */
const CountUp = ({ to, reduce }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, { duration: 1.5, ease: 'circOut', onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return <span ref={ref} className="tabular-nums">{n}%</span>;
};

const ease = [0.22, 1, 0.36, 1];

const Skills = () => {
  const reduce = useReducedMotion();
  const from = (v) => (reduce ? false : v);

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[#f8fafc] px-4 py-16 transition-colors duration-500 dark:bg-slate-950 sm:px-6 sm:py-24 md:py-32"
    >
      <style>{css}</style>

      {/* MATCHING HERO BLOBS */}
      <div className="absolute top-[-10%] right-[-10%] h-[45%] w-[50%] rounded-full bg-blue-200 opacity-60 blur-[110px] dark:bg-blue-900/25" />
      <div className="absolute bottom-[-10%] left-[-10%] h-[45%] w-[50%] rounded-full bg-purple-200 opacity-60 blur-[110px] dark:bg-purple-900/25" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* HEADING SECTION */}
        <div className="mb-12 text-center sm:mb-20 md:mb-24">
          <motion.div
            initial={from({ opacity: 0, scale: 0.85 })}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-pill mb-4 inline-block rounded-full px-4 py-1.5"
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xs font-bold uppercase tracking-widest text-transparent dark:from-cyan-400 dark:to-purple-400">
              My Technical Arsenal
            </span>
          </motion.div>
          <motion.h2
            initial={from({ opacity: 0, y: 20, filter: 'blur(6px)' })}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-7xl"
          >
            Expertise &{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-purple-400">
              Skills
            </span>
          </motion.h2>
        </div>

        {/* SKILLS GRID */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.article
                key={skill.name}
                onMouseMove={onMove}
                initial={from({ opacity: 0, y: 36, filter: 'blur(8px)' })}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease }}
                whileHover={reduce ? undefined : { y: -8 }}
                className="skill-card group rounded-[2rem] p-6 sm:rounded-[2.5rem] sm:p-8"
              >
                <div className="relative mb-7 flex items-center sm:mb-8">
                  <motion.div
                    whileHover={reduce ? undefined : { rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.5 }}
                    className="icon-glass mr-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 sm:mr-5"
                  >
                    <Icon className={`h-7 w-7 ${skill.color} drop-shadow-[0_0_8px_currentColor]`} />
                  </motion.div>
                  <div className="min-w-0">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">{skill.name}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      {skill.category}
                    </p>
                  </div>
                </div>

                {/* PROGRESS BAR */}
                <div className="relative">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">Proficiency</span>
                    <span className="text-xs font-black text-blue-600 dark:text-cyan-400">
                      <CountUp to={skill.level} reduce={reduce} />
                    </span>
                  </div>
                  <div
                    className="h-2 overflow-hidden rounded-full bg-slate-200/70 dark:bg-white/10"
                    role="progressbar"
                    aria-valuenow={skill.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${skill.name} proficiency`}
                  >
                    <motion.div
                      initial={from({ width: 0 })}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: 'circOut', delay: 0.15 }}
                      className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500"
                    >
                      <span className="bar-sheen absolute inset-y-0 left-0 w-1/4 -skew-x-12 bg-white/40" />
                    </motion.div>
                  </div>
                </div>

                {/* Fixed-height slot: level label by default, quote on hover. Card height never changes. */}
                <div className="relative mt-5 h-9">
                  <p className="absolute inset-0 flex items-center text-[11px] font-bold text-slate-500 transition-opacity duration-300 group-hover:opacity-0 dark:text-slate-400">
                    {levelLabel(skill.level)}
                  </p>
                  <p className="absolute inset-0 text-[11px] font-medium italic leading-tight text-slate-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-slate-400">
                    "Advanced proficiency with real-world MERN & AI project experience."
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { Skills };