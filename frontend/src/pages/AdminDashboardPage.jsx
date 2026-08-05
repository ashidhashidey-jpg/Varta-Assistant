import { useEffect, useState } from 'react';
import { Users, MessagesSquare, MessageCircle, BarChart3 } from 'lucide-react';
import AnalyticsCard from '../components/admin/AnalyticsCard';
import { ProfessionBarChart, ProfessionPieChart } from '../components/admin/ProfessionChart';
import { CardSkeleton } from '../components/ui/LoadingSkeleton';
import { fetchAnalytics } from '../services/adminService';
import { notifyApiError } from '../services/api';

export default function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setIsLoading(true);
      try {
        const data = await fetchAnalytics();
        if (!cancelled) setAnalytics(data);
      } catch (error) {
        if (!cancelled) notifyApiError(error, 'Could not load analytics.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <p className="label-text mb-1">Overview</p>
        <h1 className="text-2xl sm:text-3xl font-display font-bold">Analytics dashboard</h1>
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-3 gap-5">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : (
        <div className="grid sm:grid-cols-3 gap-5">
          <AnalyticsCard icon={Users} label="Total visitors" value={analytics?.totalVisitors ?? 0} accent="violet" delay={0} />
          <AnalyticsCard icon={MessagesSquare} label="Total conversations" value={analytics?.totalConversations ?? 0} accent="bloom" delay={0.06} />
          <AnalyticsCard icon={MessageCircle} label="Total messages" value={analytics?.totalMessages ?? 0} accent="sky" delay={0.12} />
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-violet-500" />
            <h2 className="font-semibold">Visitors by profession</h2>
          </div>
          {isLoading ? <CardSkeleton /> : <ProfessionBarChart data={analytics?.professionBreakdown} />}
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-bloom-500" />
            <h2 className="font-semibold">Profession breakdown</h2>
          </div>
          {isLoading ? <CardSkeleton /> : <ProfessionPieChart data={analytics?.professionBreakdown} />}
        </div>
      </div>
    </div>
  );
}
