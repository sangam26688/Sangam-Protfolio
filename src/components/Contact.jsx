import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const css = `
.contact-card {
  background: linear-gradient(135deg, rgba(255,255,255,.75), rgba(255,255,255,.42));
  -webkit-backdrop-filter: blur(22px) saturate(170%);
  backdrop-filter: blur(22px) saturate(170%);
  border: 1px solid rgba(255,255,255,.8);
  box-shadow: 0 20px 60px rgba(59,76,180,.14), inset 0 1px 0 rgba(255,255,255,.9);
}
.dark .contact-card {
  background: linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.025));
  border-color: rgba(255,255,255,.10);
  box-shadow: 0 20px 60px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.12);
}
.glass-input {
  background: rgba(255,255,255,.6);
  border: 1px solid rgba(148,163,184,.35);
  transition: border-color .25s, box-shadow .25s, background-color .25s;
}
.dark .glass-input { background: rgba(255,255,255,.05); border-color: rgba(255,255,255,.12); }
.glass-input:focus {
  outline: none; border-color: #3b82f6; background: rgba(255,255,255,.85);
  box-shadow: 0 0 0 4px rgba(59,130,246,.15), 0 8px 24px rgba(59,130,246,.12);
}
.dark .glass-input:focus { border-color: #22d3ee; background: rgba(255,255,255,.08); box-shadow: 0 0 0 4px rgba(34,211,238,.12), 0 8px 24px rgba(34,211,238,.10); }
.glass-pill {
  background: rgba(255,255,255,.55);
  -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,.75);
}
.dark .glass-pill { background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.12); }
.icon-glass {
  background: rgba(255,255,255,.7);
  -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,.9);
  box-shadow: 0 6px 18px rgba(59,76,180,.10);
}
.dark .icon-glass { background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.12); box-shadow: none; }
@media (max-width: 767px) {
  .contact-card { -webkit-backdrop-filter: blur(12px) saturate(150%); backdrop-filter: blur(12px) saturate(150%); }
}
`;

const ease = [0.22, 1, 0.36, 1];

const contactInfo = [
  { Icon: FaEnvelope, label: 'Email Me', val: 'sangam.x2228@gmail.com', href: 'mailto:sangam.x2228@gmail.com', color: 'text-blue-500' },
  { Icon: FaMapMarkerAlt, label: 'Location', val: 'Yamuna Nagar, Haryana', color: 'text-pink-500' },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });
  const reduce = useReducedMotion();
  const from = (v) => (reduce ? false : v);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', msg: '' });

    try {
      // ✅ ASLI API CALL (Backend URL)
      const response = await fetch('https://sangam-protfolio1.vercel.app/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', msg: 'Message sent successfully! 🚀 Check your Gmail.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      setStatus({ type: 'error', msg: 'Failed to send message. Please try again or email me directly.' });
    } finally {
      setIsLoading(false);
    }
  };

  const update = (key) => (e) => setFormData({ ...formData, [key]: e.target.value });
  const inputCls = 'glass-input w-full rounded-2xl p-4 text-base font-medium text-slate-900 placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500 disabled:opacity-60';

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#f8fafc] px-4 py-16 font-sans transition-colors duration-500 dark:bg-slate-950 sm:px-6 sm:py-24 md:py-32"
    >
      <style>{css}</style>

      {/* BLOBS */}
      <div className="absolute top-[-10%] left-[-10%] h-[45%] w-[55%] rounded-full bg-blue-200 opacity-60 blur-[110px] dark:bg-blue-900/25" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[45%] w-[55%] rounded-full bg-purple-200 opacity-60 blur-[110px] dark:bg-purple-900/25" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* HEADING */}
        <div className="mb-12 text-center sm:mb-20 md:mb-24">
          <motion.div
            initial={from({ opacity: 0, scale: 0.85 })}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-pill mb-4 inline-block rounded-full px-4 py-1.5"
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xs font-bold uppercase tracking-widest text-transparent dark:from-cyan-400 dark:to-purple-400">
              Let's Connect
            </span>
          </motion.div>
          <motion.h2
            initial={from({ opacity: 0, y: 20, filter: 'blur(6px)' })}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-7xl"
          >
            Get In{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text pr-1 italic text-transparent dark:from-cyan-400 dark:to-purple-400">
              Touch
            </span>
          </motion.h2>
        </div>

        <div className="grid items-center gap-10 sm:gap-14 md:grid-cols-2 md:gap-16">
          {/* LEFT: INFO */}
          <motion.div
            initial={from({ opacity: 0, x: -30 })}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
            className="space-y-8 sm:space-y-10"
          >
            <div className="space-y-4">
              <h3 className="text-3xl font-black leading-tight text-slate-900 dark:text-white sm:text-4xl">
                Let's build something <br className="hidden sm:block" />
                <span className="text-blue-600 dark:text-cyan-400">exceptional</span> together.
              </h3>
              <p className="text-base font-medium text-slate-500 dark:text-slate-400 sm:text-lg">
                I'm currently looking for new opportunities. My email is always open!
              </p>
            </div>

            <div className="grid gap-5 sm:gap-6">
              {contactInfo.map(({ Icon, label, val, href, color }) => {
                const Wrapper = href ? 'a' : 'div';
                return (
                  <Wrapper
                    key={label}
                    {...(href ? { href } : {})}
                    className="group flex items-center gap-4 sm:gap-6"
                  >
                    <div className="icon-glass flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      <Icon className={`${color} text-xl`} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
                      <p className="break-words font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-cyan-400">
                        {val}
                      </p>
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT: FORM */}
          <motion.div
            initial={from({ opacity: 0, x: 30 })}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="contact-card rounded-[2rem] p-6 sm:p-8 md:rounded-[3rem] md:p-12">
              <div className="space-y-4 sm:space-y-5">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <div>
                    <label htmlFor="c-name" className="sr-only">Name</label>
                    <input
                      id="c-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={update('name')}
                      disabled={isLoading}
                      className={inputCls}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="c-email" className="sr-only">Email</label>
                    <input
                      id="c-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={update('email')}
                      disabled={isLoading}
                      className={inputCls}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="c-message" className="sr-only">Your message</label>
                  <textarea
                    id="c-message"
                    name="message"
                    rows="5"
                    placeholder="Your Message..."
                    value={formData.message}
                    onChange={update('message')}
                    disabled={isLoading}
                    className={`${inputCls} resize-none`}
                    required
                  />
                </div>

                <motion.button
                  whileHover={reduce || isLoading ? undefined : { scale: 1.02, y: -2 }}
                  whileTap={reduce || isLoading ? undefined : { scale: 0.98 }}
                  disabled={isLoading}
                  type="submit"
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-slate-900 py-4 text-xs font-black uppercase tracking-[0.25em] text-white shadow-xl transition-shadow hover:shadow-blue-500/30 disabled:opacity-60 dark:bg-white dark:text-black sm:py-5 sm:tracking-[0.3em]"
                >
                  <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/25 transition-transform duration-700 group-hover:translate-x-[400%] dark:bg-slate-900/10" />
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FaPaperPlane size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                    </>
                  )}
                </motion.button>
              </div>

              {/* STATUS */}
              <div role="status" aria-live="polite">
                <AnimatePresence>
                  {status.msg && (
                    <motion.div
                      key={status.type}
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      className={`mt-5 flex items-center justify-center gap-2 rounded-xl border p-4 text-center text-xs font-bold uppercase tracking-widest sm:mt-6 ${
                        status.type === 'success'
                          ? 'border-green-500/25 bg-green-500/10 text-green-600 dark:text-green-400'
                          : 'border-red-500/25 bg-red-500/10 text-red-600 dark:text-red-400'
                      }`}
                    >
                      <motion.span
                        initial={reduce ? false : { scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
                        className="shrink-0"
                      >
                        {status.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
                      </motion.span>
                      <span>{status.msg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { Contact };