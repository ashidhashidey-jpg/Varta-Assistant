import { cn } from '../../utils/cn';

/** Generic glassmorphism card shell reused across the app. */
export default function Card({ className, children, as: Tag = 'div', ...props }) {
  return (
    <Tag className={cn('glass-card', className)} {...props}>
      {children}
    </Tag>
  );
}
