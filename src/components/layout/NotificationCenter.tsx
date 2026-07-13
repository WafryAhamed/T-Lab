import React, { useEffect, useState, useRef } from 'react';
import {
  Bell,
  CheckCheck,
  UserPlus,
  RefreshCw,
  FolderPlus,
  Clock,
  AtSign } from
'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { NotificationType } from '../../types';
import { cn } from '../../lib/utils';
const typeIcon: Record<NotificationType, React.ElementType> = {
  task_assigned: UserPlus,
  task_updated: RefreshCw,
  project_created: FolderPlus,
  deadline: Clock,
  mention: AtSign
};
export function NotificationCenter() {
  const { notifications, markNotificationRead, markAllNotificationsRead } =
  useData();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const unread = notifications.filter((n) => !n.read).length;
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={`Notifications, ${unread} unread`}
        aria-expanded={open}
        className="relative h-9 w-9 flex items-center justify-center rounded-xl border border-line text-secondary hover:text-accent hover:border-accent transition-colors">
        
        <Bell size={18} />
        {unread > 0 &&
        <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-accent text-black text-[10px] font-bold flex items-center justify-center">
            {unread}
          </span>
        }
      </button>

      <AnimatePresence>
        {open &&
        <motion.div
          initial={{
            opacity: 0,
            y: -6
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: -6
          }}
          transition={{
            duration: 0.15
          }}
          className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-sm bg-card border border-line rounded-2xl shadow-xl z-50 overflow-hidden">
          
            <div className="flex items-center justify-between px-4 py-3 border-b border-line">
              <h3 className="text-sm font-semibold text-maintext">
                Notifications
              </h3>
              <button
              onClick={markAllNotificationsRead}
              className="flex items-center gap-1 text-xs text-accent hover:underline">
              
                <CheckCheck size={13} /> Mark all read
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto divide-y divide-line">
              {notifications.length === 0 &&
            <p className="p-6 text-sm text-secondary text-center">
                  No notifications yet.
                </p>
            }
              {notifications.map((n) => {
              const Icon = typeIcon[n.type];
              return (
                <button
                  key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  className={cn(
                    'w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-bg transition-colors',
                    !n.read && 'bg-bg/60'
                  )}>
                  
                    <span
                    className={cn(
                      'h-8 w-8 rounded-xl border flex items-center justify-center shrink-0 mt-0.5',
                      !n.read ?
                      'border-accent text-accent' :
                      'border-line text-secondary'
                    )}>
                    
                      <Icon size={14} />
                    </span>
                    <span className="min-w-0">
                      <span
                      className={cn(
                        'block text-sm',
                        !n.read ?
                        'text-maintext font-medium' :
                        'text-secondary'
                      )}>
                      
                        {n.message}
                      </span>
                      <span className="block text-xs text-secondary mt-0.5">
                        {n.timestamp}
                      </span>
                    </span>
                    {!n.read &&
                  <span
                    className="h-2 w-2 rounded-full bg-accent shrink-0 mt-2"
                    aria-hidden="true" />

                  }
                  </button>);

            })}
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}