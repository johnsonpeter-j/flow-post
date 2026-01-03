'use client';

import { X } from 'lucide-react';
import type { ImportType } from './types';

interface PreviewTableProps {
  importType: ImportType;
  mappedData: any[];
  onUpdateRow: (index: number, field: string, value: string) => void;
  onRemoveRow: (index: number) => void;
}

export default function PreviewTable({
  importType,
  mappedData,
  onUpdateRow,
  onRemoveRow,
}: PreviewTableProps) {
  return (
    <div className="preview-table-container bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="preview-table w-full">
          <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
            <tr>
              <th className="w-10 px-3 py-3 text-left text-[0.7rem] font-semibold text-[#374151] uppercase tracking-wide">
                #
              </th>
              {importType === 'content' ? (
                <>
                  <th className="px-3 py-3 text-left text-[0.7rem] font-semibold text-[#374151] uppercase tracking-wide">
                    Idea
                  </th>
                  <th className="w-24 px-3 py-3 text-left text-[0.7rem] font-semibold text-[#374151] uppercase tracking-wide">
                    Type
                  </th>
                  <th className="w-24 px-3 py-3 text-left text-[0.7rem] font-semibold text-[#374151] uppercase tracking-wide">
                    Stage
                  </th>
                  <th className="w-24 px-3 py-3 text-left text-[0.7rem] font-semibold text-[#374151] uppercase tracking-wide">
                    Priority
                  </th>
                  <th className="w-36 px-3 py-3 text-left text-[0.7rem] font-semibold text-[#374151] uppercase tracking-wide">
                    Platforms
                  </th>
                  <th className="w-32 px-3 py-3 text-left text-[0.7rem] font-semibold text-[#374151] uppercase tracking-wide">
                    Schedule
                  </th>
                </>
              ) : (
                <>
                  <th className="px-3 py-3 text-left text-[0.7rem] font-semibold text-[#374151] uppercase tracking-wide">
                    Concept
                  </th>
                  <th className="px-3 py-3 text-left text-[0.7rem] font-semibold text-[#374151] uppercase tracking-wide">
                    Explanation
                  </th>
                  <th className="w-24 px-3 py-3 text-left text-[0.7rem] font-semibold text-[#374151] uppercase tracking-wide">
                    Type
                  </th>
                  <th className="w-36 px-3 py-3 text-left text-[0.7rem] font-semibold text-[#374151] uppercase tracking-wide">
                    Mood
                  </th>
                </>
              )}
              <th className="w-12 px-3 py-3 text-left text-[0.7rem] font-semibold text-[#374151] uppercase tracking-wide"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {mappedData.map((row, index) => (
              <tr key={index} className="hover:bg-[#F9FAFB]">
                <td className="row-num px-3 py-3 text-[0.75rem] text-[#9CA3AF]">{index + 1}</td>
                {importType === 'content' ? (
                  <>
                    <td className="px-3 py-3">
                      <input
                        type="text"
                        value={row.idea || ''}
                        onChange={(e) => onUpdateRow(index, 'idea', e.target.value)}
                        className="table-input w-full py-1.5 px-2 border border-[#E5E7EB] rounded-md text-[0.8rem] text-[#111827] focus:outline-none focus:border-[#3B82F6]"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <select
                        value={row.type || 'photo'}
                        onChange={(e) => onUpdateRow(index, 'type', e.target.value)}
                        className="table-select w-full py-1.5 px-2 border border-[#E5E7EB] rounded-md text-[0.8rem] text-[#111827] focus:outline-none focus:border-[#3B82F6]"
                      >
                        <option value="video">Video</option>
                        <option value="photo">Photo</option>
                        <option value="carousel">Carousel</option>
                        <option value="reel">Reel</option>
                        <option value="story">Story</option>
                      </select>
                    </td>
                    <td className="px-3 py-3">
                      <select
                        value={row.stage || 'idea'}
                        onChange={(e) => onUpdateRow(index, 'stage', e.target.value)}
                        className="table-select w-full py-1.5 px-2 border border-[#E5E7EB] rounded-md text-[0.8rem] text-[#111827] focus:outline-none focus:border-[#3B82F6]"
                      >
                        <option value="idea">Idea</option>
                        <option value="execution">Execution</option>
                        <option value="approval">Approval</option>
                        <option value="ready">Ready</option>
                      </select>
                    </td>
                    <td className="px-3 py-3">
                      <select
                        value={row.priority || 'medium'}
                        onChange={(e) => onUpdateRow(index, 'priority', e.target.value)}
                        className="table-select w-full py-1.5 px-2 border border-[#E5E7EB] rounded-md text-[0.8rem] text-[#111827] focus:outline-none focus:border-[#3B82F6]"
                      >
                        <option value="urgent">Urgent</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </td>
                    <td className="px-3 py-3">
                      <input
                        type="text"
                        value={row.platforms || ''}
                        onChange={(e) => onUpdateRow(index, 'platforms', e.target.value)}
                        className="table-input w-full py-1.5 px-2 border border-[#E5E7EB] rounded-md text-[0.8rem] text-[#111827] focus:outline-none focus:border-[#3B82F6] placeholder:text-[#9CA3AF]"
                        placeholder="instagram, facebook"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <input
                        type="date"
                        value={row.scheduledFor || ''}
                        onChange={(e) => onUpdateRow(index, 'scheduledFor', e.target.value)}
                        className="table-input w-full py-1.5 px-2 border border-[#E5E7EB] rounded-md text-[0.8rem] text-[#111827] focus:outline-none focus:border-[#3B82F6]"
                      />
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-3 py-3">
                      <input
                        type="text"
                        value={row.concept || ''}
                        onChange={(e) => onUpdateRow(index, 'concept', e.target.value)}
                        className="table-input w-full py-1.5 px-2 border border-[#E5E7EB] rounded-md text-[0.8rem] text-[#111827] focus:outline-none focus:border-[#3B82F6]"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <input
                        type="text"
                        value={row.explanation || ''}
                        onChange={(e) => onUpdateRow(index, 'explanation', e.target.value)}
                        className="table-input w-full py-1.5 px-2 border border-[#E5E7EB] rounded-md text-[0.8rem] text-[#111827] focus:outline-none focus:border-[#3B82F6]"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <select
                        value={row.contentType || 'campaign'}
                        onChange={(e) => onUpdateRow(index, 'contentType', e.target.value)}
                        className="table-select w-full py-1.5 px-2 border border-[#E5E7EB] rounded-md text-[0.8rem] text-[#111827] focus:outline-none focus:border-[#3B82F6]"
                      >
                        <option value="video">Video</option>
                        <option value="photo">Photo</option>
                        <option value="carousel">Carousel</option>
                        <option value="reel">Reel</option>
                        <option value="campaign">Campaign</option>
                      </select>
                    </td>
                    <td className="px-3 py-3">
                      <input
                        type="text"
                        value={row.mood || ''}
                        onChange={(e) => onUpdateRow(index, 'mood', e.target.value)}
                        className="table-input w-full py-1.5 px-2 border border-[#E5E7EB] rounded-md text-[0.8rem] text-[#111827] focus:outline-none focus:border-[#3B82F6] placeholder:text-[#9CA3AF]"
                        placeholder="e.g., warm, energetic"
                      />
                    </td>
                  </>
                )}
                <td className="px-3 py-3">
                  <button
                    className="remove-row-btn w-7 h-7 flex items-center justify-center text-[#9CA3AF] hover:text-[#DC2626] hover:bg-[#FEE2E2] rounded-md transition-colors"
                    onClick={() => onRemoveRow(index)}
                  >
                    <X size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}





