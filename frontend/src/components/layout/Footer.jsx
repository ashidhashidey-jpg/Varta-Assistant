import { Sparkles, Youtube, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-ink-100 dark:border-white/10 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-lg mb-3">
            <span className="w-8 h-8 rounded-xl bg-brand-gradient flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </span>
            Varta Assistant
          </div>
          <p className="text-sm text-ink-500 dark:text-ink-300 max-w-xs">
            An AI guide for the "build with consistency" learning ecosystem — DSA, Full Stack and
            System Design, personalized to your goals.
          </p>
        </div>

        <div>
          <p className="label-text mb-3">Tracks</p>
          <ul className="space-y-2 text-sm text-ink-500 dark:text-ink-300">
            <li>Master DSA 360</li>
            <li>Elevate Full Stack</li>
            <li>System Design</li>
            <li>Top 50+ Days DSA Sprint</li>
          </ul>
        </div>

        <div>
          <p className="label-text mb-3">Connect</p>
          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="YouTube"
              className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:scale-105 transition-transform"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:scale-105 transition-transform"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:scale-105 transition-transform"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-ink-300 pb-8">
        © {new Date().getFullYear()} Varta Assistant. Built for consistent learners.
      </div>
    </footer>
  );
}
