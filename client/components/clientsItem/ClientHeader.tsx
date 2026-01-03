import { Globe, Mail } from 'lucide-react';
import type { Client } from '../clients/types';

interface ClientHeaderProps {
  client: Client;
  briefsCount: number;
  contentCount: number;
  publishedCount: number;
}

export default function ClientHeader({
  client,
  briefsCount,
  contentCount,
  publishedCount,
}: ClientHeaderProps) {
  return (
    <div className="bg-white border-b border-[#E5E7EB] p-6 flex justify-between items-start">
      <div className="flex gap-5">
        <div
          className="w-18 h-18 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shrink-0"
          style={{ background: client.color }}
        >
          {client.logo}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#111827] mb-1">{client.name}</h1>
          <span className="text-[0.7rem] bg-[#F3F4F6] text-[#6B7280] py-1 px-2.5 rounded-xl font-medium">
            {client.industry}
          </span>
          <p className="text-[0.85rem] text-[#6B7280] mt-2 max-w-md leading-relaxed">
            {client.description}
          </p>
          <div className="flex gap-4 mt-3">
            <a
              href="#"
              className="text-[0.75rem] text-[#6B7280] no-underline flex items-center gap-1 hover:text-[#111827] transition-colors"
            >
              <Globe size={14} />
              {client.website}
            </a>
            <a
              href="#"
              className="text-[0.75rem] text-[#6B7280] no-underline flex items-center gap-1 hover:text-[#111827] transition-colors"
            >
              <Mail size={14} />
              {client.contact}
            </a>
          </div>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="text-center">
          <span className="text-[1.75rem] font-bold text-[#111827] block">{briefsCount}</span>
          <span className="text-[0.65rem] text-[#9CA3AF] uppercase">Briefs</span>
        </div>
        <div className="text-center">
          <span className="text-[1.75rem] font-bold text-[#111827] block">{contentCount}</span>
          <span className="text-[0.65rem] text-[#9CA3AF] uppercase">Content</span>
        </div>
        <div className="text-center">
          <span className="text-[1.75rem] font-bold text-[#111827] block">{publishedCount}</span>
          <span className="text-[0.65rem] text-[#9CA3AF] uppercase">Published</span>
        </div>
      </div>
    </div>
  );
}






