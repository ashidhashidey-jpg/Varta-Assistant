import api from './api';

/**
 * Thin wrappers around the existing widget endpoints from server.js.
 * Kept 1:1 with the backend contract — no backend changes required.
 */

// POST /api/widget/onboard -> { visitorId, conversationId, visitorName }
export async function onboardVisitor({ name, profession, goal }) {
  const { data } = await api.post('/api/widget/onboard', { name, profession, goal });
  return data;
}

// GET /api/widget/history/:visitorId -> { visitorName, conversationId, messages }
export async function fetchVisitorHistory(visitorId) {
  const { data } = await api.get(`/api/widget/history/${visitorId}`);
  return data;
}

// POST /api/widget/chat -> { reply }
export async function sendChatMessage({ visitorId, conversationId, text }) {
  const { data } = await api.post('/api/widget/chat', { visitorId, conversationId, text });
  return data;
}
