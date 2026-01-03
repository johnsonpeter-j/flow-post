import Link from 'next/link';
import { Building2, ArrowLeft } from 'lucide-react';

export default function ClientNotFound() {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center text-[#9CA3AF] min-h-full">
      <Building2 size={48} className="mb-3 opacity-40" />
      <h3 className="text-[#6B7280] mb-1">Client not found</h3>
      <p className="text-sm">The client you're looking for doesn't exist</p>
      <Link
        href="/clients"
        className="mt-4 flex items-center gap-2 text-[#6B7280] hover:text-[#111827] transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Clients
      </Link>
    </div>
  );
}






