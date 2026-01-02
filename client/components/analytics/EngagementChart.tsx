'use client';

import type { WeeklyData } from './types';

interface EngagementChartProps {
  weeklyData: WeeklyData[];
}

export default function EngagementChart({ weeklyData }: EngagementChartProps) {
  return (
    <div className="chart-card bg-white border border-[#E5E7EB] rounded-[10px] p-4">
      <h3 className="text-[0.85rem] font-semibold text-[#111827] mb-4">Engagement Rate</h3>
      <div className="engagement-chart flex flex-col gap-2.5">
        {weeklyData.map((data, i) => (
          <div key={i} className="engagement-row flex items-center gap-2.5">
            <span className="engagement-day text-[0.7rem] text-[#6B7280] w-7">{data.day}</span>
            <div className="engagement-bar-container flex-1 h-2 bg-[#F3F4F6] rounded overflow-hidden">
              <div
                className="engagement-bar h-full bg-gradient-to-r from-[#6B7280] to-[#374151] rounded"
                style={{ width: `${(data.engagement / 10) * 100}%` }}
              />
            </div>
            <span className="engagement-value text-[0.7rem] font-semibold text-[#374151] w-9 text-right">
              {data.engagement}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}


