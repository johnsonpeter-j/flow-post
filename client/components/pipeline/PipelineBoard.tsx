'use client';

import PipelineColumn from './PipelineColumn';
import type { ContentItem } from '@/store/content/contentTypes';
import type { Client } from '@/components/clients/types';
import type { StageConfig } from './types';
import { stages } from './types';

interface PipelineBoardProps {
  content: ContentItem[];
  clients: Client[];
  stageConfigs: Record<string, StageConfig>;
  onContentClick: (content: ContentItem) => void;
}

export default function PipelineBoard({
  content,
  clients,
  stageConfigs,
  onContentClick,
}: PipelineBoardProps) {
  return (
    <div className="pipeline-board flex-1 flex gap-3 p-4 overflow-x-auto bg-[#FAFAFA]">
      {stages.map((stage) => {
        const stageContent = content.filter((c) => c.stage === stage);
        return (
          <PipelineColumn
            key={stage}
            stage={stage}
            stageConfig={stageConfigs[stage]}
            content={stageContent}
            clients={clients}
            onContentClick={onContentClick}
          />
        );
      })}
    </div>
  );
}


