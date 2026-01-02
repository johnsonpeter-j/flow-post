'use client';

import type { WeeklyData } from './types';

interface ViewsChartProps {
  weeklyData: WeeklyData[];
}

export default function ViewsChart({ weeklyData }: ViewsChartProps) {
  const maxViews = Math.max(...weeklyData.map((d) => d.views));

  return (
    <div className="chart-card bg-white border border-[#E5E7EB] rounded-[10px] p-4">
      <h3 className="text-[0.85rem] font-semibold text-[#111827] mb-4">Views This Week</h3>
      <div className="bar-chart flex justify-between items-end h-40 pt-6">
        {weeklyData.map((data, i) => (
          <div key={i} className="bar-group flex flex-col items-center flex-1">
            <div className="bar-container h-30 flex items-end w-full justify-center">
              <div
                className="bar w-7 bg-gradient-to-t from-[#6B7280] to-[#9CA3AF] rounded-t relative transition-all hover:from-[#374151] hover:to-[#6B7280]"
                style={{ height: `${(data.views / maxViews) * 100}%` }}
              >
                <span className="bar-value absolute -top-5 left-1/2 -translate-x-1/2 text-[0.65rem] font-semibold text-[#6B7280] whitespace-nowrap">
                  {(data.views / 1000).toFixed(1)}K
                </span>
              </div>
            </div>
            <span className="bar-label mt-2 text-[0.65rem] text-[#9CA3AF]">{data.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


