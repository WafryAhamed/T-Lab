import React from 'react';
import { MapPin, Briefcase } from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { useData } from '../context/DataContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
export function Team() {
  const { users, tasks } = useData();
  return (
    <div>
      <PageHeader title="Team" subtitle="People across LankaTech Solutions" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {users.map((u) => {
          const openTasks = tasks.filter(
            (t) => t.assigneeId === u.id && t.status !== 'Completed'
          ).length;
          return (
            <Card
              key={u.id}
              className="p-6 flex flex-col items-center text-center">
              
              <Avatar name={u.name} color={u.avatarColor} size="lg" />
              <h3 className="font-medium text-maintext mt-3">{u.name}</h3>
              <p className="text-sm text-secondary">{u.email}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-secondary">
                <span className="flex items-center gap-1">
                  <Briefcase size={11} /> {u.department}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={11} /> {u.city}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2 flex-wrap justify-center">
                <Badge
                  variant={u.role === 'Administrator' ? 'accent' : 'outline'}>
                  
                  {u.role}
                </Badge>
                {openTasks > 0 &&
                <Badge variant="neutral">{openTasks} open tasks</Badge>
                }
              </div>
            </Card>);

        })}
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <AppLayout>
      <Team />
    </AppLayout>
  );
}
