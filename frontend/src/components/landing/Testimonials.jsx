import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ananya R.',
    role: 'Final-year student',
    quote:
      'I used to bounce between five tabs trying to find what to study next. Now I just ask Varta and it tells me exactly which day of the sprint I should be on.'
  },
  {
    name: 'Karthik S.',
    role: 'Job seeker',
    quote:
      'It recommended the DSA Handbook the moment I said "interview in 3 weeks." Felt like it actually read my situation instead of giving a generic answer.'
  },
  {
    name: 'Meera T.',
    role: 'Working engineer',
    quote:
      'The System Design track plus being able to ask follow-up questions in chat made case studies finally click for me.'
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 max-w-6xl mx-auto px-6">
      <div className="max-w-xl mb-14">
        <p className="label-text mb-2">From the learners</p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Real roadmaps, kept on track.</h2>
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="glass-card p-6 flex flex-col"
          >
            <Quote className="w-5 h-5 text-bloom-400 mb-3" />
            <p className="text-sm text-ink-700 dark:text-ink-100 leading-relaxed flex-1">{t.quote}</p>
            <div className="mt-5 pt-4 border-t border-ink-100 dark:border-white/10">
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-ink-400">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
