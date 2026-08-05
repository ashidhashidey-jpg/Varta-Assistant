import { useState, useEffect, useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import { useVisitor } from '../context/VisitorContext';
import { fetchVisitorHistory, sendChatMessage } from '../services/widgetService';

/**
 * Encapsulates loading history, sending messages, and the optimistic
 * "AI is typing" state for the Chat page. Keeps ChatPage focused on layout.
 */
export function useChat() {
  const { visitorId, conversationId, visitorName, updateConversationId } = useVisitor();
  const [messages, setMessages] = useState([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const activeConversationId = useRef(conversationId);

  useEffect(() => {
    let cancelled = false;

    async function loadHistory() {
      if (!visitorId) {
        setIsHistoryLoading(false);
        return;
      }
      setIsHistoryLoading(true);
      try {
        const data = await fetchVisitorHistory(visitorId);
        if (cancelled) return;
        setMessages(
          (data.messages || []).map((m, idx) => ({
            id: `history-${idx}-${m.createdAt}`,
            sender: m.sender,
            text: m.text,
            createdAt: m.createdAt
          }))
        );
        if (data.conversationId) {
          activeConversationId.current = data.conversationId;
          updateConversationId(data.conversationId);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setIsHistoryLoading(false);
      }
    }

    loadHistory();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visitorId]);

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed || !visitorId || !activeConversationId.current) return;

      const optimisticMessage = {
        id: `local-${Date.now()}`,
        sender: 'visitor',
        text: trimmed,
        createdAt: new Date().toISOString()
      };
      setMessages((prev) => [...prev, optimisticMessage]);
      setIsSending(true);

      try {
        const { reply } = await sendChatMessage({
          visitorId,
          conversationId: activeConversationId.current,
          text: trimmed
        });
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: reply,
            createdAt: new Date().toISOString()
          }
        ]);
      } catch (err) {
        toast.error(err.message || 'Could not reach Varta. Please try again.');
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-error-${Date.now()}`,
            sender: 'ai',
            text: "I couldn't process that — please try sending your message again.",
            createdAt: new Date().toISOString(),
            isError: true
          }
        ]);
      } finally {
        setIsSending(false);
      }
    },
    [visitorId]
  );

  return {
    messages,
    isHistoryLoading,
    isSending,
    error,
    sendMessage,
    visitorName
  };
}
