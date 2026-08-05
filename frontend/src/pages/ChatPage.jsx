import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';
import ChatWindow from '../components/chat/ChatWindow';
import ChatInput from '../components/chat/ChatInput';
import ThemeToggle from '../components/ui/ThemeToggle';
import { useChat } from '../hooks/useChat';
import { useVisitor } from '../context/VisitorContext';

export default function ChatPage() {
  const { messages, isHistoryLoading, isSending, sendMessage, visitorName } = useChat();
  const { clearVisitor } = useVisitor();
  const navigate = useNavigate();

  const handleNewSession = () => {
    clearVisitor();
    toast.success('Started a fresh session.');
    navigate('/onboarding');
  };

  return (
    <div className="h-screen flex flex-col bg-base-light dark:bg-base-dark">
      <header className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-ink-100 dark:border-white/10">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2 rounded-full hover:bg-violet-50 dark:hover:bg-white/10" aria-label="Back to home">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="w-8 h-8 rounded-xl bg-brand-gradient flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-display font-semibold text-sm leading-none">Varta Assistant</p>
            <p className="text-[11px] text-mint-500 flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-mint-400" /> Online
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleNewSession}
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-ink-500 dark:text-ink-300 hover:text-violet-600 px-3 py-1.5 rounded-full hover:bg-violet-50 dark:hover:bg-white/10"
          >
            <RotateCcw className="w-3.5 h-3.5" /> New session
          </button>
          <ThemeToggle />
        </div>
      </header>

      <ChatWindow
        messages={messages}
        isHistoryLoading={isHistoryLoading}
        isSending={isSending}
        visitorName={visitorName}
      />

      <div className="px-4 sm:px-6 pb-5 pt-2">
        <ChatInput onSend={sendMessage} disabled={isSending || isHistoryLoading} />
        <p className="text-center text-[11px] text-ink-300 mt-2.5">
          Varta can make mistakes. Verify important details against the official handbooks.
        </p>
      </div>
    </div>
  );
}
