'use client';

import { useState, useRef } from 'react';
import { useReduxData } from '@/hooks/useReduxData';
import {
  UploadHeader,
  StepIndicator,
  UploadStep1,
  PreviewStep,
  SuccessStep,
  ProcessingOverlay,
  generateMockParsedData,
} from '@/components/upload';
import type { ParsedData, ImportType, UploadStep } from '@/components/upload';
import type { Brief } from '@/components/clientsItem/types';

export default function UploadPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { clients, addBriefs } = useReduxData();

  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const [mappedData, setMappedData] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState(clients[0]?.id || '');
  const [importType, setImportType] = useState<ImportType>('content');
  const [step, setStep] = useState<UploadStep>(1);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv',
      'application/pdf',
    ];
    const extension = file.name.split('.').pop()?.toLowerCase() || '';

    if (!validTypes.includes(file.type) && !['xlsx', 'xls', 'csv', 'pdf'].includes(extension)) {
      alert('Please upload an Excel (.xlsx, .xls, .csv) or PDF file');
      return;
    }

    setUploadedFile(file);
    setProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      const mockParsedData = generateMockParsedData(file, extension);
      setParsedData(mockParsedData);
      setMappedData(mockParsedData.rows);
      setProcessing(false);
      setStep(2);
    }, 1500);
  };

  const updateMappedRow = (index: number, field: string, value: string) => {
    setMappedData((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  };

  const removeRow = (index: number) => {
    setMappedData((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImport = () => {
    setProcessing(true);

    setTimeout(() => {
      if (importType === 'content') {
        const newContent = mappedData.map((row, i) => ({
          id: `cb_import_${Date.now()}_${i}`,
          clientId: selectedClient,
          idea: row.idea || row.concept || '',
          type: row.type || row.contentType || 'photo',
          stage: row.stage || 'idea',
          priority: row.priority || 'medium',
          platforms: (row.platforms || 'instagram').split(',').map((p: string) => p.trim()),
          scheduledFor: row.scheduledFor || null,
          createdAt: new Date().toISOString().split('T')[0],
          notes: [],
        }));
        // Content import functionality removed - using mock data now
        // addMultipleContent(newContent);
      } else if (importType === 'briefs') {
        const newBriefs: Brief[] = mappedData.map((row, i) => ({
          id: `br_import_${Date.now()}_${i}`,
          clientId: selectedClient,
          concept: row.concept || '',
          explanation: row.explanation || '',
          mood: row.mood || '',
          moodTags: (row.mood || '')
            .split(',')
            .map((t: string) => t.trim().toLowerCase())
            .filter(Boolean),
          references: [],
          contentType: row.contentType || 'campaign',
          category: 'general',
          teamsInvolved: [],
          music: { type: 'none', mood: '', reference: '' },
          status: 'pending',
          currentStage: 'idea',
          createdAt: new Date().toISOString().split('T')[0],
          notes: [],
        }));
        addBriefs(newBriefs);
      }

      setProcessing(false);
      setStep(3);
    }, 1000);
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setParsedData(null);
    setMappedData([]);
    setStep(1);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <UploadHeader step={step} onStartOver={resetUpload} />

      <div className="upload-content flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        <StepIndicator step={step} />

        {step === 1 && (
          <UploadStep1
            importType={importType}
            clients={clients}
            selectedClient={selectedClient}
            dragActive={dragActive}
            onImportTypeChange={setImportType}
            onClientChange={setSelectedClient}
            onDrag={handleDrag}
            onDrop={handleDrop}
            onFileSelect={handleFile}
          />
        )}

        <ProcessingOverlay isProcessing={processing} />

        {step === 2 && parsedData && (
          <PreviewStep
            parsedData={parsedData}
            importType={importType}
            mappedData={mappedData}
            onUpdateRow={updateMappedRow}
            onRemoveRow={removeRow}
            onCancel={resetUpload}
            onImport={handleImport}
          />
        )}

        {step === 3 && (
          <SuccessStep
            itemCount={mappedData.length}
            importType={importType}
            selectedClient={selectedClient}
            onImportMore={resetUpload}
          />
        )}
      </div>
    </div>
  );
}
