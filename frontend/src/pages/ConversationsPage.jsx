import { useEffect, useMemo, useState } from 'react';
import { MessagesSquare, ArrowUpDown } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar';
import Pagination from '../components/ui/Pagination';
import EmptyState from '../components/ui/EmptyState';
import Modal from '../components/ui/Modal';
import ConversationRow from '../components/admin/ConversationRow';
import { TableRowSkeleton } from '../components/ui/LoadingSkeleton';
import { fetchConversations } from '../services/adminService';
import { notifyApiError } from '../services/api';
import { formatConversationDate } from '../utils/formatDate';

const PAGE_SIZE = 8;

export default function ConversationsPage() {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [professionFilter, setProfessionFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [page, setPage] = useState(1);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setIsLoading(true);
      try {
        const data = await fetchConversations();
        if (!cancelled) setConversations(data);
      } catch (error) {
        if (!cancelled) notifyApiError(error, 'Could not load conversations.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const professions = useMemo(() => {
    const set = new Set(conversations.map((c) => c.visitorId?.profession).filter(Boolean));
    return ['all', ...set];
  }, [conversations]);

  const filtered = useMemo(() => {
    let list = [...conversations];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((c) => {
        const v = c.visitorId || {};
        return (
          v.name?.toLowerCase().includes(q) ||
          v.goal?.toLowerCase().includes(q) ||
          v.profession?.toLowerCase().includes(q)
        );
      });
    }

    if (professionFilter !== 'all') {
      list = list.filter((c) => c.visitorId?.profession === professionFilter);
    }

    list.sort((a, b) => {
      const diff = new Date(a.createdAt) - new Date(b.createdAt);
      return sortOrder === 'newest' ? -diff : diff;
    });

    return list;
  }, [conversations, search, professionFilter, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [search, professionFilter, sortOrder]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="label-text mb-1">All sessions</p>
          <h1 className="text-2xl sm:text-3xl font-display font-bold">Conversations</h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <SearchBar value={search} onChange={setSearch} placeholder="Search name, goal, profession…" />

          <select
            value={professionFilter}
            onChange={(e) => setProfessionFilter(e.target.value)}
            className="input-field !w-auto pr-8"
          >
            {professions.map((p) => (
              <option key={p} value={p}>
                {p === 'all' ? 'All professions' : p}
              </option>
            ))}
          </select>

          <button
            onClick={() => setSortOrder((o) => (o === 'newest' ? 'oldest' : 'newest'))}
            className="btn-secondary !px-4 !py-2.5 text-sm"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            {sortOrder === 'newest' ? 'Newest first' : 'Oldest first'}
          </button>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-ink-100 dark:border-white/10 text-xs uppercase tracking-wide text-ink-400">
                <th className="px-4 py-3 font-semibold">Visitor</th>
                <th className="px-4 py-3 font-semibold">Goal</th>
                <th className="px-4 py-3 font-semibold">Started</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} columns={4} />)
              ) : pageItems.length > 0 ? (
                pageItems.map((c) => (
                  <ConversationRow key={c._id} conversation={c} onPreview={setPreview} />
                ))
              ) : null}
            </tbody>
          </table>
        </div>

        {!isLoading && pageItems.length === 0 && (
          <EmptyState
            icon={MessagesSquare}
            title="No conversations match"
            description="Try a different search term or clear the profession filter."
          />
        )}
      </div>

      {!isLoading && filtered.length > 0 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      )}

      <Modal isOpen={Boolean(preview)} onClose={() => setPreview(null)} title="Quick preview">
        {preview && (
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-ink-400">Visitor</span>
              <span className="font-medium">{preview.visitorId?.name || 'Anonymous'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-400">Profession</span>
              <span className="font-medium">{preview.visitorId?.profession || '—'}</span>
            </div>
            <div className="flex items-start justify-between gap-3">
              <span className="text-ink-400 shrink-0">Goal</span>
              <span className="font-medium text-right">{preview.visitorId?.goal || '—'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-400">Started</span>
              <span className="font-medium">{formatConversationDate(preview.createdAt)}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
