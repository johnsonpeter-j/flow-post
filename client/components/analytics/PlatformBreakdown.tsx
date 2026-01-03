'use client';

import { Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';

export default function PlatformBreakdown() {
  return (
    <div className="content-card bg-white border border-[#E5E7EB] rounded-[10px] p-4">
      <h3 className="text-[0.85rem] font-semibold text-[#111827] mb-3.5">Platform Breakdown</h3>
      <div className="platform-list flex flex-col gap-2.5">
        <div className="platform-item flex items-center gap-2.5 p-2.5 bg-[#FAFAFA] rounded-lg">
          <div className="platform-icon instagram w-8 h-8 rounded-lg flex items-center justify-center text-white bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737]">
            <Instagram size={18} />
          </div>
          <div className="platform-info flex-1">
            <span className="platform-name text-[0.8rem] font-semibold text-[#111827] block">
              Instagram
            </span>
            <span className="platform-posts text-[0.65rem] text-[#9CA3AF]">8 posts</span>
          </div>
          <div className="platform-stats text-right">
            <span className="platform-reach text-[0.75rem] font-semibold text-[#374151] block">52K reach</span>
            <span className="platform-engagement text-[0.65rem] text-[#6B7280]">7.8% eng.</span>
          </div>
        </div>
        <div className="platform-item flex items-center gap-2.5 p-2.5 bg-[#FAFAFA] rounded-lg">
          <div className="platform-icon facebook w-8 h-8 rounded-lg flex items-center justify-center text-white bg-[#1877F2]">
            <Facebook size={18} />
          </div>
          <div className="platform-info flex-1">
            <span className="platform-name text-[0.8rem] font-semibold text-[#111827] block">Facebook</span>
            <span className="platform-posts text-[0.65rem] text-[#9CA3AF]">6 posts</span>
          </div>
          <div className="platform-stats text-right">
            <span className="platform-reach text-[0.75rem] font-semibold text-[#374151] block">38K reach</span>
            <span className="platform-engagement text-[0.65rem] text-[#6B7280]">5.2% eng.</span>
          </div>
        </div>
        <div className="platform-item flex items-center gap-2.5 p-2.5 bg-[#FAFAFA] rounded-lg">
          <div className="platform-icon linkedin w-8 h-8 rounded-lg flex items-center justify-center text-white bg-[#0A66C2]">
            <Linkedin size={18} />
          </div>
          <div className="platform-info flex-1">
            <span className="platform-name text-[0.8rem] font-semibold text-[#111827] block">LinkedIn</span>
            <span className="platform-posts text-[0.65rem] text-[#9CA3AF]">3 posts</span>
          </div>
          <div className="platform-stats text-right">
            <span className="platform-reach text-[0.75rem] font-semibold text-[#374151] block">12K reach</span>
            <span className="platform-engagement text-[0.65rem] text-[#6B7280]">4.1% eng.</span>
          </div>
        </div>
        <div className="platform-item flex items-center gap-2.5 p-2.5 bg-[#FAFAFA] rounded-lg">
          <div className="platform-icon twitter w-8 h-8 rounded-lg flex items-center justify-center text-white bg-[#1DA1F2]">
            <Twitter size={18} />
          </div>
          <div className="platform-info flex-1">
            <span className="platform-name text-[0.8rem] font-semibold text-[#111827] block">Twitter</span>
            <span className="platform-posts text-[0.65rem] text-[#9CA3AF]">4 posts</span>
          </div>
          <div className="platform-stats text-right">
            <span className="platform-reach text-[0.75rem] font-semibold text-[#374151] block">15K reach</span>
            <span className="platform-engagement text-[0.65rem] text-[#6B7280]">3.8% eng.</span>
          </div>
        </div>
      </div>
    </div>
  );
}





