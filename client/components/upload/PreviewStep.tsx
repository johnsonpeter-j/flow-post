'use client';

import ParsedFileInfo from './ParsedFileInfo';
import PreviewTable from './PreviewTable';
import PreviewActions from './PreviewActions';
import type { ParsedData, ImportType } from './types';

interface PreviewStepProps {
  parsedData: ParsedData;
  importType: ImportType;
  mappedData: any[];
  onUpdateRow: (index: number, field: string, value: string) => void;
  onRemoveRow: (index: number) => void;
  onCancel: () => void;
  onImport: () => void;
}

export default function PreviewStep({
  parsedData,
  importType,
  mappedData,
  onUpdateRow,
  onRemoveRow,
  onCancel,
  onImport,
}: PreviewStepProps) {
  return (
    <div className="upload-step-content flex flex-col gap-5">
      <ParsedFileInfo parsedData={parsedData} itemCount={mappedData.length} />

      <PreviewTable
        importType={importType}
        mappedData={mappedData}
        onUpdateRow={onUpdateRow}
        onRemoveRow={onRemoveRow}
      />

      <PreviewActions itemCount={mappedData.length} onCancel={onCancel} onImport={onImport} />
    </div>
  );
}





