'use client';

import { Layers } from 'lucide-react';
import ClientDropdown from '@/components/ClientDropdown';
import type { Client } from '@/components/clients/types';

interface PipelineHeaderProps {
  clients: Client[];
  filterClient: string | null;
  onFilterChange: (clientId: string | null) => void;
}

export default function PipelineHeader({
  clients,
  filterClient,
  onFilterChange,
}: PipelineHeaderProps) {
  return (
    <div className="view-header flex justify-between items-center px-5 py-3 border-b border-[#E5E7EB] bg-white">
      <div className="view-title flex items-center gap-2">
        <Layers size={20} className="text-[#111827]" />
        <span className="text-[0.85rem] font-semibold text-[#111827]">Pipeline</span>
      </div>
      <div className="view-actions">
        <ClientDropdown clients={clients} selectedClient={filterClient} onSelect={onFilterChange} />
      </div>
    </div>
  );
}


