'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface AddDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, description: string) => void;
}

export default function AddDepartmentModal({ isOpen, onClose, onAdd }: AddDepartmentModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleAdd = () => {
    if (name.trim()) {
      onAdd(name.trim(), description.trim());
      setName('');
      setDescription('');
      onClose();
    }
  };

  const handleCancel = () => {
    setName('');
    setDescription('');
    onClose();
  };

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
          <h3 className="text-[1.1rem] font-semibold text-[#111827]">Add Department</h3>
          <button
            className="bg-transparent border-none text-[#9CA3AF] cursor-pointer p-1 hover:text-[#6B7280] transition-colors"
            onClick={handleCancel}
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.75rem] font-semibold text-[#374151] uppercase tracking-wide">
              Department Name *
            </label>
            <input
              type="text"
              placeholder="Enter department name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="py-2.5 px-3 border border-[#E5E7EB] rounded-lg text-[0.85rem] text-[#111827] focus:outline-none focus:border-[#9CA3AF] placeholder:text-[#9CA3AF]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.75rem] font-semibold text-[#374151] uppercase tracking-wide">
              Description
            </label>
            <textarea
              placeholder="Enter department description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="py-2.5 px-3 border border-[#E5E7EB] rounded-lg text-[0.85rem] text-[#111827] focus:outline-none focus:border-[#9CA3AF] placeholder:text-[#9CA3AF] resize-none"
            />
          </div>
        </div>
        <div className="p-4 px-6 border-t border-[#E5E7EB] flex justify-end gap-2.5">
          <button
            className="py-2.5 px-5 bg-white border border-[#E5E7EB] rounded-lg text-[0.85rem] text-[#6B7280] cursor-pointer hover:bg-[#F9FAFB] transition-colors"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="py-2.5 px-5 bg-[#111827] border-none rounded-lg text-[0.85rem] text-white cursor-pointer hover:bg-[#1F2937] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleAdd}
            disabled={!name.trim()}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

