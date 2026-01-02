'use client';

import PipelineCard from './PipelineCard';
import type { ContentItem } from '@/store/content/contentTypes';
import type { Client } from '@/components/clients/types';
import type { StageConfig } from './types';

interface PipelineColumnProps {
  stage: string;
  stageConfig: StageConfig;
  content: ContentItem[];
  clients: Client[];
  onContentClick: (content: ContentItem) => void;
}

export default function PipelineColumn({
  stage,
  stageConfig,
  content,
  clients,
  onContentClick,
}: PipelineColumnProps) {
  const StageIcon = stageConfig.icon;

  return (
    <div className="pipeline-column min-w-[260px] max-w-[260px] bg-[#F3F4F6] rounded-xl flex flex-col">
      <div className="column-header flex justify-between items-center py-3.5 px-4">
        <div className="column-title-row flex items-center gap-2">
          <div style={{ color: stageConfig.color }}>
            <StageIcon size={14} />
          </div>
          <span
            className="column-title text-[0.85rem] font-semibold"
            style={{ color: stageConfig.color }}
          >
            {stageConfig.label}
          </span>
        </div>
        <span className="column-count text-[0.65rem] bg-[#E5E7EB] text-[#374151] py-0.5 px-2 rounded-[10px] font-semibold">
          {content.length}
        </span>
      </div>
      <div className="column-content flex-1 py-2 px-2.5 overflow-y-auto flex flex-col gap-2.5">
        {content.map((item) => {
          const client = clients.find((cl) => cl.id === item.clientId);
          return (
            <PipelineCard
              key={item.id}
              content={item}
              client={client}
              onClick={() => onContentClick(item)}
            />
          );
        })}
      </div>
    </div>
  );
}

