import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cn';

export default function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'relative inline-flex h-9 w-16 items-center rounded-full transition-colors duration-300',
        isDark ? 'bg-violet-600' : 'bg-ink-100',
        className
      )}
    >
      <span
        className={cn(
          'absolute left-1 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300',
          isDark && 'translate-x-7'
        )}
      >
        {isDark ? <Moon className="w-3.5 h-3.5 text-violet-600" /> : <Sun className="w-3.5 h-3.5 text-bloom-500" />}
      </span>
    </button>
  );
}
