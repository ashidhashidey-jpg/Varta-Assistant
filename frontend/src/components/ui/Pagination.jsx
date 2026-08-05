import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  );

  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="Pagination">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="p-2 rounded-full hover:bg-violet-50 dark:hover:bg-white/10 disabled:opacity-30 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((page, idx) => {
        const prevPage = pages[idx - 1];
        const showEllipsis = prevPage && page - prevPage > 1;
        return (
          <span key={page} className="flex items-center">
            {showEllipsis && <span className="px-1.5 text-ink-300">···</span>}
            <button
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? 'page' : undefined}
              className={cn(
                'min-w-[2.25rem] h-9 px-2 rounded-full text-sm font-medium transition-colors',
                page === currentPage
                  ? 'bg-brand-gradient text-white shadow-glow-violet'
                  : 'hover:bg-violet-50 dark:hover:bg-white/10 text-ink-700 dark:text-ink-100'
              )}
            >
              {page}
            </button>
          </span>
        );
      })}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="p-2 rounded-full hover:bg-violet-50 dark:hover:bg-white/10 disabled:opacity-30 transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
