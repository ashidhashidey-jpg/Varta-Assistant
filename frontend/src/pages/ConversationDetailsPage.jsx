import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Briefcase, Target, Calendar } from 'lucide-react';
import MessageBubble from '../components/chat/MessageBubble';
import { ChatBubbleSkeleton } from '../components/ui/LoadingSkeleton';
import EmptyState from '../components/ui/EmptyState';
import { MessageCircle } from 'lucide-react';
import { fetchConversationDetails } from '../services/adminService';
import { notifyApiError } from '../services/api';
import { formatConversationDate } from '../utils/formatDate';

export default function ConversationDetailsPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setIsLoading(true);
      try {
        const result = await fetchConversationDetails(id);
        if (!cancelled) setData(result);
      } catch (error) {
        if (!cancelled) notifyApiError(error, 'Could not load this conversation.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const visitor = data?.conversation?.visitorId;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Link
        to="/admin/conversations"
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 dark:text-ink-300 hover:text-violet-600"
      >
        <ArrowLeft className="w-4 h-4" /> Back to conversations
      </Link>

      <div className="glass-card p-6">
        {isLoading ? (
          <div className="flex gap-6">
            <div className="h-4 w-24 bg-ink-100 dark:bg-white/10 rounded animate-pulse" />
            <div className="h-4 w-24 bg-ink-100 dark:bg-white/10 rounded animate-pulse" />
          </div>
        ) : (
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <span className="flex items-center gap-2 text-ink-500 dark:text-ink-300">
              <User className="w-4 h-4 text-violet-500" /> {visitor?.name || 'Anonymous'}
            </span>
            <span className="flex items-center gap-2 text-ink-500 dark:text-ink-300">
              <Briefcase className="w-4 h-4 text-bloom-500" /> {visitor?.profession || '—'}
            </span>
            <span className="flex items-center gap-2 text-ink-500 dark:text-ink-300">
              <Target className="w-4 h-4 text-sky-500" /> {visitor?.goal || '—'}
            </span>
            <span className="flex items-center gap-2 text-ink-500 dark:text-ink-300">
              <Calendar className="w-4 h-4 text-mint-500" /> {formatConversationDate(data?.conversation?.createdAt)}
            </span>
          </div>
        )}
      </div>

      <div className="glass-card p-5 sm:p-6 space-y-5 min-h-[40vh]">
        {isLoading ? (
          <>
            <ChatBubbleSkeleton align="left" />
            <ChatBubbleSkeleton align="right" />
            <ChatBubbleSkeleton align="left" />
          </>
        ) : data?.messages?.length ? (
          data.messages.map((m) => (
            <MessageBubble key={m._id} sender={m.sender} text={m.text} createdAt={m.createdAt} />
          ))
        ) : (
          <EmptyState icon={MessageCircle} title="No messages in this conversation" />
        )}
      </div>
    </div>
  );
}
