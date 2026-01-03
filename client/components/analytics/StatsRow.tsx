'use client';

import { Eye, Heart, Share2, MessageCircle, Target, TrendingUp } from 'lucide-react';

interface StatsRowProps {
  totalViews: number;
  totalLikes: number;
  totalShares: number;
  totalComments: number;
  avgEngagement: number;
}

export default function StatsRow({
  totalViews,
  totalLikes,
  totalShares,
  totalComments,
  avgEngagement,
}: StatsRowProps) {
  return (
    <div className="stats-row grid grid-cols-5 gap-3 mb-1">
      <div className="stat-card large bg-white border border-[#E5E7EB] rounded-[10px] p-3.5 flex flex-col gap-2.5">
        <div className="stat-icon w-9 h-9 bg-[#F3F4F6] rounded-lg flex items-center justify-center text-[#6B7280]">
          <Eye size={20} />
        </div>
        <div className="stat-info">
          <span className="stat-value text-2xl font-bold text-[#111827] block">
            {(totalViews / 1000).toFixed(1)}K
          </span>
          <span className="stat-label text-[0.7rem] text-[#6B7280]">Total Views</span>
        </div>
        <div className="stat-trend up flex items-center gap-1 text-[0.7rem] font-semibold text-[#059669]">
          <TrendingUp size={14} />
          +12.5%
        </div>
      </div>
      <div className="stat-card large bg-white border border-[#E5E7EB] rounded-[10px] p-3.5 flex flex-col gap-2.5">
        <div className="stat-icon w-9 h-9 bg-[#F3F4F6] rounded-lg flex items-center justify-center text-[#6B7280]">
          <Heart size={20} />
        </div>
        <div className="stat-info">
          <span className="stat-value text-2xl font-bold text-[#111827] block">
            {(totalLikes / 1000).toFixed(1)}K
          </span>
          <span className="stat-label text-[0.7rem] text-[#6B7280]">Total Likes</span>
        </div>
        <div className="stat-trend up flex items-center gap-1 text-[0.7rem] font-semibold text-[#059669]">
          <TrendingUp size={14} />
          +8.3%
        </div>
      </div>
      <div className="stat-card large bg-white border border-[#E5E7EB] rounded-[10px] p-3.5 flex flex-col gap-2.5">
        <div className="stat-icon w-9 h-9 bg-[#F3F4F6] rounded-lg flex items-center justify-center text-[#6B7280]">
          <Share2 size={20} />
        </div>
        <div className="stat-info">
          <span className="stat-value text-2xl font-bold text-[#111827] block">{totalShares}</span>
          <span className="stat-label text-[0.7rem] text-[#6B7280]">Shares</span>
        </div>
        <div className="stat-trend up flex items-center gap-1 text-[0.7rem] font-semibold text-[#059669]">
          <TrendingUp size={14} />
          +24.1%
        </div>
      </div>
      <div className="stat-card large bg-white border border-[#E5E7EB] rounded-[10px] p-3.5 flex flex-col gap-2.5">
        <div className="stat-icon w-9 h-9 bg-[#F3F4F6] rounded-lg flex items-center justify-center text-[#6B7280]">
          <MessageCircle size={20} />
        </div>
        <div className="stat-info">
          <span className="stat-value text-2xl font-bold text-[#111827] block">{totalComments}</span>
          <span className="stat-label text-[0.7rem] text-[#6B7280]">Comments</span>
        </div>
        <div className="stat-trend up flex items-center gap-1 text-[0.7rem] font-semibold text-[#059669]">
          <TrendingUp size={14} />
          +15.7%
        </div>
      </div>
      <div className="stat-card large highlight bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] border border-[#BAE6FD] rounded-[10px] p-3.5 flex flex-col gap-2.5">
        <div className="stat-icon w-9 h-9 bg-white rounded-lg flex items-center justify-center text-[#0284C7]">
          <Target size={20} />
        </div>
        <div className="stat-info">
          <span className="stat-value text-2xl font-bold text-[#111827] block">
            {avgEngagement.toFixed(1)}%
          </span>
          <span className="stat-label text-[0.7rem] text-[#6B7280]">Avg. Engagement</span>
        </div>
        <div className="stat-trend up flex items-center gap-1 text-[0.7rem] font-semibold text-[#059669]">
          <TrendingUp size={14} />
          +3.2%
        </div>
      </div>
    </div>
  );
}





