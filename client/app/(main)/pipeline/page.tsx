'use client';

import { useState } from 'react';
import {
  Zap,
  Clapperboard,
  CheckSquare,
  CheckCircle2,
  Send,
} from 'lucide-react';
import { useReduxData } from '@/hooks/useReduxData';
import {
  PipelineHeader,
  PipelineBoard,
  ContentDetailModal,
  stages,
} from '@/components/pipeline';
import type { ContentItem } from '@/store/content/contentTypes';
import type { Stage, StageConfig } from '@/components/pipeline';

const stageConfig: Record<Stage, StageConfig> = {
  idea: { label: 'Ideas', color: '#F59E0B', icon: Zap },
  execution: { label: 'Production', color: '#3B82F6', icon: Clapperboard },
  approval: { label: 'Approval', color: '#8B5CF6', icon: CheckSquare },
  ready: { label: 'Ready', color: '#10B981', icon: CheckCircle2 },
  posted: { label: 'Published', color: '#6B7280', icon: Send },
};

export default function PipelinePage() {
  const { clients, contentBank, team, updateContentStage, addContentNote } = useReduxData();
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [filterClient, setFilterClient] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');
  const [noteAuthor, setNoteAuthor] = useState('');

  const filteredContent = filterClient
    ? contentBank.filter((c) => c.clientId === filterClient)
    : contentBank;

  const addNote = (contentId: string) => {
    if (!newNote.trim() || !noteAuthor) return;
    addContentNote(contentId, { authorId: noteAuthor, text: newNote.trim() });
    if (selectedContent?.id === contentId) {
      setSelectedContent({
        ...selectedContent,
        notes: [
          ...(selectedContent.notes || []),
          {
            id: `cn${Date.now()}`,
            authorId: noteAuthor,
            text: newNote.trim(),
            createdAt: new Date().toISOString(),
          },
        ],
      });
    }
    setNewNote('');
  };

  const moveContent = (contentId: string, newStage: string) => {
    updateContentStage(contentId, newStage);
    if (selectedContent?.id === contentId) {
      setSelectedContent({ ...selectedContent, stage: newStage as Stage });
    }
  };

  const handleStageClick = (stage: string) => {
    if (selectedContent) {
      moveContent(selectedContent.id, stage);
    }
  };

  const handleMoveStage = (stage: string) => {
    if (selectedContent) {
      moveContent(selectedContent.id, stage);
    }
  };

  return (
    <div className="pipeline-view flex-1 flex flex-col overflow-hidden">
      <PipelineHeader
        clients={clients}
        filterClient={filterClient}
        onFilterChange={setFilterClient}
      />

      <PipelineBoard
        content={filteredContent}
        clients={clients}
        stageConfigs={stageConfig}
        onContentClick={setSelectedContent}
      />

      {selectedContent && (
        <ContentDetailModal
          content={selectedContent}
          clients={clients}
          team={team}
          stageConfigs={stageConfig}
          noteAuthor={noteAuthor}
          newNote={newNote}
          onClose={() => setSelectedContent(null)}
          onStageClick={handleStageClick}
          onNoteAuthorChange={setNoteAuthor}
          onNewNoteChange={setNewNote}
          onAddNote={() => addNote(selectedContent.id)}
          onMoveStage={handleMoveStage}
        />
      )}
    </div>
  );
}
