import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { formatConversationDate } from '../../utils/formatDate';

export default function ConversationRow({ conversation, onPreview }) {
  const visitor = conversation.visitorId || {};

  return (
    <tr className="border-b border-ink-100 dark:border-white/5 hover:bg-violet-50/50 dark:hover:bg-white/5 transition-colors">
      <td className="px-4 py-3.5">
        <p className="font-medium text-sm">{visitor.name || 'Anonymous'}</p>
        <p className="text-xs text-ink-400">{visitor.profession || '—'}</p>
      </td>
      <td className="px-4 py-3.5 text-sm text-ink-500 dark:text-ink-300 max-w-xs truncate">
        {visitor.goal || '—'}
      </td>
      <td className="px-4 py-3.5 text-sm text-ink-500 dark:text-ink-300 whitespace-nowrap">
        {formatConversationDate(conversation.createdAt)}
      </td>
      <td className="px-4 py-3.5 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => onPreview(conversation)}
            className="p-2 rounded-lg hover:bg-violet-100 dark:hover:bg-white/10 text-violet-600 dark:text-violet-300"
            aria-label="Quick preview"
          >
            <Eye className="w-4 h-4" />
          </button>
          <Link
            to={`/admin/conversations/${conversation._id}`}
            className="text-xs font-semibold text-violet-600 dark:text-violet-300 hover:underline"
          >
            View transcript
          </Link>
        </div>
      </td>
    </tr>
  );
}
