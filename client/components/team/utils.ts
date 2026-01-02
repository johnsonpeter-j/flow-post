'use client';

import {
  FolderKanban,
  Sparkles,
  Palette,
  Clapperboard,
  PenLine,
  Camera,
  Wand2,
  Users,
} from 'lucide-react';
import React, { type ReactElement } from 'react';

export const getDeptIcon = (iconName: string): ReactElement => {
  switch (iconName) {
    case 'folder':
      return React.createElement(FolderKanban, { size: 16 });
    case 'sparkles':
      return React.createElement(Sparkles, { size: 16 });
    case 'palette':
      return React.createElement(Palette, { size: 16 });
    case 'clapperboard':
      return React.createElement(Clapperboard, { size: 16 });
    case 'pen':
      return React.createElement(PenLine, { size: 16 });
    case 'camera':
      return React.createElement(Camera, { size: 16 });
    case 'wand':
      return React.createElement(Wand2, { size: 16 });
    default:
      return React.createElement(Users, { size: 16 });
  }
};

export const getMemberById = (memberId: string, team: any[]) => {
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

export const isOverdue = (deadline: string, today: Date) => new Date(deadline) < today;

