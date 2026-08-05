import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost:
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-medium text-ink-700 dark:text-ink-100 hover:bg-violet-50 dark:hover:bg-white/10 transition-colors',
  danger:
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-white bg-rose-500 hover:bg-rose-600 transition-colors'
};

const Button = forwardRef(
  ({ variant = 'primary', isLoading = false, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(variants[variant], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
