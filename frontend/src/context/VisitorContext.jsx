import { createContext, useContext, useState, useCallback } from 'react';

const VisitorContext = createContext(undefined);

const KEYS = {
  visitorId: 'varta_visitor_id',
  conversationId: 'varta_conversation_id',
  visitorName: 'varta_visitor_name'
};

function readVisitorFromStorage() {
  return {
    visitorId: window.localStorage.getItem(KEYS.visitorId) || null,
    conversationId: window.localStorage.getItem(KEYS.conversationId) || null,
    visitorName: window.localStorage.getItem(KEYS.visitorName) || null
  };
}

export function VisitorProvider({ children }) {
  const [visitor, setVisitor] = useState(readVisitorFromStorage);

  const saveVisitor = useCallback(({ visitorId, conversationId, visitorName }) => {
    if (visitorId) window.localStorage.setItem(KEYS.visitorId, visitorId);
    if (conversationId) window.localStorage.setItem(KEYS.conversationId, conversationId);
    if (visitorName) window.localStorage.setItem(KEYS.visitorName, visitorName);
    setVisitor((prev) => ({ ...prev, visitorId, conversationId, visitorName }));
  }, []);

  const updateConversationId = useCallback((conversationId) => {
    window.localStorage.setItem(KEYS.conversationId, conversationId);
    setVisitor((prev) => ({ ...prev, conversationId }));
  }, []);

  const clearVisitor = useCallback(() => {
    Object.values(KEYS).forEach((key) => window.localStorage.removeItem(key));
    setVisitor({ visitorId: null, conversationId: null, visitorName: null });
  }, []);

  const isOnboarded = Boolean(visitor.visitorId && visitor.conversationId);

  return (
    <VisitorContext.Provider
      value={{ ...visitor, isOnboarded, saveVisitor, updateConversationId, clearVisitor }}
    >
      {children}
    </VisitorContext.Provider>
  );
}

export function useVisitor() {
  const ctx = useContext(VisitorContext);
  if (!ctx) throw new Error('useVisitor must be used within a VisitorProvider');
  return ctx;
}
