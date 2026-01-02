'use client';

import { CheckCircle2 } from 'lucide-react';

export default function NoProblemsView() {
  return (
    <div className="no-problems flex flex-col items-center justify-center h-full text-center text-[#059669]">
      <CheckCircle2 size={48} className="mb-4 opacity-60" />
      <h3 className="text-[1.2rem] font-semibold mb-2">Everything looks good!</h3>
      <p className="text-[0.9rem] text-[#6B7280]">
        No overdue tasks, missed posts, or stalled content. Keep up the great work!
      </p>
    </div>
  );
}


