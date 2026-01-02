export interface ParsedData {
  source: string;
  fileName: string;
  detectedType: string;
  columns: string[];
  rows: any[];
}

export type ImportType = 'content' | 'briefs';

export type UploadStep = 1 | 2 | 3;


