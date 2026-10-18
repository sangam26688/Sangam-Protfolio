import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaGraduationCap, FaUniversity, FaCalendarAlt, FaAward } from 'react-icons/fa';

const educationData = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Uttaranchal University',
    duration: '2026 - Present',
    status: 'Pursuing',
    description: 'Advanced studies in computer applications, software engineering, and modern full-stack architectures.',
    badge: 'Post Graduation',
    accent: 'from-purple-500 to-indigo-600',
  },
  {
    degree: 'Bachelor of Science in Information Technology (B.Sc. IT)',
    institution: 'Mukand Lal National College (MLN College)',
    affiliation: 'Kurukshetra University (KUK)',
    duration: '2023 - 2026',
    status: 'Completed (2026)',
    description: 'Comprehensive foundation in programming, database management, web development, and system administration.',
    badge: 'Under Graduation',
    accent: 'from-blue-600 to-cyan-500',
  },
];

const css = `
.edu-card {
  position: relative; overflow: hidden;
  background: linear-gradient(135deg, rgba(255,255,255,.72), rgba(255,255,255,.4));
  -webkit-backdrop-filter: blur(18px) saturate(170%);
  backdrop-filter: blur(18px) saturate(170%);
  border: 1px solid rgba(255,255,255,.75);
  box-shadow: 0 12px 40px rgba(59,76,180,.12), inset 0 1px 0 rgba(255,255,255,.9);
  transition: border-color .3s, box-shadow .3s;
}
.dark .edu-card {
  background: linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.025));
  border-color: rgba(255,255,255,.10);
  box-shadow: 0 12px 40px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.12);
}
.edu-card:hover { border-color: rgba(59,130,246,.5); box-shadow: 0 18px 50px rgba(59,76,180,.2), inset 0 1px 0 rgba(255,255,255,.9); }
.dark .edu-card:hover { border-color: rgba(34,211,238,.45); box-shadow: 0 18px 50px rgba(0,0,0,.55), 0 0 40px rgba(34,211,238,.10), inset 0 1px 0 rgba(255,255,255,.14); }
/* light that follows the cursor inside the card */
.edu-card::before {
  content: ""; position: absolute; inset: 0; pointer-events: none; border-radius: inherit;
  background: radial-gradient(280px circle at var(--mx, 50%) var(--my, 0%), rgba(99,102,241,.18), transparent 70%);
  opacity: 0; transition: opacity .35s;
}
.edu-card:hover::before { opacity: 1; }
.glass-pill {
  background: rgba(255,255,255,.55);
  -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,.75);
}
.dark .glass-pill { background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.12); }
@media (max-width: 767px) {
  .edu-card { -webkit-backdrop-filter: blur(12px) saturate(150%); backdrop-filter: blur(12px) saturate(150%); }
}
@media (prefers-reduced-motion: reduce) { .edu-card::before { display: none; } }
`;

const onMove = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

const ease = [0.22, 1, 0.36, 1];

const Education = () => {
  const reduce = useReducedMotion();
  const from = (v) => (reduce ? false : v);

  return (
    <section
      id="education"
      className="relative py-16 sm:py-24 px-4 sm:px-6 bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-500 font-sans select-none overflow-hidden"
    >
      <style>{css}</style>

      {/* Background glows (a bit stronger so the glass has color to blur) */}
      <div className="absolute top-1/2 left-0 sm:left-10 w-72 sm:w-96 h-72 sm:h-96 bg-blue-300/30 dark:bg-cyan-500/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 sm:right-10 w-72 sm:w-96 h-72 sm:h-96 bg-purple-300/30 dark:bg-purple-500/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <motion.div
            initial={from({ opacity: 0, scale: 0.85 })}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-pill inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full shadow-sm"
          >
            <FaGraduationCap className="text-blue-600 dark:text-cyan-400 text-sm" />
            <span className="text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
              Academic Journey
            </span>
          </motion.div>

          <motion.h2
            initial={from({ opacity: 0, y: 20, filter: 'blur(6px)' })}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
          >
            Educational{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
              Milestones
            </span>
          </motion.h2>
        </div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {educationData.map((edu, index) => {
            const pursuing = edu.status === 'Pursuing';
            return (
              <motion.article
                key={edu.degree}
                onMouseMove={onMove}
                initial={from({ opacity: 0, y: 40, filter: 'blur(8px)' })}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: index * 0.18, ease }}
                whileHover={reduce ? undefined : { y: -6 }}
                className="edu-card group p-6 sm:p-8 rounded-3xl flex flex-col justify-between"
              >
                {/* accent line draws in once the card is visible */}
                <motion.span
                  initial={from({ scaleX: 0 })}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.3 + index * 0.18, ease }}
                  className={`absolute top-0 left-0 h-[3px] w-full origin-left bg-gradient-to-r ${edu.accent}`}
                />

                <div className="relative">
                  {/* Top Row: Badge & Duration */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-5 sm:mb-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white bg-gradient-to-r ${edu.accent} shadow-sm`}>
                      {edu.badge}
                    </span>
                    <div className="glass-pill flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 px-3 py-1 rounded-full">
                      <FaCalendarAlt size={11} className="text-blue-500" />
                      <span>{edu.duration}</span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    {edu.degree}
                  </h3>

                  <div className="flex items-start gap-2.5 mb-4 text-slate-600 dark:text-slate-300">
                    <FaUniversity className="text-blue-600 dark:text-cyan-400 mt-1 shrink-0" size={16} />
                    <div>
                      <p className="text-sm font-bold">{edu.institution}</p>
                      {edu.affiliation && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{edu.affiliation}</p>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {edu.description}
                  </p>
                </div>

                {/* Bottom Status */}
                <div className="relative pt-4 border-t border-slate-300/40 dark:border-white/10 flex items-center justify-between gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Status</span>
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${
                      pursuing
                        ? 'bg-indigo-500/10 border-indigo-500/25 text-indigo-600 dark:text-indigo-300'
                        : 'bg-emerald-500/10 border-emerald-500/25 text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {pursuing ? (
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75 animate-ping motion-reduce:animate-none" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
                      </span>
                    ) : (
                      <FaAward size={12} />
                    )}
                    <span>{edu.status}</span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;