import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Sparkles, AlertCircle } from 'lucide-react';
import { formatMessageTime } from '../../utils/formatDate';
import { cn } from '../../utils/cn';

export default function MessageBubble({ sender, text, createdAt, isError }) {
  const [copied, setCopied] = useState(false);
  const isVisitor = sender === 'visitor';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API may be unavailable (e.g. insecure context) — fail quietly.
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn('group flex gap-2.5', isVisitor ? 'justify-end' : 'justify-start')}
    >
      {!isVisitor && (
        <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center shrink-0 mt-1">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      )}

      <div className={cn('flex flex-col max-w-[78%] sm:max-w-[68%]', isVisitor ? 'items-end' : 'items-start')}>
        <div
          className={cn(
            'px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap rounded-2xl shadow-sm',
            isVisitor
              ? 'bg-brand-gradient text-white rounded-br-md'
              : isError
              ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-300 rounded-bl-md border border-rose-200 dark:border-rose-500/20'
              : 'glass-card !shadow-none rounded-bl-md'
          )}
        >
          {isError && <AlertCircle className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />}
          {text}
        </div>

        <div className="flex items-center gap-2 mt-1 px-1">
          <span className="text-[11px] text-ink-300">{formatMessageTime(createdAt)}</span>
          <button
            onClick={handleCopy}
            aria-label="Copy message"
            className="opacity-0 group-hover:opacity-100 transition-opacity text-ink-300 hover:text-violet-500"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
