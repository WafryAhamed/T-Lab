import { Task } from '../types';

export function projectProgressFrom(tasks: Task[], projectId: string): number {
  const ts = tasks.filter((t) => t.projectId === projectId);
  if (ts.length === 0) return 0;
  const done = ts.filter((t) => t.status === 'Completed').length;
  return Math.round(done / ts.length * 100);
}

export function taskCounts(ts: Task[]) {
  return {
    total: ts.length,
    todo: ts.filter((t) => t.status === 'Todo').length,
    inProgress: ts.filter((t) => t.status === 'In Progress').length,
    review: ts.filter((t) => t.status === 'Review').length,
    completed: ts.filter((t) => t.status === 'Completed').length
  };
}