import { motion, useReducedMotion } from 'framer-motion';
import { FaUsers, FaHandsHelping } from 'react-icons/fa';

const leadership = [
  {
    title: 'Vice President - Tech Express Club',
    description:
      'Led technical workshops, hackathons, and coding competitions for 50+ members. Organized AI/ML sessions and mentored juniors in competitive programming.',
    icon: FaUsers,
    gradient: 'from-blue-600 to-indigo-600',
  },
  {
    title: 'NGO Volunteer Developer',
    description:
      'Developed full-stack applications for non-profits including donation management systems, volunteer portals, and community tools using MERN stack.',
    icon: FaHandsHelping,
    gradient: 'from-purple-600 to-pink-600',
  },
];

const css = `
.lead-card {
  position: relative; overflow: hidden;
  background: linear-gradient(135deg, rgba(255,255,255,.75), rgba(255,255,255,.42));
  -webkit-backdrop-filter: blur(20px) saturate(170%);
  backdrop-filter: blur(20px) saturate(170%);
  border: 1px solid rgba(255,255,255,.8);
  box-shadow: 0 14px 40px rgba(59,76,180,.12), inset 0 1px 0 rgba(255,255,255,.9);
  transition: box-shadow .4s, border-color .4s;
}
.dark .lead-card {
  background: linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.025));
  border-color: rgba(255,255,255,.10);
  box-shadow: 0 14px 40px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.12);
}
.lead-card:hover { border-color: rgba(99,102,241,.45); box-shadow: 0 22px 55px rgba(59,76,180,.2), inset 0 1px 0 rgba(255,255,255,.9); }
.dark .lead-card:hover { border-color: rgba(34,211,238,.4); box-shadow: 0 22px 55px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.14); }
.lead-card::before {
  content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  background: radial-gradient(300px circle at var(--mx, 50%) var(--my, 0%), rgba(99,102,241,.16), transparent 70%);
  opacity: 0; transition: opacity .35s;
}
.lead-card:hover::before { opacity: 1; }
.glass-pill {
  background: rgba(255,255,255,.55);
  -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,.75);
}
.dark .glass-pill { background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.12); }
@media (max-width: 767px) {
  .lead-card { -webkit-backdrop-filter: blur(12px) saturate(150%); backdrop-filter: blur(12px) saturate(150%); }
}
@media (prefers-reduced-motion: reduce) { .lead-card::before { display: none; } }
`;

const onMove = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

const ease = [0.22, 1, 0.36, 1];

const Leadership = () => {
  const reduce = useReducedMotion();
  const from = (v) => (reduce ? false : v);

  return (
    <section
      id="leadership"
      className="relative overflow-hidden bg-[#f8fafc] px-4 py-16 transition-colors duration-500 dark:bg-slate-950 sm:px-6 sm:py-24 md:py-32"
    >
      <style>{css}</style>

      {/* MATCHING HERO BLOBS */}
      <div className="absolute top-[20%] right-[-10%] h-[40%] w-[45%] rounded-full bg-blue-200 opacity-50 blur-[110px] dark:bg-blue-900/25" />
      <div className="absolute bottom-[20%] left-[-10%] h-[40%] w-[45%] rounded-full bg-purple-200 opacity-50 blur-[110px] dark:bg-purple-900/25" />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* HEADING SECTION */}
        <div className="mb-12 text-center sm:mb-20 md:mb-24">
          <motion.div
            initial={from({ opacity: 0, scale: 0.85 })}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-pill mb-4 inline-block rounded-full px-4 py-1.5"
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xs font-bold uppercase tracking-widest text-transparent dark:from-cyan-400 dark:to-purple-400">
              Beyond Coding
            </span>
          </motion.div>
          <motion.h2
            initial={from({ opacity: 0, y: 20, filter: 'blur(6px)' })}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-7xl"
          >
            Leadership & <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-purple-400">
              Community
            </span>
          </motion.h2>
        </div>

        {/* LEADERSHIP CARDS */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:gap-10">
          {leadership.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={from({ opacity: 0, y: 40, filter: 'blur(8px)' })}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: index * 0.18, ease }}
                whileHover={reduce ? undefined : { y: -6 }}
                className="group relative"
              >
                {/* GLOW BEHIND CARD ON HOVER */}
                <div
                  className={`absolute -inset-1 rounded-[2.4rem] bg-gradient-to-r ${item.gradient} opacity-0 blur-xl transition duration-500 group-hover:opacity-30 sm:rounded-[2.9rem]`}
                />

                <div
                  onMouseMove={onMove}
                  className="lead-card relative h-full rounded-[2rem] p-6 sm:rounded-[2.5rem] sm:p-10"
                >
                  {/* ICON + TITLE */}
                  <div className="relative mb-6 flex items-center sm:mb-8">
                    <motion.div
                      whileHover={reduce ? undefined : { rotate: 8, scale: 1.08 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className={`mr-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg sm:mr-6 sm:h-16 sm:w-16`}
                    >
                      <Icon className="h-7 w-7 text-white sm:h-8 sm:w-8" />
                    </motion.div>
                    <h3 className="min-w-0 text-xl font-black leading-tight text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-cyan-400 sm:text-2xl">
                      {item.title}
                    </h3>
                  </div>

                  <p className="relative text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
                    {item.description}
                  </p>

                  {/* DECORATIVE ELEMENT */}
                  <div
                    className={`pointer-events-none absolute -bottom-5 -right-5 h-24 w-24 rounded-full bg-gradient-to-br ${item.gradient} opacity-10 blur-2xl dark:opacity-20`}
                  />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { Leadership };