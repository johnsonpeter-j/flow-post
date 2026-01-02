import { X, Check } from 'lucide-react';
import { colorOptions } from './constants';
import type { NewClient } from './types';

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  newClient: NewClient;
  onClientChange: (client: NewClient) => void;
  onSave: () => void;
  isLoading?: boolean;
  validationErrors?: Record<string, string>;
  apiError?: string | null;
}

export default function AddClientModal({
  isOpen,
  onClose,
  newClient,
  onClientChange,
  onSave,
  isLoading = false,
  validationErrors = {},
  apiError = null,
}: AddClientModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-[90%] max-w-[500px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 px-6 border-b border-[#E5E7EB] flex justify-between items-center">
          <h3 className="text-[1.1rem] font-semibold text-[#111827]">
            Add New Client
          </h3>
          <button
            className="bg-transparent border-none text-[#9CA3AF] cursor-pointer p-1 hover:text-[#6B7280] transition-colors"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          {apiError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{apiError}</p>
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.75rem] font-semibold text-[#374151] uppercase tracking-wide">
              Client Name *
            </label>
            <input
              type="text"
              placeholder="Enter client name"
              value={newClient.name}
              onChange={(e) =>
                onClientChange({ ...newClient, name: e.target.value })
              }
              className={`py-2.5 px-3 border rounded-lg text-[0.85rem] text-[#111827] focus:outline-none placeholder:text-[#9CA3AF] ${
                validationErrors.name
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-[#E5E7EB] focus:border-[#9CA3AF]'
              }`}
            />
            {validationErrors.name && (
              <p className="text-xs text-red-600 mt-0.5">{validationErrors.name}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.75rem] font-semibold text-[#374151] uppercase tracking-wide">
              Industry *
            </label>
            <input
              type="text"
              placeholder="e.g., Fitness App, Coffee Shop"
              value={newClient.industry}
              onChange={(e) =>
                onClientChange({ ...newClient, industry: e.target.value })
              }
              className={`py-2.5 px-3 border rounded-lg text-[0.85rem] text-[#111827] focus:outline-none placeholder:text-[#9CA3AF] ${
                validationErrors.industry
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-[#E5E7EB] focus:border-[#9CA3AF]'
              }`}
            />
            {validationErrors.industry && (
              <p className="text-xs text-red-600 mt-0.5">{validationErrors.industry}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.75rem] font-semibold text-[#374151] uppercase tracking-wide">
              Description
            </label>
            <textarea
              placeholder="Brief description of the client"
              value={newClient.description}
              onChange={(e) =>
                onClientChange({ ...newClient, description: e.target.value })
              }
              rows={3}
              className="py-2.5 px-3 border border-[#E5E7EB] rounded-lg text-[0.85rem] text-[#111827] focus:outline-none focus:border-[#9CA3AF] placeholder:text-[#9CA3AF] resize-none"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-[0.75rem] font-semibold text-[#374151] uppercase tracking-wide">
                Website
              </label>
              <input
                type="text"
                placeholder="example.com"
                value={newClient.website}
                onChange={(e) =>
                  onClientChange({ ...newClient, website: e.target.value })
                }
                className={`py-2.5 px-3 border rounded-lg text-[0.85rem] text-[#111827] focus:outline-none placeholder:text-[#9CA3AF] ${
                  validationErrors.website
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-[#E5E7EB] focus:border-[#9CA3AF]'
                }`}
              />
              {validationErrors.website && (
                <p className="text-xs text-red-600 mt-0.5">{validationErrors.website}</p>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-[0.75rem] font-semibold text-[#374151] uppercase tracking-wide">
                Contact Email *
              </label>
              <input
                type="email"
                placeholder="contact@example.com"
                value={newClient.contact}
                onChange={(e) =>
                  onClientChange({ ...newClient, contact: e.target.value })
                }
                className={`py-2.5 px-3 border rounded-lg text-[0.85rem] text-[#111827] focus:outline-none placeholder:text-[#9CA3AF] ${
                  validationErrors.contact
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-[#E5E7EB] focus:border-[#9CA3AF]'
                }`}
              />
              {validationErrors.contact && (
                <p className="text-xs text-red-600 mt-0.5">{validationErrors.contact}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.75rem] font-semibold text-[#374151] uppercase tracking-wide">
              Brand Color
            </label>
            <div className="flex gap-2 flex-wrap">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-lg border-2 transition-all duration-150 hover:scale-110 ${
                    newClient.color === color
                      ? 'border-[#111827] shadow-[0_0_0_2px_#FFFFFF,0_0_0_4px_#111827]'
                      : 'border-transparent'
                  }`}
                  style={{ background: color }}
                  onClick={() => onClientChange({ ...newClient, color })}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 px-6 border-t border-[#E5E7EB] flex justify-end gap-2.5">
          <button
            className="py-2.5 px-5 bg-white border border-[#E5E7EB] rounded-lg text-[0.85rem] text-[#6B7280] cursor-pointer hover:bg-[#F9FAFB] transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex items-center gap-1.5 py-2.5 px-5 bg-[#111827] border-none rounded-lg text-[0.85rem] text-white cursor-pointer hover:bg-[#1F2937] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onSave}
            disabled={isLoading || !newClient.name.trim() || !newClient.industry.trim() || !newClient.contact.trim()}
          >
            <Check size={16} />
            {isLoading ? 'Creating...' : 'Add Client'}
          </button>
        </div>
      </div>
    </div>
  );
}


