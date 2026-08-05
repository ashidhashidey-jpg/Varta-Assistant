import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh-light dark:bg-base-dark px-6">
      <div className="glass-card max-w-md w-full p-10 text-center">
        <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-brand-gradient-soft flex items-center justify-center">
          <Compass className="w-6 h-6 text-violet-600 dark:text-violet-300" />
        </div>
        <h1 className="text-2xl font-display font-bold mb-2">Page not found</h1>
        <p className="text-sm text-ink-500 dark:text-ink-300 mb-7">
          This page wandered off the roadmap. Let's get you back on track.
        </p>
        <Link to="/">
          <Button className="w-full">Back to home</Button>
        </Link>
      </div>
    </div>
  );
}
