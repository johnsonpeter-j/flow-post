'use client';

import { useState } from 'react';
import { BarChart3, ArrowUpRight } from 'lucide-react';
import { useReduxData } from '@/hooks/useReduxData';
import ClientDropdown from '@/components/ClientDropdown';
import {
  MonthlyProgressCard,
  StatsRow,
  ChartsRow,
  PostAnalyticsTable,
  PostDetailCard,
  TopPerformingContent,
  PlatformBreakdown,
} from '@/components/analytics';
import type { AnalyticsData, PostAnalytics, WeeklyData } from '@/components/analytics';

export default function AnalyticsPage() {
  const { clients, contentBank } = useReduxData();
  const [filterClient, setFilterClient] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<PostAnalytics | null>(null);
  const [timeRange, setTimeRange] = useState('7days');

  // Mock analytics data (matching original structure)
  const analytics: Record<string, AnalyticsData> = {
    cb5: { views: 12400, likes: 892, shares: 156, comments: 45, reach: 28000, engagementRate: 7.2 },
    cb6: { views: 8500, likes: 645, shares: 89, comments: 32, reach: 18500, engagementRate: 6.8 },
    cb7: { views: 24600, likes: 1890, shares: 456, comments: 178, reach: 52000, engagementRate: 9.4 },
    cb8: { views: 5200, likes: 312, shares: 67, comments: 28, reach: 12000, engagementRate: 5.1 },
    cb9: { views: 3800, likes: 245, shares: 89, comments: 34, reach: 9500, engagementRate: 4.8 },
  };

  // Filter content by client
  const filteredContent = filterClient
    ? contentBank.filter((c) => c.clientId === filterClient)
    : contentBank;

  // This month stats
  const currentMonth = new Date(2025, 0, 1); // January 2025
  const thisMonthContent = filteredContent.filter((c) => {
    if (c.scheduledFor) {
      const date = new Date(c.scheduledFor);
      return date.getMonth() === currentMonth.getMonth() && date.getFullYear() === currentMonth.getFullYear();
    }
    return false;
  });
  const thisMonthPlanned = thisMonthContent.length;
  const thisMonthPosted = thisMonthContent.filter((c) => c.stage === 'posted').length;

  // Calculate totals
  const totalViews = Object.values(analytics).reduce((sum, a) => sum + a.views, 0);
  const totalLikes = Object.values(analytics).reduce((sum, a) => sum + a.likes, 0);
  const totalShares = Object.values(analytics).reduce((sum, a) => sum + a.shares, 0);
  const totalComments = Object.values(analytics).reduce((sum, a) => sum + a.comments, 0);
  const avgEngagement =
    Object.keys(analytics).length > 0
      ? Object.values(analytics).reduce((sum, a) => sum + a.engagementRate, 0) /
        Object.keys(analytics).length
      : 0;

  // Weekly data for charts
  const weeklyData: WeeklyData[] = [
    { day: 'Mon', views: 8200, engagement: 6.2, posts: 2 },
    { day: 'Tue', views: 12400, engagement: 7.8, posts: 1 },
    { day: 'Wed', views: 9800, engagement: 5.9, posts: 3 },
    { day: 'Thu', views: 15600, engagement: 8.4, posts: 2 },
    { day: 'Fri', views: 11200, engagement: 7.1, posts: 1 },
    { day: 'Sat', views: 18900, engagement: 9.2, posts: 2 },
    { day: 'Sun', views: 14300, engagement: 8.0, posts: 1 },
  ];

  // Mock post-level analytics
  const postAnalytics: PostAnalytics[] = [
    {
      id: 'cb5',
      clientId: 'c3',
      idea: 'Room makeover time-lapse',
      type: 'video',
      postedAt: '2025-01-15',
      platform: 'instagram',
      views: 12400,
      likes: 892,
      shares: 156,
      comments: 45,
      reach: 28000,
      engagementRate: 7.2,
      saves: 234,
    },
    {
      id: 'cb6',
      clientId: 'c1',
      idea: 'Morning brew ritual',
      type: 'photo',
      postedAt: '2025-01-14',
      platform: 'instagram',
      views: 8500,
      likes: 645,
      shares: 89,
      comments: 32,
      reach: 18500,
      engagementRate: 6.8,
      saves: 156,
    },
    {
      id: 'cb7',
      clientId: 'c2',
      idea: '5-minute workout challenge',
      type: 'reel',
      postedAt: '2025-01-13',
      platform: 'instagram',
      views: 24600,
      likes: 1890,
      shares: 456,
      comments: 178,
      reach: 52000,
      engagementRate: 9.4,
      saves: 890,
    },
    {
      id: 'cb8',
      clientId: 'c1',
      idea: 'New seasonal blend announcement',
      type: 'carousel',
      postedAt: '2025-01-12',
      platform: 'facebook',
      views: 5200,
      likes: 312,
      shares: 67,
      comments: 28,
      reach: 12000,
      engagementRate: 5.1,
      saves: 45,
    },
    {
      id: 'cb9',
      clientId: 'c3',
      idea: 'Design tips for small spaces',
      type: 'carousel',
      postedAt: '2025-01-10',
      platform: 'linkedin',
      views: 3800,
      likes: 245,
      shares: 89,
      comments: 34,
      reach: 9500,
      engagementRate: 4.8,
      saves: 178,
    },
  ];

  const filteredPostAnalytics = filterClient
    ? postAnalytics.filter((p) => p.clientId === filterClient)
    : postAnalytics;

  return (
    <div className="analytics-view flex-1 flex flex-col overflow-hidden">
      <div className="view-header flex justify-between items-center px-5 py-3 border-b border-[#E5E7EB] bg-white">
        <div className="view-title flex items-center gap-2">
          <BarChart3 size={20} className="text-[#111827]" />
          <span className="text-[0.85rem] font-semibold text-[#111827]">Analytics Overview</span>
        </div>
        <div className="view-actions flex items-center gap-3">
          <ClientDropdown clients={clients} selectedClient={filterClient} onSelect={setFilterClient} />
          <select
            className="time-select py-1.5 px-3 bg-white border border-[#E5E7EB] rounded-md text-[0.75rem] text-[#374151] font-inherit cursor-pointer"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
          </select>
          <button className="action-btn flex items-center gap-1.5 py-2 px-3 bg-white border border-[#E5E7EB] rounded-lg text-[0.85rem] text-[#374151] font-medium cursor-pointer hover:bg-[#F9FAFB] transition-colors">
            <ArrowUpRight size={16} />
            Export
          </button>
        </div>
      </div>

      <div className="analytics-grid flex-1 py-4 px-5 overflow-y-auto flex flex-col gap-4">
        <MonthlyProgressCard
          month="January 2025"
          planned={thisMonthPlanned}
          posted={thisMonthPosted}
        />

        <StatsRow
          totalViews={totalViews}
          totalLikes={totalLikes}
          totalShares={totalShares}
          totalComments={totalComments}
          avgEngagement={avgEngagement}
        />

        <ChartsRow weeklyData={weeklyData} />

        <PostAnalyticsTable
          posts={filteredPostAnalytics}
          clients={clients}
          selectedPost={selectedPost}
          onSelectPost={setSelectedPost}
        />

        {selectedPost && (
          <PostDetailCard post={selectedPost} clients={clients} onClose={() => setSelectedPost(null)} />
        )}

        <div className="content-row grid grid-cols-[1.5fr_1fr] gap-4">
          <TopPerformingContent posts={filteredPostAnalytics} clients={clients} />
          <PlatformBreakdown />
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
