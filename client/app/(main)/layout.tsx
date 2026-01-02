import Sidebar from '@/components/Sidebar';
import '../globals.css';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div 
      className="min-h-screen bg-[#FAFAFA] text-[#1F2937] flex overflow-hidden"
      style={{ fontFamily: 'var(--font-dm-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
    >
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-[#FAFAFA]">{children}</main>
    </div>
  );
}

