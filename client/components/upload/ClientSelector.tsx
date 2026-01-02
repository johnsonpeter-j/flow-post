'use client';

import type { Client } from '@/components/clients/types';

interface ClientSelectorProps {
  clients: Client[];
  selectedClient: string;
  onClientChange: (clientId: string) => void;
}

export default function ClientSelector({ clients, selectedClient, onClientChange }: ClientSelectorProps) {
  return (
    <div className="option-card bg-white border border-[#E5E7EB] rounded-xl p-4">
      <h4 className="text-[0.8rem] font-semibold text-[#374151] mb-3">Select Client</h4>
      <div className="client-selector flex flex-wrap gap-2">
        {clients.map((client) => (
          <button
            key={client.id}
            className={`client-select-btn flex items-center gap-2 py-2 px-3 rounded-lg text-[0.75rem] font-medium cursor-pointer transition-all ${
              selectedClient === client.id
                ? 'border-2'
                : 'bg-[#F9FAFB] border border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB]'
            }`}
            style={
              selectedClient === client.id
                ? { borderColor: client.color, background: `${client.color}10`, color: client.color }
                : {}
            }
            onClick={() => onClientChange(client.id)}
          >
            <span className="client-select-dot w-2 h-2 rounded-full" style={{ background: client.color }} />
            {client.name}
          </button>
        ))}
      </div>
    </div>
  );
}


