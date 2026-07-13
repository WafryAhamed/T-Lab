import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Flag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { AppLayout } from '../components/layout/AppLayout';
import { cn } from '../lib/utils';
const MONTHS = [
'January',
'February',
'March',
'April',
'May',
'June',
'July',
'August',
'September',
'October',
'November',
'December'];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export function CalendarPage() {
  const { currentUser } = useAuth();
  const { tasks, projects } = useData();
  const isMember = currentUser?.role === 'Team Member';
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(6); // July (0-indexed)
  const visibleTasks = isMember ?
  tasks.filter((t) => t.assigneeId === currentUser?.id) :
  tasks;
  const milestones = useMemo(
    () =>
    projects.flatMap((p) =>
    p.milestones.map((m) => ({
      ...m,
      projectName: p.name,
      projectId: p.id
    }))
    ),
    [projects]
  );
  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
  ...Array.from(
    {
      length: startOffset
    },
    () => null
  ),
  ...Array.from(
    {
      length: daysInMonth
    },
    (_, i) => i + 1
  )];

  while (cells.length % 7 !== 0) cells.push(null);
  const dateKey = (d: number) =>
  `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  const prev = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };
  const next = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };
  return (
    <div>
      <PageHeader
        title="Calendar"
        subtitle="Task due dates and project milestones"
        action={
        <div className="flex items-center gap-2">
            <button
            onClick={prev}
            aria-label="Previous month"
            className="h-9 w-9 flex items-center justify-center rounded-xl border border-line text-secondary hover:text-accent hover:border-accent">
            
              <ChevronLeft size={18} />
            </button>
            <span className="font-display font-semibold text-maintext min-w-36 text-center">
              {MONTHS[month]} {year}
            </span>
            <button
            onClick={next}
            aria-label="Next month"
            className="h-9 w-9 flex items-center justify-center rounded-xl border border-line text-secondary hover:text-accent hover:border-accent">
            
              <ChevronRight size={18} />
            </button>
          </div>
        } />
      

      <Card className="overflow-hidden">
        <div className="grid grid-cols-7 border-b border-line">
          {DAYS.map((d) =>
          <div
            key={d}
            className="px-2 py-2.5 text-center text-xs font-semibold uppercase tracking-wide text-secondary">
            
              {d}
            </div>
          )}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((day, i) => {
            const key = day ? dateKey(day) : `empty-${i}`;
            const dayTasks = day ?
            visibleTasks.filter((t) => t.dueDate === dateKey(day)) :
            [];
            const dayMilestones = day ?
            milestones.filter((m) => m.dueDate === dateKey(day)) :
            [];
            const isToday = year === 2026 && month === 6 && day === 11;
            return (
              <div
                key={key}
                className={cn(
                  'min-h-20 sm:min-h-28 border-b border-r border-line p-1.5 sm:p-2',
                  (i + 1) % 7 === 0 && 'border-r-0',
                  i >= cells.length - 7 && 'border-b-0'
                )}>
                
                {day &&
                <>
                    <span
                    className={cn(
                      'inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium',
                      isToday ? 'bg-accent text-black' : 'text-secondary'
                    )}>
                    
                      {day}
                    </span>
                    <div className="mt-1 space-y-1">
                      {dayMilestones.map((m) =>
                    <Link
                      key={m.id}
                      href={`/projects/${m.projectId}`}
                      className="flex items-center gap-1 text-[10px] sm:text-[11px] font-medium border border-accent text-accent rounded-md px-1 sm:px-1.5 py-0.5 truncate hover:bg-accent hover:text-black transition-colors"
                      title={`${m.name} — ${m.projectName}`}>
                      
                          <Flag size={9} className="shrink-0" />
                          <span className="truncate hidden sm:inline">
                            {m.name}
                          </span>
                        </Link>
                    )}
                      {dayTasks.map((t) =>
                    <Link
                      key={t.id}
                      href={`/tasks/${t.id}`}
                      className={cn(
                        'block text-[10px] sm:text-[11px] rounded-md px-1 sm:px-1.5 py-0.5 truncate transition-colors',
                        t.priority === 'Urgent' ?
                        'bg-accent text-black font-medium' :
                        'bg-bg border border-line text-maintext hover:border-accent'
                      )}
                      title={t.title}>
                      
                          {t.title}
                        </Link>
                    )}
                    </div>
                  </>
                }
              </div>);

          })}
        </div>
      </Card>

      <div className="flex flex-wrap gap-4 mt-4 text-xs text-secondary">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-accent inline-block" /> Urgent
          task
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded border border-line bg-bg inline-block" />{' '}
          Task due
        </span>
        <span className="flex items-center gap-1.5">
          <Flag size={12} className="text-accent" /> Milestone
        </span>
      </div>
    </div>
  );
}

export default function CalendarPageWrapper() {
  return (
    <AppLayout>
      <CalendarPage />
    </AppLayout>
  );
}
