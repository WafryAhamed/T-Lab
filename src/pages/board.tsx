import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Columns3 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { TaskStatus } from '../types';
import { formatDate } from '../lib/utils';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { PriorityBadge } from '../components/ui/PriorityBadge';
import { Avatar } from '../components/ui/Avatar';
import { Select } from '../components/ui/Input';
import { EmptyState } from '../components/ui/EmptyState';
import { AppLayout } from '../components/layout/AppLayout';
const columns: TaskStatus[] = ['Todo', 'In Progress', 'Review', 'Completed'];
export function Board() {
  const { currentUser } = useAuth();
  const { tasks, projects, users, updateTaskStatus } = useData();
  const isMember = currentUser?.role === 'Team Member';
  const [projectFilter, setProjectFilter] = useState('all');
  let list = isMember ?
  tasks.filter((t) => t.assigneeId === currentUser?.id) :
  tasks;
  if (projectFilter !== 'all')
  list = list.filter((t) => t.projectId === projectFilter);
  const move = (taskId: string, dir: -1 | 1, from: TaskStatus) => {
    const idx = columns.indexOf(from) + dir;
    if (idx < 0 || idx >= columns.length) return;
    updateTaskStatus(taskId, columns[idx], currentUser?.id);
    toast.success(
      `Task moved to ${columns[idx] === 'Todo' ? 'To Do' : columns[idx]}`
    );
  };
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Kanban Board"
        subtitle="Track work across every stage"
        action={
        <div className="w-48">
            <Select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            aria-label="Filter by project">
            
              <option value="all">All projects</option>
              {projects.map((p) =>
            <option key={p.id} value={p.id}>
                  {p.name}
                </option>
            )}
            </Select>
          </div>
        } />
      

      {list.length === 0 ?
      <Card>
          <EmptyState
          icon={Columns3}
          title="No tasks on the board"
          description="Tasks will appear here once created." />
        
        </Card> :

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
          {columns.map((col) => {
          const colTasks = list.filter((t) => t.status === col);
          return (
            <div
              key={col}
              className="bg-card border border-line rounded-2xl flex flex-col min-h-[12rem]">
              
                <div className="flex items-center justify-between px-4 py-3 border-b border-line">
                  <h2 className="text-sm font-semibold text-maintext">
                    {col === 'Todo' ? 'To Do' : col}
                  </h2>
                  <span className="text-xs font-medium bg-bg border border-line rounded-full px-2 py-0.5 text-secondary">
                    {colTasks.length}
                  </span>
                </div>
                <div className="p-3 space-y-3 flex-1">
                  {colTasks.map((t) => {
                  const assignee = users.find((u) => u.id === t.assigneeId);
                  const project = projects.find((p) => p.id === t.projectId);
                  return (
                    <div
                      key={t.id}
                      className="bg-bg border border-line rounded-xl p-3.5 hover:border-accent transition-colors">
                      
                        <Link href={`/tasks/${t.id}`}>
                          <p className="text-sm font-medium text-maintext line-clamp-2">
                            {t.title}
                          </p>
                        </Link>
                        <p className="text-xs text-secondary mt-1 truncate">
                          {project?.name}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <PriorityBadge priority={t.priority} />
                          {assignee &&
                        <Avatar
                          name={assignee.name}
                          color={assignee.avatarColor}
                          size="sm" />

                        }
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-line">
                          <button
                          onClick={() => move(t.id, -1, t.status)}
                          disabled={col === 'Todo'}
                          aria-label="Move task back"
                          className="p-1 rounded-lg text-secondary hover:text-accent disabled:opacity-30">
                          
                            <ChevronLeft size={16} />
                          </button>
                          <span className="text-[11px] text-secondary">
                            Due {formatDate(t.dueDate)}
                          </span>
                          <button
                          onClick={() => move(t.id, 1, t.status)}
                          disabled={col === 'Completed'}
                          aria-label="Move task forward"
                          className="p-1 rounded-lg text-secondary hover:text-accent disabled:opacity-30">
                          
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>);

                })}
                  {colTasks.length === 0 &&
                <p className="text-xs text-secondary text-center py-6">
                      No tasks
                    </p>
                }
                </div>
              </div>);

        })}
        </div>
      }
    </div>);

}

export default function BoardPage() {
  return (
    <AppLayout>
      <Board />
    </AppLayout>
  );
}
