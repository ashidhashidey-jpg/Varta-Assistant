import { cn } from '../../utils/cn';

/** Pulsing placeholder block — used for cards, table rows, chat history, etc. */
export function Skeleton({ className }) {
  return <div className={cn('animate-pulse rounded-lg bg-ink-100 dark:bg-white/10', className)} />;
}

export function CardSkeleton() {
  return (
    <div className="glass-card p-5 space-y-3">
      <Skeleton className="h-3 w-1/3" />
      <Skeleton className="h-7 w-1/2" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}

export function TableRowSkeleton({ columns = 4 }) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

export function ChatBubbleSkeleton({ align = 'left' }) {
  return (
    <div className={cn('flex', align === 'right' ? 'justify-end' : 'justify-start')}>
      <Skeleton className={cn('h-12 rounded-2xl', align === 'right' ? 'w-2/5' : 'w-3/5')} />
    </div>
  );
}
