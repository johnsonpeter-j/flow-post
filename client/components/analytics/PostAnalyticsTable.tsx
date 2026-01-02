'use client';

import { Video, Camera, Layers, Play, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';
import type { PostAnalytics } from './types';
import type { Client } from '@/components/clients/types';

interface PostAnalyticsTableProps {
  posts: PostAnalytics[];
  clients: Client[];
  selectedPost: PostAnalytics | null;
  onSelectPost: (post: PostAnalytics | null) => void;
}

export default function PostAnalyticsTable({
  posts,
  clients,
  selectedPost,
  onSelectPost,
}: PostAnalyticsTableProps) {
  const getClientColor = (clientId: string) => clients.find((c) => c.id === clientId)?.color || '#6B7280';
  const getClientName = (clientId: string) => clients.find((c) => c.id === clientId)?.name || 'Unknown';

  return (
    <div className="post-analytics-section bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
      <div className="section-header flex justify-between items-center py-4 px-5 border-b border-[#E5E7EB]">
        <h3 className="text-[0.95rem] font-semibold text-[#111827]">Post Performance</h3>
        <span className="post-count text-[0.75rem] text-[#6B7280] bg-[#F3F4F6] py-1 px-2.5 rounded-xl">
          {posts.length} posts
        </span>
      </div>
      <div className="post-analytics-table overflow-x-auto">
        <div className="post-table-header grid grid-cols-[2fr_80px_80px_70px_70px_70px_70px_70px_90px] gap-2 py-3 px-4 bg-[#F9FAFB] border-b border-[#E5E7EB] text-[0.65rem] font-semibold text-[#6B7280] uppercase">
          <div className="col-post">Post</div>
          <div className="col-platform">Platform</div>
          <div className="col-date">Date</div>
          <div className="col-metric">Views</div>
          <div className="col-metric">Likes</div>
          <div className="col-metric">Comments</div>
          <div className="col-metric">Shares</div>
          <div className="col-metric">Saves</div>
          <div className="col-engagement">Engagement</div>
        </div>
        {posts.map((post) => (
          <div
            key={post.id}
            className={`post-table-row grid grid-cols-[2fr_80px_80px_70px_70px_70px_70px_70px_90px] gap-2 py-3 px-4 border-b border-[#F3F4F6] items-center cursor-pointer transition-all hover:bg-[#F9FAFB] ${
              selectedPost?.id === post.id ? 'selected bg-[#EFF6FF]' : ''
            }`}
            onClick={() => onSelectPost(selectedPost?.id === post.id ? null : post)}
          >
            <div className="col-post flex items-center gap-2.5">
              <div className="post-type-icon w-9 h-9 bg-[#F3F4F6] rounded-lg flex items-center justify-center text-[#6B7280] shrink-0">
                {post.type === 'video' && <Video size={16} />}
                {post.type === 'photo' && <Camera size={16} />}
                {post.type === 'carousel' && <Layers size={16} />}
                {post.type === 'reel' && <Play size={16} />}
              </div>
              <div className="post-info min-w-0">
                <span
                  className="post-client-tag text-[0.6rem] font-semibold py-0.5 px-1.5 rounded inline-block mb-0.5"
                  style={{
                    background: `${getClientColor(post.clientId)}15`,
                    color: getClientColor(post.clientId),
                  }}
                >
                  {getClientName(post.clientId)}
                </span>
                <span className="post-idea text-[0.8rem] text-[#374151] whitespace-nowrap overflow-hidden text-ellipsis block">
                  {post.idea}
                </span>
              </div>
            </div>
            <div className="col-platform">
              <div
                className={`platform-badge w-7 h-7 rounded-md flex items-center justify-center text-white ${
                  post.platform === 'instagram'
                    ? 'bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737]'
                    : post.platform === 'facebook'
                    ? 'bg-[#1877F2]'
                    : post.platform === 'linkedin'
                    ? 'bg-[#0A66C2]'
                    : post.platform === 'twitter'
                    ? 'bg-[#1DA1F2]'
                    : ''
                }`}
              >
                {post.platform === 'instagram' && <Instagram size={14} />}
                {post.platform === 'facebook' && <Facebook size={14} />}
                {post.platform === 'linkedin' && <Linkedin size={14} />}
                {post.platform === 'twitter' && <Twitter size={14} />}
              </div>
            </div>
            <div className="col-date text-[0.75rem] text-[#6B7280]">
              {new Date(post.postedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
            <div className="col-metric text-[0.8rem] font-medium text-[#374151]">
              {(post.views / 1000).toFixed(1)}K
            </div>
            <div className="col-metric text-[0.8rem] font-medium text-[#374151]">
              {post.likes.toLocaleString()}
            </div>
            <div className="col-metric text-[0.8rem] font-medium text-[#374151]">{post.comments}</div>
            <div className="col-metric text-[0.8rem] font-medium text-[#374151]">{post.shares}</div>
            <div className="col-metric text-[0.8rem] font-medium text-[#374151]">{post.saves}</div>
            <div className="col-engagement">
              <span
                className={`engagement-badge text-[0.75rem] font-semibold py-1 px-2.5 rounded-xl ${
                  post.engagementRate >= 7
                    ? 'bg-[#D1FAE5] text-[#059669]'
                    : post.engagementRate >= 5
                    ? 'bg-[#FEF3C7] text-[#D97706]'
                    : 'bg-[#FEE2E2] text-[#DC2626]'
                }`}
              >
                {post.engagementRate}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


