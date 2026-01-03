'use client';

import { FileText } from 'lucide-react';
import type { ImportType } from './types';
import { handleDownloadTemplate } from './utils';

export default function TemplateDownload() {
  return (
    <div className="upload-templates bg-white border border-[#E5E7EB] rounded-xl p-4">
      <h4 className="text-[0.8rem] font-semibold text-[#374151] mb-3">Download Templates</h4>
      <div className="template-links flex gap-3">
        <button
          className="template-btn flex items-center gap-2 py-2 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[0.75rem] text-[#6B7280] cursor-pointer hover:bg-[#F3F4F6] transition-colors"
          onClick={() => handleDownloadTemplate('content')}
        >
          <FileText size={16} />
          Content Bank Template (.xlsx)
        </button>
        <button
          className="template-btn flex items-center gap-2 py-2 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[0.75rem] text-[#6B7280] cursor-pointer hover:bg-[#F3F4F6] transition-colors"
          onClick={() => handleDownloadTemplate('briefs')}
        >
          <FileText size={16} />
          Content Brief Template (.xlsx)
        </button>
      </div>
    </div>
  );
}





