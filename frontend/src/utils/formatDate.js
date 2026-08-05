import { format, isToday, isYesterday, formatDistanceToNow } from 'date-fns';

/** Short timestamp for a chat bubble, e.g. "2:45 PM" */
export function formatMessageTime(date) {
  if (!date) return '';
  return format(new Date(date), 'h:mm a');
}

/** Friendly relative-or-absolute label for lists, e.g. "Today, 2:45 PM" */
export function formatConversationDate(date) {
  if (!date) return '—';
  const d = new Date(date);
  if (isToday(d)) return `Today, ${format(d, 'h:mm a')}`;
  if (isYesterday(d)) return `Yesterday, ${format(d, 'h:mm a')}`;
  return format(d, 'MMM d, yyyy · h:mm a');
}

/** "3 minutes ago" style label */
export function timeAgo(date) {
  if (!date) return '';
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}
