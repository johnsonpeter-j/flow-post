'use client';

import { X, Eye, Users, Heart, MessageCircle, Share2, Target, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';
import type { PostAnalytics } from './types';
import type { Client } from '@/components/clients/types';

interface PostDetailCardProps {
  post: PostAnalytics;
  clients: Client[];
  onClose: () => void;
}

export default function PostDetailCard({ post, clients, onClose }: PostDetailCardProps) {
  const getClientColor = (clientId: string) => clients.find((c) => c.id === clientId)?.color || '#6B7280';
  const getClientName = (clientId: string) => clients.find((c) => c.id === clientId)?.name || 'Unknown';

  return (
    <div className="post-detail-card bg-white border border-[#E5E7EB] rounded-xl p-5 animate-[slideDown_0.2s_ease]">
      <div className="post-detail-header flex justify-between items-start mb-5 pb-4 border-b border-[#F3F4F6]">
        <div className="post-detail-info">
          <span
            className="post-client-tag large text-[0.7rem] font-semibold py-1 px-2.5 rounded-md inline-block mb-1.5"
            style={{
              background: `${getClientColor(post.clientId)}15`,
              color: getClientColor(post.clientId),
            }}
          >
            {getClientName(post.clientId)}
          </span>
          <h4 className="text-base font-semibold text-[#111827] my-1.5 mb-2">{post.idea}</h4>
          <div className="post-meta flex items-center gap-3">
            <span
              className={`platform-badge ${
                post.platform === 'instagram'
                  ? 'bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737]'
                  : post.platform === 'facebook'
                  ? 'bg-[#1877F2]'
                  : post.platform === 'linkedin'
                  ? 'bg-[#0A66C2]'
                  : post.platform === 'twitter'
                  ? 'bg-[#1DA1F2]'
                  : ''
              } text-white text-[0.7rem] font-medium py-1 px-2.5 rounded-md flex items-center gap-1.5`}
            >
              {post.platform === 'instagram' && <Instagram size={14} />}
              {post.platform === 'facebook' && <Facebook size={14} />}
              {post.platform === 'linkedin' && <Linkedin size={14} />}
              {post.platform === 'twitter' && <Twitter size={14} />}
              {post.platform}
            </span>
            <span className="post-date text-[0.8rem] text-[#6B7280]">
              {new Date(post.postedAt).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
        <button
          className="close-btn text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
          onClick={onClose}
        >
          <X size={18} />
        </button>
      </div>
      <div className="post-detail-stats grid grid-cols-6 gap-4">
        <div className="detail-stat flex items-center gap-3 p-3.5 bg-[#F9FAFB] rounded-[10px]">
          <Eye size={18} className="text-[#6B7280]" />
          <div>
            <span className="detail-stat-value text-[1.1rem] font-bold text-[#111827] block">
              {post.views.toLocaleString()}
            </span>
            <span className="detail-stat-label text-[0.7rem] text-[#6B7280]">Views</span>
          </div>
        </div>
        <div className="detail-stat flex items-center gap-3 p-3.5 bg-[#F9FAFB] rounded-[10px]">
          <Users size={18} className="text-[#6B7280]" />
          <div>
            <span className="detail-stat-value text-[1.1rem] font-bold text-[#111827] block">
              {post.reach.toLocaleString()}
            </span>
            <span className="detail-stat-label text-[0.7rem] text-[#6B7280]">Reach</span>
          </div>
        </div>
        <div className="detail-stat flex items-center gap-3 p-3.5 bg-[#F9FAFB] rounded-[10px]">
          <Heart size={18} className="text-[#6B7280]" />
          <div>
            <span className="detail-stat-value text-[1.1rem] font-bold text-[#111827] block">
              {post.likes.toLocaleString()}
            </span>
            <span className="detail-stat-label text-[0.7rem] text-[#6B7280]">Likes</span>
          </div>
        </div>
        <div className="detail-stat flex items-center gap-3 p-3.5 bg-[#F9FAFB] rounded-[10px]">
          <MessageCircle size={18} className="text-[#6B7280]" />
          <div>
            <span className="detail-stat-value text-[1.1rem] font-bold text-[#111827] block">
              {post.comments}
            </span>
            <span className="detail-stat-label text-[0.7rem] text-[#6B7280]">Comments</span>
          </div>
        </div>
        <div className="detail-stat flex items-center gap-3 p-3.5 bg-[#F9FAFB] rounded-[10px]">
          <Share2 size={18} className="text-[#6B7280]" />
          <div>
            <span className="detail-stat-value text-[1.1rem] font-bold text-[#111827] block">
              {post.shares}
            </span>
            <span className="detail-stat-label text-[0.7rem] text-[#6B7280]">Shares</span>
          </div>
        </div>
        <div className="detail-stat highlight flex items-center gap-3 p-3.5 bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] rounded-[10px]">
          <Target size={18} className="text-[#3B82F6]" />
          <div>
            <span className="detail-stat-value text-[1.1rem] font-bold text-[#111827] block">
              {post.engagementRate}%
            </span>
            <span className="detail-stat-label text-[0.7rem] text-[#6B7280]">Engagement</span>
          </div>
        </div>
      </div>
    </div>
  );
}





