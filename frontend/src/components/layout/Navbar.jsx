import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import Button from '../ui/Button';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Tracks', href: '#benefits' },
  { label: 'Stories', href: '#testimonials' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2.5' : 'py-4'
      }`}
    >
      <div
        className={`max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between rounded-full transition-all duration-300 ${
          scrolled ? 'glass-card py-2.5 px-5' : ''
        }`}
      >
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="w-8 h-8 rounded-xl bg-brand-gradient flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </span>
          Varta Assistant
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-700 dark:text-ink-100 hover:text-violet-600 dark:hover:text-violet-300 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button variant="primary" className="!px-5 !py-2.5 text-sm" onClick={() => navigate('/onboarding')}>
            Start chatting
          </Button>
        </div>

        <button
          className="md:hidden p-2 rounded-full hover:bg-violet-50 dark:hover:bg-white/10"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden mx-4 mt-2 glass-card p-5 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center justify-between pt-2">
              <ThemeToggle />
              <Button variant="primary" className="!px-5 !py-2.5 text-sm" onClick={() => navigate('/onboarding')}>
                Start chatting
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
