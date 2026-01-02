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


