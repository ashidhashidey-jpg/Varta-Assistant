import { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { ChatBubbleSkeleton } from '../ui/LoadingSkeleton';

export default function ChatWindow({ messages, isHistoryLoading, isSending, visitorName }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isSending]);

  if (isHistoryLoading) {
    return (
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-4">
        <ChatBubbleSkeleton align="left" />
        <ChatBubbleSkeleton align="right" />
        <ChatBubbleSkeleton align="left" />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin px-4 sm:px-6 py-6 space-y-5">
      {messages.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center text-center py-10">
          <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center mb-4 shadow-glow-violet">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold mb-1">Hey {visitorName || 'there'}, I'm Varta 👋</h3>
          <p className="text-sm text-ink-500 dark:text-ink-300 max-w-sm">
            Ask me about Master DSA 360, Elevate Full Stack, System Design, or anything on your
            learning roadmap.
          </p>
        </div>
      )}

      {messages.map((m) => (
        <MessageBubble key={m.id} sender={m.sender} text={m.text} createdAt={m.createdAt} isError={m.isError} />
      ))}

      {isSending && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}
