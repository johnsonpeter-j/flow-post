import {
  Video,
  Camera,
  Layers,
  Play,
  Circle,
  Target,
  FileText,
} from 'lucide-react';
import type { TeamMember } from '@/data/mockData';
import { stages } from './types';

export const getContentType = (type: string) => {
  switch (type) {
    case 'video':
      return { icon: Video, label: 'Video' };
    case 'photo':
      return { icon: Camera, label: 'Photo' };
    case 'carousel':
      return { icon: Layers, label: 'Carousel' };
    case 'reel':
      return { icon: Play, label: 'Reel' };
    case 'story':
      return { icon: Circle, label: 'Story' };
    case 'campaign':
      return { icon: Target, label: 'Campaign' };
    default:
      return { icon: FileText, label: type };
  }
};

export const getMemberById = (memberId: string, team: TeamMember[]) => {
  return team.find((m) => m.id === memberId);
};

export const formatNoteTime = (dateStr: string) => {
  const date = new Date(dateStr);
  return (
    date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
    ' at ' +
    date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  );
};

export const getNextStage = (currentStage: string): string | null => {
  const currentIndex = stages.indexOf(currentStage as typeof stages[number]);
  return currentIndex < stages.length - 1 ? stages[currentIndex + 1] : null;
};

export const getPrevStage = (currentStage: string): string | null => {
  const currentIndex = stages.indexOf(currentStage as typeof stages[number]);
  return currentIndex > 0 ? stages[currentIndex - 1] : null;
};

