'use client';

import { Video, Image, Eye, Heart, MessageCircle } from 'lucide-react';
import type { PostAnalytics } from './types';
import type { Client } from '@/components/clients/types';

interface TopPerformingContentProps {
  posts: PostAnalytics[];
  clients: Client[];
}

export default function TopPerformingContent({ posts, clients }: TopPerformingContentProps) {
  const getClientColor = (clientId: string) => clients.find((c) => c.id === clientId)?.color || '#6B7280';
  const getClientName = (clientId: string) => clients.find((c) => c.id === clientId)?.name || 'Unknown';

  return (
    <div className="content-card bg-white border border-[#E5E7EB] rounded-[10px] p-4">
      <h3 className="text-[0.85rem] font-semibold text-[#111827] mb-3.5">Top Performing Content</h3>
      <div className="top-content-list flex flex-col gap-2.5">
        {posts.slice(0, 3).map((post) => (
          <div key={post.id} className="top-content-item flex gap-3 p-2.5 bg-[#FAFAFA] rounded-lg">
            <div className="content-preview w-11 h-11 bg-[#E5E7EB] rounded-lg flex items-center justify-center text-[#6B7280] shrink-0">
              {post.type === 'video' || post.type === 'reel' ? (
                <Video size={20} />
              ) : (
                <Image size={20} />
              )}
            </div>
            <div className="content-details flex-1 min-w-0">
              <span
                className="content-client text-[0.6rem] font-semibold uppercase block"
                style={{ color: getClientColor(post.clientId) }}
              >
                {getClientName(post.clientId)}
              </span>
              <p className="content-title text-[0.8rem] text-[#374151] mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                {post.idea}
              </p>
              <div className="content-metrics flex gap-3 mt-1.5">
                <span className="flex items-center gap-0.75 text-[0.65rem] text-[#6B7280]">
                  <Eye size={12} /> {(post.views / 1000).toFixed(1)}K
                </span>
                <span className="flex items-center gap-0.75 text-[0.65rem] text-[#6B7280]">
                  <Heart size={12} /> {post.likes}
                </span>
                <span className="flex items-center gap-0.75 text-[0.65rem] text-[#6B7280]">
                  <MessageCircle size={12} /> {post.comments}
                </span>
              </div>
            </div>
            <div className="content-engagement flex flex-col items-end justify-center">
              <span className="engagement-rate text-[1.1rem] font-bold text-[#111827]">
                {post.engagementRate}%
              </span>
              <span className="engagement-label text-[0.6rem] text-[#9CA3AF]">engagement</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}





