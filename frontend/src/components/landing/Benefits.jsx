import { motion } from 'framer-motion';

const tracks = [
  { days: '60', name: 'Master DSA 360', tag: 'DSA fundamentals → interview flow' },
  { days: '50', name: 'Elevate Full Stack', tag: 'Guided MERN stack with certificates' },
  { days: '30', name: 'System Design', tag: 'Architecture, scalability, case studies' },
  { days: '51', name: 'Top 50+ Days DSA Sprint', tag: '100+ repeated LeetCode questions' }
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 sm:py-28 max-w-6xl mx-auto px-6">
      <div className="max-w-xl mb-14">
        <p className="label-text mb-2">The tracks</p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Pick a track. Varta keeps you on it.
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {tracks.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="glass-card p-6 flex flex-col"
          >
            <span className="text-3xl font-display font-extrabold text-gradient mb-3">{t.days}</span>
            <h3 className="font-semibold mb-1.5">{t.name}</h3>
            <p className="text-sm text-ink-500 dark:text-ink-300">{t.tag}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
