import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function AnalyticsCard({ icon: Icon, label, value, accent = 'violet', delay = 0 }) {
  const accents = {
    violet: 'bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300',
    bloom: 'bg-pink-50 text-bloom-600 dark:bg-bloom-500/15 dark:text-bloom-400',
    sky: 'bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card p-5 flex items-center gap-4"
    >
      <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center shrink-0', accents[accent])}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="label-text">{label}</p>
        <p className="text-2xl font-display font-bold mt-0.5">{value}</p>
      </div>
    </motion.div>
  );
}
