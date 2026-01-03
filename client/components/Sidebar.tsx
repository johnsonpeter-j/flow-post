'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AlertTriangle,
  MessageSquare,
  Layers,
  Calendar,
  Users,
  BarChart3,
  Building2,
  Upload,
  LogOut,
} from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  problemCount?: number;
}

export default function Sidebar({ problemCount: propProblemCount }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Calculate problem count from Redux store - use separate selectors to avoid creating new objects
  const ideaBankItems = useAppSelector((state) => state.ideaBank.ideaBankItems);
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const briefs = useAppSelector((state) => state.briefs.briefs);

  const today = new Date('2025-01-17');
  const calculatedProblemCount = (() => {
    const overdueTasks = tasks.filter((t) => new Date(t.deadline) < today && t.status !== 'done').length;
    const missedPosts = ideaBankItems.filter((c) => c.scheduledFor && c.stage !== 'posted' && new Date(c.scheduledFor) < today).length;
    const urgentItems = ideaBankItems.filter((c) => c.priority === 'urgent' && c.stage !== 'posted').length;
    const pendingApprovals = ideaBankItems.filter((c) => c.stage === 'approval').length;
    return overdueTasks + missedPosts + urgentItems + pendingApprovals;
  })();

  const problemCount = propProblemCount !== undefined ? propProblemCount : calculatedProblemCount;

  const navItems = [
    { href: '/problems', icon: AlertTriangle, label: 'Problems', hasProblems: true },
    { href: '/chat', icon: MessageSquare, label: 'Chat' },
    { href: '/pipeline', icon: Layers, label: 'Pipeline' },
    { href: '/calendar', icon: Calendar, label: 'Calendar' },
    { href: '/team', icon: Users, label: 'Team' },
    { href: '/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/clients', icon: Building2, label: 'Clients' },
    { href: '/upload', icon: Upload, label: 'Import' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  const handleLogout = () => {
    // Clear all localStorage items
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
    // Redirect to signin page
    router.push('/signin');
  };

  return (
    <aside className="w-[220px] bg-white border-r border-[#E5E7EB] py-4 px-2.5 flex flex-col shrink-0">
      <div className="px-2.5 mb-6">
        <div className="text-[1.15rem] font-bold text-[#111827]">FlowPost</div>
        <div className="text-[0.65rem] text-[#9CA3AF] mt-0.5">Social Media Command</div>
      </div>

      <nav className="mb-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          const hasProblems = item.hasProblems && problemCount > 0;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-2.5 py-[9px] px-2.5 rounded-lg cursor-pointer 
                transition-all duration-150 text-[0.85rem] font-medium no-underline
                ${active 
                  ? hasProblems 
                    ? 'bg-[#FEE2E2] text-[#DC2626]' 
                    : 'bg-[#F3F4F6] text-[#111827]'
                  : hasProblems
                    ? 'text-[#DC2626] hover:text-[#B91C1C] hover:bg-[#F3F4F6]'
                    : 'text-[#6B7280] hover:text-[#374151] hover:bg-[#F3F4F6]'
                }
              `}
            >
              <Icon size={17} />
              <span>{item.label}</span>
              {hasProblems && problemCount > 0 && (
                <span className="bg-[#DC2626] text-white text-[0.65rem] font-semibold py-0.5 px-1.5 rounded-lg ml-auto">
                  {problemCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-[#E5E7EB]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 py-[9px] px-2.5 rounded-lg cursor-pointer transition-all duration-150 text-[0.85rem] font-medium text-[#6B7280] hover:text-[#DC2626] hover:bg-[#FEE2E2]"
        >
          <LogOut size={17} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
