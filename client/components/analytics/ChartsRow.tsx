'use client';

import ViewsChart from './ViewsChart';
import EngagementChart from './EngagementChart';
import type { WeeklyData } from './types';

interface ChartsRowProps {
  weeklyData: WeeklyData[];
}

export default function ChartsRow({ weeklyData }: ChartsRowProps) {
  return (
    <div className="charts-row grid grid-cols-[2fr_1fr] gap-4 mb-1">
      <ViewsChart weeklyData={weeklyData} />
      <EngagementChart weeklyData={weeklyData} />
    </div>
  );
}


