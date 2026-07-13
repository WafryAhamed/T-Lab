import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  Bot,
  Settings,
  ShieldCheck,
  UsersRound,
  Columns3,
  CalendarDays,
  ScrollText,
  X } from
'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';
import { cn } from '../../lib/utils';
interface NavItem {
  to: string;
  label: string;
  icon: React.ElementType;
  roles: Role[];
}
const navItems: NavItem[] = [
{
  to: '/dashboard',
  label: 'Dashboard',
  icon: LayoutDashboard,
  roles: ['Administrator', 'Project Manager', 'Team Member']
},
{
  to: '/projects',
  label: 'Projects',
  icon: FolderKanban,
  roles: ['Administrator', 'Project Manager', 'Team Member']
},
{
  to: '/tasks',
  label: 'Tasks',
  icon: CheckSquare,
  roles: ['Project Manager', 'Team Member']
},
{
  to: '/board',
  label: 'Board',
  icon: Columns3,
  roles: ['Project Manager', 'Team Member']
},
{
  to: '/calendar',
  label: 'Calendar',
  icon: CalendarDays,
  roles: ['Administrator', 'Project Manager', 'Team Member']
},
{
  to: '/team',
  label: 'Team',
  icon: Users,
  roles: ['Administrator', 'Project Manager', 'Team Member']
},
{
  to: '/users',
  label: 'User Management',
  icon: UsersRound,
  roles: ['Administrator']
},
{
  to: '/roles',
  label: 'Roles',
  icon: ShieldCheck,
  roles: ['Administrator']
},
{
  to: '/audit',
  label: 'Audit Logs',
  icon: ScrollText,
  roles: ['Administrator']
},
{
  to: '/assistant',
  label: 'AI Assistant',
  icon: Bot,
  roles: ['Administrator', 'Project Manager', 'Team Member']
},
{
  to: '/settings',
  label: 'Settings',
  icon: Settings,
  roles: ['Administrator', 'Project Manager', 'Team Member']
}];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}
export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const { currentUser } = useAuth();
  const router = useRouter();
  const role = currentUser?.role;
  const items = navItems.filter((item) => role && item.roles.includes(role));
  const content =
  <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 h-16 border-b border-line shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-accent flex items-center justify-center font-display font-bold text-black text-lg">
            T
          </div>
          <div className="leading-none">
            <span className="font-display font-bold text-maintext text-lg">
              T LAB
            </span>
            <span className="block text-[10px] tracking-widest text-secondary mt-0.5">
              PROJECT OS
            </span>
          </div>
        </div>
        <button
        className="lg:hidden text-secondary"
        onClick={onClose}
        aria-label="Close menu">
        
          <X size={20} />
        </button>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const isActive = router.pathname === item.to || router.pathname.startsWith(`${item.to}/`);
          return (
            <Link
              key={item.to}
              href={item.to}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                isActive ?
                'bg-accent text-black' :
                'text-secondary hover:text-maintext hover:bg-bg'
              )}>
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-4 py-4 border-t border-line shrink-0">
        <div className="text-xs text-secondary">Signed in as</div>
        <div className="text-sm font-medium text-maintext truncate">
          {currentUser?.role}
        </div>
        <div className="text-xs text-secondary truncate mt-0.5">
          LankaTech Solutions
        </div>
      </div>
    </div>;

  return (
    <>
      <aside className="hidden lg:flex w-64 shrink-0 bg-card border-r border-line">
        {content}
      </aside>
      {mobileOpen &&
      <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-card border-r border-line">
            {content}
          </aside>
        </div>
      }
    </>);

}