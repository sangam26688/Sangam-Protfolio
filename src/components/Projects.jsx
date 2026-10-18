import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: 'Event Photography Portfolio',
    tech: ['React.js', 'Framer Motion', 'Tailwind'],
    description: 'Dynamic photography portfolio with 3D hover effects and AI-optimized image loading.',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000',
    live: 'https://event-portfolio.sangam.dev',
    github: 'https://github.com/yourusername/event-photography',
  },
  {
    title: 'AI Chat Assistant',
    tech: ['Node.js', 'OpenAI API', 'MongoDB'],
    description: 'Real-time AI conversation platform with memory context and multi-language support.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000',
    live: 'https://ai-chat.sangam.dev',
    github: 'https://github.com/yourusername/ai-chat',
  },
  {
    title: 'E-Commerce Dashboard',
    tech: ['React', 'Chart.js', 'Express'],
    description: 'Admin dashboard with real-time analytics, inventory management and sales forecasting.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000',
    live: 'https://ecommerce.sangam.dev',
    github: 'https://github.com/yourusername/ecommerce-dashboard',
  },
];

const css = `
.proj-card {
  position: relative;
  background: linear-gradient(135deg, rgba(255,255,255,.75), rgba(255,255,255,.42));
  -webkit-backdrop-filter: blur(20px) saturate(170%);
  backdrop-filter: blur(20px) saturate(170%);
  border: 1px solid rgba(255,255,255,.8);
  box-shadow: 0 14px 40px rgba(59,76,180,.12), inset 0 1px 0 rgba(255,255,255,.9);
  transition: box-shadow .4s, border-color .4s;
}
.dark .proj-card {
  background: linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.025));
  border-color: rgba(255,255,255,.10);
  box-shadow: 0 14px 40px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.12);
}
.proj-card:hover { box-shadow: 0 22px 55px rgba(59,76,180,.22), inset 0 1px 0 rgba(255,255,255,.9); border-color: rgba(99,102,241,.45); }
.dark .proj-card:hover { box-shadow: 0 22px 55px rgba(0,0,0,.6), 0 0 45px rgba(99,102,241,.12), inset 0 1px 0 rgba(255,255,255,.14); border-color: rgba(34,211,238,.4); }
/* cursor light over the card body */
.proj-card::before {
  content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 1;
  background: radial-gradient(300px circle at var(--mx, 50%) var(--my, 0%), rgba(99,102,241,.16), transparent 70%);
  opacity: 0; transition: opacity .35s;
}
.proj-card:hover::before { opacity: 1; }
.glass-tag {
  background: rgba(255,255,255,.55);
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
  border: 1px solid rgba(99,102,241,.25);
}
.dark .glass-tag { background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.12); }
.glass-pill {
  background: rgba(255,255,255,.55);
  -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,.75);
}
.dark .glass-pill { background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.12); }
@keyframes img-skeleton { 0%,100% { opacity: .5; } 50% { opacity: 1; } }
.img-skeleton { animation: img-skeleton 1.4s ease-in-out infinite; }
@media (max-width: 767px) {
  .proj-card { -webkit-backdrop-filter: blur(12px) saturate(150%); backdrop-filter: blur(12px) saturate(150%); }
}
@media (prefers-reduced-motion: reduce) { .proj-card::before { display: none; } .img-skeleton { animation: none; } }
`;

const onMove = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

const ease = [0.22, 1, 0.36, 1];

const ProjectCard = ({ project, index, reduce }) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <motion.article
      onMouseMove={onMove}
      initial={reduce ? false : { opacity: 0, y: 40, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.12, ease }}
      whileHover={reduce ? undefined : { y: -8 }}
      className="proj-card group flex flex-col rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden"
    >
      {/* IMAGE AREA */}
      <div className="relative h-52 sm:h-64 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-slate-800 dark:to-slate-900">
        {!loaded && !failed && <div className="img-skeleton absolute inset-0 bg-white/40 dark:bg-white/5" />}
        {!failed && (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${
              loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
            }`}
          />
        )}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-slate-900/70 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
          <p className="text-white text-xs font-medium italic">Click source to view code</p>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="relative z-[2] flex flex-grow flex-col p-6 sm:p-8">
        <h3 className="mb-3 text-xl sm:text-2xl font-black text-slate-900 dark:text-white transition-colors group-hover:text-blue-600 dark:group-hover:text-cyan-400">
          {project.title}
        </h3>
        <p className="mb-6 flex-grow text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {project.description}
        </p>

        {/* TECH TAGS */}
        <ul className="mb-7 flex flex-wrap gap-2 sm:mb-8">
          {project.tech.map((t) => (
            <li
              key={t}
              className="glass-tag rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-300"
            >
              {t}
            </li>
          ))}
        </ul>

        {/* LINKS */}
        <div className="mt-auto flex items-center justify-between border-t border-slate-300/40 pt-5 dark:border-white/10 sm:pt-6">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="group/live flex items-center gap-2 text-sm font-bold text-slate-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-cyan-400"
          >
            Live Preview
            <FaExternalLinkAlt size={12} className="transition-transform group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5" />
          </a>
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} source code on GitHub`}
            whileHover={reduce ? undefined : { scale: 1.12, rotate: -6 }}
            whileTap={{ scale: 0.92 }}
            className="glass-pill rounded-full p-2.5 text-slate-600 transition-colors hover:bg-slate-900 hover:text-white dark:text-slate-300 dark:hover:bg-white dark:hover:text-slate-900"
          >
            <FaGithub size={20} />
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  const reduce = useReducedMotion();

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#f8fafc] px-4 py-16 transition-colors duration-500 dark:bg-slate-950 sm:px-6 sm:py-24 md:py-32"
    >
      <style>{css}</style>

      {/* MATCHING HERO BLOBS (a bit stronger so the glass has color to blur) */}
      <div className="absolute top-[20%] left-[-5%] h-[35%] w-[45%] rounded-full bg-blue-200 opacity-60 blur-[110px] dark:bg-blue-900/25" />
      <div className="absolute bottom-[20%] right-[-5%] h-[35%] w-[45%] rounded-full bg-purple-200 opacity-60 blur-[110px] dark:bg-purple-900/25" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HEADING SECTION */}
        <div className="mb-12 text-center sm:mb-20">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-pill mb-4 inline-block rounded-full px-4 py-1.5 shadow-sm"
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xs font-bold uppercase tracking-widest text-transparent dark:from-cyan-400 dark:to-purple-400">
              My Creative Works
            </span>
          </motion.div>
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 20, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-7xl"
          >
            Featured{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-purple-400">
              Projects
            </span>
          </motion.h2>
        </div>

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} reduce={reduce} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Projects };