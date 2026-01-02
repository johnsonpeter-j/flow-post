'use client';

import { Upload, FileText } from 'lucide-react';
import { useRef } from 'react';

interface UploadZoneProps {
  dragActive: boolean;
  onDrag: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileSelect: (file: File) => void;
}

export default function UploadZone({ dragActive, onDrag, onDrop, onFileSelect }: UploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div
      className={`upload-zone border-2 border-dashed rounded-xl p-12 cursor-pointer transition-all ${
        dragActive
          ? 'border-[#3B82F6] bg-[#EFF6FF]'
          : 'border-[#D1D5DB] bg-[#F9FAFB] hover:border-[#9CA3AF] hover:bg-[#F3F4F6]'
      }`}
      onDragEnter={onDrag}
      onDragLeave={onDrag}
      onDragOver={onDrag}
      onDrop={onDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls,.csv,.pdf"
        onChange={handleFileInput}
        className="hidden"
      />
      <div className="upload-zone-content flex flex-col items-center gap-3 text-center">
        <div className="upload-icon w-16 h-16 rounded-full bg-[#E5E7EB] flex items-center justify-center">
          <Upload size={32} className="text-[#6B7280]" />
        </div>
        <h3 className="text-lg font-semibold text-[#111827]">Drop your file here</h3>
        <p className="text-sm text-[#6B7280]">or click to browse</p>
        <div className="supported-formats flex gap-4 mt-2">
          <span className="flex items-center gap-1.5 text-[0.75rem] text-[#9CA3AF]">
            <FileText size={14} />
            Excel (.xlsx, .csv)
          </span>
          <span className="flex items-center gap-1.5 text-[0.75rem] text-[#9CA3AF]">
            <FileText size={14} />
            PDF
          </span>
        </div>
      </div>
    </div>
  );
}


