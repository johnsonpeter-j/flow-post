'use client';

import ImportTypeSelector from './ImportTypeSelector';
import ClientSelector from './ClientSelector';
import UploadZone from './UploadZone';
import TemplateDownload from './TemplateDownload';
import type { ImportType } from './types';
import type { Client } from '@/components/clients/types';

interface UploadStep1Props {
  importType: ImportType;
  clients: Client[];
  selectedClient: string;
  dragActive: boolean;
  onImportTypeChange: (type: ImportType) => void;
  onClientChange: (clientId: string) => void;
  onDrag: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileSelect: (file: File) => void;
}

export default function UploadStep1({
  importType,
  clients,
  selectedClient,
  dragActive,
  onImportTypeChange,
  onClientChange,
  onDrag,
  onDrop,
  onFileSelect,
}: UploadStep1Props) {
  return (
    <div className="upload-step-content flex flex-col gap-5">
      <div className="upload-options grid grid-cols-1 md:grid-cols-2 gap-4">
        <ImportTypeSelector importType={importType} onTypeChange={onImportTypeChange} />
        <ClientSelector clients={clients} selectedClient={selectedClient} onClientChange={onClientChange} />
      </div>

      <UploadZone dragActive={dragActive} onDrag={onDrag} onDrop={onDrop} onFileSelect={onFileSelect} />

      <TemplateDownload />
    </div>
  );
}





