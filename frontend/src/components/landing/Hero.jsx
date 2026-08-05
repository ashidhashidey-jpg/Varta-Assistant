import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Button from '../ui/Button';

// Deterministic pseudo-random intensities so the "consistency grid" signature
// motif (a nod to a GitHub-style contribution graph — this is a platform for
// developers building daily habits) renders the same on every load.
function buildGrid(cols, rows) {
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  return Array.from({ length: cols * rows }, () => rand());
}

const GRID = buildGrid(14, 7);

function ConsistencyGrid() {
  return (
    <div className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-1.5 w-full max-w-xs sm:max-w-sm">
      {GRID.map((v, i) => {
        const intensity = v > 0.78 ? 'bg-violet-600' : v > 0.55 ? 'bg-violet-400' : v > 0.32 ? 'bg-bloom-300' : 'bg-ink-100 dark:bg-white/10';
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.012 }}
            className={`aspect-square rounded-[3px] ${intensity}`}
          />
        );
      })}
    </div>
  );
}

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-mesh-light dark:opacity-20 -z-10" />

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 glass-card px-4 py-1.5 text-xs font-semibold text-violet-600 dark:text-violet-300 mb-6"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Personalized to your name, role, and goal
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.08] tracking-tight"
          >
            Build with consistency.
            <br />
            <span className="text-gradient">Talk it through with Varta.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-base sm:text-lg text-ink-500 dark:text-ink-300 max-w-lg"
          >
            Varta is the AI companion for the DSA, Full Stack, and System Design tracks — it
            knows your roadmap, remembers your goal, and points you to the right resource the
            moment you ask.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button onClick={() => navigate('/onboarding')}>
              Start chatting <ArrowRight className="w-4 h-4" />
            </Button>
            <a href="#features" className="btn-secondary">
              See how it works
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10"
          >
            <p className="label-text mb-3">Every question, a contribution to your streak</p>
            <ConsistencyGrid />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="glass-card p-5 sm:p-6 shadow-glass-lg">
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-ink-100 dark:border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
              <span className="ml-2 text-xs text-ink-400 font-mono">varta-assistant</span>
            </div>
            <div className="space-y-3">
              <div className="bg-violet-50 dark:bg-white/5 rounded-2xl rounded-bl-md px-4 py-3 text-sm max-w-[85%]">
                Hey! I'm a job seeker prepping for SDE interviews in 8 weeks. Where do I start?
              </div>
              <div className="bg-brand-gradient text-white rounded-2xl rounded-br-md px-4 py-3 text-sm max-w-[85%] ml-auto">
                Start with <strong>Master DSA 360</strong> — pace it 2 problems/day from the
                Top 50+ Days Sprint, then layer in the <strong>DSA Handbook</strong> for revision
                the week before interviews. Want today's first problem?
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-6 glass-card px-4 py-3 hidden sm:flex items-center gap-3 shadow-glass-lg">
            <div className="w-9 h-9 rounded-full bg-mint-400/20 flex items-center justify-center text-mint-500 font-bold text-sm">
              60
            </div>
            <div>
              <p className="text-xs font-semibold">Day roadmap</p>
              <p className="text-[11px] text-ink-400">tracked automatically</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
