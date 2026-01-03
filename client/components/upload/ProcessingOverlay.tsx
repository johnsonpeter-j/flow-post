'use client';

interface ProcessingOverlayProps {
  isProcessing: boolean;
}

export default function ProcessingOverlay({ isProcessing }: ProcessingOverlayProps) {
  if (!isProcessing) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="processing-content bg-white rounded-2xl p-8 flex flex-col items-center gap-4 text-center">
        <div className="processing-spinner w-12 h-12 border-4 border-[#E5E7EB] border-t-[#3B82F6] rounded-full animate-spin" />
        <h3 className="text-lg font-semibold text-[#111827]">AI is processing your file...</h3>
        <p className="text-sm text-[#6B7280]">Extracting and mapping data</p>
      </div>
    </div>
  );
}





