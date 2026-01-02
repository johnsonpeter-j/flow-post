import type { Brief } from '@/components/clientsItem/types';

export interface BriefsState {
  briefs: Brief[];
  selectedBrief: Brief | null;
}


