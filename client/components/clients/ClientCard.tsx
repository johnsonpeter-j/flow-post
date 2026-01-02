import Link from 'next/link';
import { Globe } from 'lucide-react';
import type { Client, ClientStats } from './types';

interface ClientCardProps {
  client: Client;
  stats: ClientStats;
}

export default function ClientCard({ client, stats }: ClientCardProps) {
  return (
    <Link
      href={`/clients/${client.id}`}
      className="bg-white border border-[#E5E7EB] rounded-xl p-5 cursor-pointer transition-all duration-150 hover:border-[#D1D5DB] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5"
    >
      <div className="flex gap-3.5 mb-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base shrink-0"
          style={{ background: client.color }}
        >
          {client.logo}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-[#111827] mb-0.5">
            {client.name}
          </h3>
          <span className="text-[0.7rem] text-[#6B7280] bg-[#F3F4F6] py-0.5 px-2 rounded-lg">
            {client.industry}
          </span>
        </div>
      </div>
      <p className="text-[0.8rem] text-[#6B7280] leading-relaxed mb-4 line-clamp-2">
        {client.description}
      </p>
      <div className="flex gap-5 py-3 border-t border-b border-[#F3F4F6] mb-3">
        <div className="text-center flex-1">
          <span className="text-[1.25rem] font-bold text-[#111827] block">
            {stats.briefs}
          </span>
          <span className="text-[0.65rem] text-[#9CA3AF]">Briefs</span>
        </div>
        <div className="text-center flex-1">
          <span className="text-[1.25rem] font-bold text-[#111827] block">
            {stats.content}
          </span>
          <span className="text-[0.65rem] text-[#9CA3AF]">Content</span>
        </div>
        <div className="text-center flex-1">
          <span className="text-[1.25rem] font-bold text-[#111827] block">
            {stats.posted}
          </span>
          <span className="text-[0.65rem] text-[#9CA3AF]">Posted</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-[0.75rem] text-[#6B7280] hover:text-[#111827] transition-colors">
        <Globe size={12} />
        <span>{client.website}</span>
      </div>
    </Link>
  );
}



