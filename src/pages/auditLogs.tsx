import React, { useMemo, useState } from 'react';
import { Download, ScrollText } from 'lucide-react';
import { toast } from 'sonner';
import { useData } from '../context/DataContext';
import { AuditCategory } from '../types';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { EmptyState } from '../components/ui/EmptyState';
import { Pagination } from '../components/ui/Pagination';
import { AppLayout } from '../components/layout/AppLayout';
import { cn } from '../lib/utils';
const categories: (AuditCategory | 'All')[] = [
'All',
'User',
'Project',
'Task',
'Auth',
'System'];

const PAGE_SIZE = 8;
export function AuditLogs() {
  const { auditLogs, users } = useData();
  const [filter, setFilter] = useState<AuditCategory | 'All'>('All');
  const [page, setPage] = useState(1);
  const filtered = useMemo(
    () =>
    filter === 'All' ?
    auditLogs :
    auditLogs.filter((l) => l.category === filter),
    [auditLogs, filter]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const exportCsv = () => {
    const rows = [
    ['Timestamp', 'Actor', 'Action', 'Target', 'Category'],
    ...filtered.map((l) => [
    l.timestamp,
    users.find((u) => u.id === l.actorId)?.name || l.actorId,
    l.action,
    l.target,
    l.category]
    )];

    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], {
      type: 'text/csv'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tlab-audit-logs.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Audit log report exported');
  };
  return (
    <div>
      <PageHeader
        title="Audit Logs"
        subtitle="System events across your organization"
        action={
        <Button onClick={exportCsv}>
            <Download size={16} /> Export report
          </Button>
        } />
      

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((c) =>
        <button
          key={c}
          onClick={() => {
            setFilter(c);
            setPage(1);
          }}
          className={cn(
            'text-sm font-medium px-3.5 py-1.5 rounded-full transition-colors',
            filter === c ?
            'bg-accent text-black' :
            'bg-card border border-line text-secondary hover:border-accent'
          )}>
          
            {c}
          </button>
        )}
      </div>

      {filtered.length === 0 ?
      <Card>
          <EmptyState
          icon={ScrollText}
          title="No logs found"
          description="No events match this category." />
        
        </Card> :

      <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-card">
                <tr className="border-b border-line text-xs uppercase tracking-wide text-secondary">
                  <th className="px-5 py-3 font-medium">Actor</th>
                  <th className="px-5 py-3 font-medium">Action</th>
                  <th className="px-5 py-3 font-medium hidden md:table-cell">
                    Target
                  </th>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium hidden sm:table-cell">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {pageItems.map((log) => {
                const actor = users.find((u) => u.id === log.actorId);
                return (
                  <tr key={log.id} className="hover:bg-bg transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <Avatar
                          name={actor?.name || '?'}
                          color={actor?.avatarColor}
                          size="sm" />
                        
                          <span className="text-sm font-medium text-maintext whitespace-nowrap">
                            {actor?.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-sm text-maintext">
                        {log.action}
                      </td>
                      <td className="px-5 py-3 text-sm text-secondary hidden md:table-cell">
                        {log.target}
                      </td>
                      <td className="px-5 py-3">
                        <Badge
                        variant={
                        log.category === 'System' ? 'accent' : 'neutral'
                        }>
                        
                          {log.category}
                        </Badge>
                      </td>
                      <td className="px-5 py-3 text-sm text-secondary hidden sm:table-cell whitespace-nowrap">
                        {log.timestamp}
                      </td>
                    </tr>);

              })}
              </tbody>
            </table>
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </Card>
      }
    </div>);

}

export default function AuditLogsPage() {
  return (
    <AppLayout>
      <AuditLogs />
    </AppLayout>
  );
}
