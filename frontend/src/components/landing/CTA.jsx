import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="py-20 sm:py-24 max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-2xl5 bg-brand-gradient px-8 sm:px-14 py-14 text-center text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_60%)]" />
        <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4 relative">
          Your next study session starts with one message.
        </h2>
        <p className="text-white/85 max-w-xl mx-auto mb-8 relative">
          No setup, no sign-up form. Just your name, your goal, and a question.
        </p>
        <Button
          variant="secondary"
          className="!bg-white !text-violet-700 relative"
          onClick={() => navigate('/onboarding')}
        >
          Start chatting <ArrowRight className="w-4 h-4" />
        </Button>
      </motion.div>
    </section>
  );
}
