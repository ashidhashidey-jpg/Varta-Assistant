import { useState, useRef } from 'react';
import { Send, Smile } from 'lucide-react';

const QUICK_EMOJIS = ['😀', '👍', '🙏', '🎯', '🔥', '🚀'];

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue('');
    setShowEmojis(false);
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      {showEmojis && (
        <div className="absolute bottom-full mb-2 left-0 glass-card !bg-white dark:!bg-surface-dark p-2 flex gap-1">
          {QUICK_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => setValue((v) => v + emoji)}
              className="text-lg p-1.5 rounded-lg hover:bg-violet-50 dark:hover:bg-white/10"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-end gap-2 glass-card !rounded-2xl p-2 pl-3">
        <button
          type="button"
          onClick={() => setShowEmojis((v) => !v)}
          aria-label="Add emoji"
          className="p-2 text-ink-300 hover:text-bloom-500 transition-colors shrink-0"
        >
          <Smile className="w-5 h-5" />
        </button>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about DSA, full stack, system design, or your roadmap…"
          rows={1}
          disabled={disabled}
          className="flex-1 resize-none bg-transparent outline-none text-sm py-2.5 max-h-32 placeholder:text-ink-300"
        />

        <button
          type="submit"
          disabled={!value.trim() || disabled}
          aria-label="Send message"
          className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center shrink-0 disabled:opacity-40 transition-transform hover:scale-105 active:scale-95"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>
    </form>
  );
}
