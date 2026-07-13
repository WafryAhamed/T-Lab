import React from 'react';
import { Mail, Phone, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { AppLayout } from '../components/layout/AppLayout';
import { toast } from 'sonner';
export function Profile() {
  const { currentUser } = useAuth();
  if (!currentUser) return null;
  return (
    <div className="max-w-3xl">
      <PageHeader title="Profile" subtitle="Your account information" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 flex flex-col items-center text-center">
          <Avatar
            name={currentUser.name}
            color={currentUser.avatarColor}
            size="lg" />
          
          <h2 className="font-display font-semibold text-maintext text-lg mt-3">
            {currentUser.name}
          </h2>
          <div className="mt-2">
            <Badge variant="accent">{currentUser.role}</Badge>
          </div>
          <dl className="w-full mt-5 space-y-3 text-sm text-left">
            <div className="flex items-center gap-2 text-secondary">
              <Mail size={14} className="text-accent shrink-0" />
              <span className="truncate">{currentUser.email}</span>
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <Phone size={14} className="text-accent shrink-0" />
              {currentUser.phone}
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <MapPin size={14} className="text-accent shrink-0" />
              {currentUser.city}, Sri Lanka
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <Briefcase size={14} className="text-accent shrink-0" />
              {currentUser.department}
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <GraduationCap size={14} className="text-accent shrink-0" />
              {currentUser.experience}
            </div>
          </dl>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="font-display font-semibold text-maintext mb-4">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {currentUser.skills.map((s) =>
              <Badge key={s} variant="outline">
                  {s}
                </Badge>
              )}
              {currentUser.skills.length === 0 &&
              <p className="text-sm text-secondary">No skills added yet.</p>
              }
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-display font-semibold text-maintext mb-4">
              Edit details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Full name" defaultValue={currentUser.name} />
              <Input label="Email" defaultValue={currentUser.email} />
              <Input label="Phone" defaultValue={currentUser.phone} />
              <Input label="Department" defaultValue={currentUser.department} />
            </div>
            <div className="flex justify-end mt-5">
              <Button
                onClick={() => toast.success('Profile updated successfully')}>
                
                Save changes
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AppLayout>
      <Profile />
    </AppLayout>
  );
}
