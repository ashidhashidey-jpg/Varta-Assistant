import { Sparkles } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex gap-2.5 justify-start" aria-live="polite" aria-label="Varta is typing">
      <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center shrink-0">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div className="glass-card !shadow-none px-4 py-3.5 rounded-2xl rounded-bl-md flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-blink [animation-delay:0ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-blink [animation-delay:200ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-blink [animation-delay:400ms]" />
      </div>
    </div>
  );
}
