import React from 'react';
import { ShieldCheck, Check, X } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { AppLayout } from '../components/layout/AppLayout';
const permissions = [
'Manage users',
'Manage roles',
'Create projects',
'Assign tasks',
'Update tasks',
'View assigned work'];

const matrix: Record<string, boolean[]> = {
  Administrator: [true, true, true, true, true, true],
  'Project Manager': [false, false, true, true, true, true],
  'Team Member': [false, false, false, false, true, true]
};
export function Roles() {
  return (
    <div>
      <PageHeader
        title="Role Management"
        subtitle="Control permissions and system access" />
      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {Object.keys(matrix).map((role) =>
        <Card key={role} className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent flex items-center justify-center text-accent">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h3 className="font-medium text-maintext">{role}</h3>
                <p className="text-xs text-secondary">
                  {matrix[role].filter(Boolean).length} permissions
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>

      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-line">
          <h2 className="font-display font-semibold text-maintext">
            Permission matrix
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-secondary">
                <th className="px-6 py-3 font-medium">Permission</th>
                {Object.keys(matrix).map((r) =>
                <th key={r} className="px-6 py-3 font-medium text-center">
                    {r.split(' ')[0]}
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {permissions.map((perm, i) =>
              <tr key={perm}>
                  <td className="px-6 py-3 text-sm text-maintext">{perm}</td>
                  {Object.keys(matrix).map((r) =>
                <td key={r} className="px-6 py-3 text-center">
                      {matrix[r][i] ?
                  <Check size={16} className="inline text-accent" /> :

                  <X size={16} className="inline text-secondary/40" />
                  }
                    </td>
                )}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default function RolesPage() {
  return (
    <AppLayout>
      <Roles />
    </AppLayout>
  );
}
