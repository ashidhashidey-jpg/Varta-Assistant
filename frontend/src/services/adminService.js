import api from './api';

// GET /api/analytics -> { totalVisitors, totalConversations, totalMessages, professionBreakdown }
export async function fetchAnalytics() {
  const { data } = await api.get('/api/analytics');
  return data;
}

// GET /api/conversations -> [{ _id, visitorId: {..}, createdAt }]
export async function fetchConversations() {
  const { data } = await api.get('/api/conversations');
  return data;
}

// GET /api/conversations/:id -> { conversation, messages }
export async function fetchConversationDetails(id) {
  const { data } = await api.get(`/api/conversations/${id}`);
  return data;
}
