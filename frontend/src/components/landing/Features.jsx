import { motion } from 'framer-motion';
import { Brain, Compass, History, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Knows the full curriculum',
    description:
      'Master DSA 360, Elevate Full Stack, System Design, MERN trackers, and both handbooks — Varta can point you to the exact resource for what you\'re stuck on.'
  },
  {
    icon: Compass,
    title: 'Personalized from the first message',
    description:
      'Tell it your name, profession, and goal once. Every answer after that is tuned to a job seeker, a student, or a working engineer — differently.'
  },
  {
    icon: History,
    title: 'Remembers where you left off',
    description:
      'Conversation history loads automatically, so picking the thread back up after a break feels like continuing, not starting over.'
  },
  {
    icon: ShieldCheck,
    title: 'Fast, focused answers',
    description:
      'Clean markdown, short lists, no fluff — built to be read in the 30 seconds between two LeetCode problems.'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-28 max-w-6xl mx-auto px-6">
      <div className="max-w-xl mb-14">
        <p className="label-text mb-2">Why Varta</p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          One assistant, the whole roadmap memorized.
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card p-6"
          >
            <div className="w-11 h-11 rounded-xl bg-brand-gradient-soft flex items-center justify-center mb-4">
              <f.icon className="w-5 h-5 text-violet-600 dark:text-violet-300" />
            </div>
            <h3 className="font-semibold mb-1.5">{f.title}</h3>
            <p className="text-sm text-ink-500 dark:text-ink-300 leading-relaxed">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
