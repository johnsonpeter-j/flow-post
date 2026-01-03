'use client';

import { useState, useRef, useEffect } from 'react';
import { Building2, ChevronDown, Search } from 'lucide-react';
import type { Client } from '@/components/clients/types';

interface ClientDropdownProps {
  clients: Client[];
  selectedClient: string | null;
  onSelect: (clientId: string | null) => void;
  placeholder?: string;
}

export default function ClientDropdown({
  clients,
  selectedClient,
  onSelect,
  placeholder = 'All Clients',
}: ClientDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedClientData = clients.find((c) => c.id === selectedClient);

  return (
    <div className="client-dropdown relative" ref={dropdownRef}>
      <button
        className="dropdown-trigger flex items-center gap-2 py-2 px-3 bg-white border border-[#E5E7EB] rounded-lg text-[0.8rem] text-[#374151] cursor-pointer font-inherit min-w-[160px] hover:border-[#D1D5DB] hover:bg-[#F9FAFB]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedClientData ? (
          <>
            <span
              className="dropdown-dot w-2 h-2 rounded-full shrink-0"
              style={{ background: selectedClientData.color }}
            />
            <span className="dropdown-text flex-1 text-left">{selectedClientData.name}</span>
          </>
        ) : (
          <>
            <Building2 size={14} />
            <span className="dropdown-text flex-1 text-left">{placeholder}</span>
          </>
        )}
        <ChevronDown
          size={14}
          className={`dropdown-chevron text-[#9CA3AF] transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="dropdown-menu absolute top-[calc(100%+4px)] left-0 right-0 bg-white border border-[#E5E7EB] rounded-[10px] shadow-[0_10px_40px_rgba(0,0,0,0.12)] z-[100] overflow-hidden min-w-[220px]">
          <div className="dropdown-search flex items-center gap-2 p-2 border-b border-[#E5E7EB]">
            <Search size={14} className="text-[#9CA3AF] shrink-0" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="flex-1 border-none outline-none text-[0.8rem] text-[#111827] font-inherit bg-transparent placeholder:text-[#9CA3AF]"
            />
          </div>
          <div className="dropdown-options max-h-[240px] overflow-y-auto p-1">
            <div
              className={`dropdown-option flex items-center gap-2.5 py-2.5 px-3 rounded-md cursor-pointer transition-all ${
                !selectedClient ? 'bg-[#EFF6FF]' : 'hover:bg-[#F3F4F6]'
              }`}
              onClick={() => {
                onSelect(null);
                setIsOpen(false);
                setSearchQuery('');
              }}
            >
              <Building2 size={14} />
              <span className="text-[0.8rem] text-[#374151]">All Clients</span>
            </div>
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className={`dropdown-option flex items-center gap-2.5 py-2.5 px-3 rounded-md cursor-pointer transition-all ${
                  selectedClient === client.id ? 'bg-[#EFF6FF]' : 'hover:bg-[#F3F4F6]'
                }`}
                onClick={() => {
                  onSelect(client.id);
                  setIsOpen(false);
                  setSearchQuery('');
                }}
              >
                <span
                  className="dropdown-dot w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: client.color }}
                />
                <span className="text-[0.8rem] text-[#374151] flex-1">{client.name}</span>
                <span className="dropdown-industry text-[#9CA3AF] text-[0.7rem] ml-auto">
                  {client.industry}
                </span>
              </div>
            ))}
            {filteredClients.length === 0 && (
              <div className="dropdown-empty py-5 text-center text-[0.8rem] text-[#9CA3AF]">
                No clients found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}





