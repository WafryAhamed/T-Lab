import React, { useState } from 'react';
import { Moon, Sun, Monitor, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { Tabs } from '../components/ui/Tabs';
import { Spinner } from '../components/ui/Spinner';
import { AppLayout } from '../components/layout/AppLayout';
import { cn } from '../lib/utils';
const tabList = ['Profile', 'Password', 'Theme', 'Notifications', 'Security'];
function Toggle({
  checked,
  onChange,
  label




}: {checked: boolean;onChange: () => void;label: string;}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cn(
        'relative h-6 w-11 rounded-full transition-colors shrink-0',
        checked ? 'bg-accent' : 'bg-bg border border-line'
      )}>
      
      <span
        className={cn(
          'absolute top-0.5 h-5 w-5 rounded-full transition-transform',
          checked ?
          'translate-x-[22px] bg-black' :
          'translate-x-0.5 bg-card border border-line'
        )} />
      
    </button>);

}
export function Settings() {
  const { theme, setTheme } = useTheme();
  const { currentUser } = useAuth();
  const [tab, setTab] = useState('Profile');
  const [saving, setSaving] = useState(false);
  const [pw, setPw] = useState({
    current: '',
    next: '',
    confirm: ''
  });
  const [pwErrors, setPwErrors] = useState<{
    current?: string;
    next?: string;
    confirm?: string;
  }>({});
  const [notifs, setNotifs] = useState({
    taskAssigned: true,
    taskUpdated: true,
    deadlines: true,
    mentions: true,
    weeklyDigest: false
  });
  const saveProfile = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Profile settings saved');
    }, 700);
  };
  const changePassword = () => {
    const e: typeof pwErrors = {};
    if (!pw.current) e.current = 'Current password is required';
    if (pw.next.length < 8) e.next = 'Password must be at least 8 characters';
    if (pw.confirm !== pw.next) e.confirm = 'Passwords do not match';
    setPwErrors(e);
    if (Object.keys(e).length > 0) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setPw({
        current: '',
        next: '',
        confirm: ''
      });
      toast.success('Password updated successfully');
    }, 700);
  };
  const applySystemTheme = () => {
    const prefersLight =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: light)').matches;
    setTheme(prefersLight ? 'light' : 'dark');
    toast.success(
      `Matched system preference: ${prefersLight ? 'Light' : 'Dark'} mode`
    );
  };
  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Settings"
        subtitle="Manage your account and preferences" />
      

      <div className="mb-6">
        <Tabs tabs={tabList} active={tab} onChange={setTab} />
      </div>

      {tab === 'Profile' &&
      <Card className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full name" defaultValue={currentUser?.name} />
            <Input label="Email" defaultValue={currentUser?.email} />
            <Input label="Phone" defaultValue={currentUser?.phone} />
            <Input label="Department" defaultValue={currentUser?.department} />
          </div>
          <Select label="Language" defaultValue="English">
            <option>English</option>
          </Select>
          <div className="flex justify-end">
            <Button onClick={saveProfile} disabled={saving}>
              {saving && <Spinner size={14} />}{' '}
              {saving ? 'Saving…' : 'Save changes'}
            </Button>
          </div>
        </Card>
      }

      {tab === 'Password' &&
      <Card className="p-6 space-y-4">
          <Input
          label="Current password"
          type="password"
          value={pw.current}
          onChange={(e) =>
          setPw({
            ...pw,
            current: e.target.value
          })
          }
          error={pwErrors.current} />
        
          <Input
          label="New password"
          type="password"
          value={pw.next}
          onChange={(e) =>
          setPw({
            ...pw,
            next: e.target.value
          })
          }
          error={pwErrors.next} />
        
          <Input
          label="Confirm new password"
          type="password"
          value={pw.confirm}
          onChange={(e) =>
          setPw({
            ...pw,
            confirm: e.target.value
          })
          }
          error={pwErrors.confirm} />
        
          <div className="flex justify-end">
            <Button onClick={changePassword} disabled={saving}>
              {saving && <Spinner size={14} />}{' '}
              {saving ? 'Updating…' : 'Update password'}
            </Button>
          </div>
        </Card>
      }

      {tab === 'Theme' &&
      <Card className="p-6">
          <h2 className="font-medium text-maintext mb-1">Appearance</h2>
          <p className="text-sm text-secondary mb-5">
            Choose how T LAB looks for you
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
            onClick={() => setTheme('dark')}
            className={cn(
              'flex flex-col items-center gap-2 p-5 rounded-xl border transition-colors',
              theme === 'dark' ?
              'border-accent' :
              'border-line hover:border-accent'
            )}
            aria-pressed={theme === 'dark'}>
            
              <Moon
              size={22}
              className={theme === 'dark' ? 'text-accent' : 'text-secondary'} />
            
              <span className="text-sm font-medium text-maintext">Dark</span>
              <span className="text-xs text-secondary">Default</span>
            </button>
            <button
            onClick={() => setTheme('light')}
            className={cn(
              'flex flex-col items-center gap-2 p-5 rounded-xl border transition-colors',
              theme === 'light' ?
              'border-accent' :
              'border-line hover:border-accent'
            )}
            aria-pressed={theme === 'light'}>
            
              <Sun
              size={22}
              className={theme === 'light' ? 'text-accent' : 'text-secondary'} />
            
              <span className="text-sm font-medium text-maintext">Light</span>
              <span className="text-xs text-secondary">Bright & clean</span>
            </button>
            <button
            onClick={applySystemTheme}
            className="flex flex-col items-center gap-2 p-5 rounded-xl border border-line hover:border-accent transition-colors">
            
              <Monitor size={22} className="text-secondary" />
              <span className="text-sm font-medium text-maintext">System</span>
              <span className="text-xs text-secondary">Match device</span>
            </button>
          </div>
        </Card>
      }

      {tab === 'Notifications' &&
      <Card className="p-6 divide-y divide-line">
          {(
        [
        [
        'taskAssigned',
        'Task assigned',
        'When a task is assigned to you'],

        ['taskUpdated', 'Task updated', 'When tasks you follow change'],
        ['deadlines', 'Deadline reminders', 'Reminders before due dates'],
        [
        'mentions',
        'Mentions',
        'When someone mentions you in a comment'],

        [
        'weeklyDigest',
        'Weekly digest',
        'A summary of the week every Monday']] as

        const).
        map(([key, label, desc]) =>
        <div
          key={key}
          className="flex items-center justify-between py-4 first:pt-0 last:pb-0 gap-4">
          
              <div>
                <p className="text-sm font-medium text-maintext">{label}</p>
                <p className="text-xs text-secondary mt-0.5">{desc}</p>
              </div>
              <Toggle
            checked={notifs[key]}
            onChange={() => {
              setNotifs((n) => ({
                ...n,
                [key]: !n[key]
              }));
              toast.success('Notification preference saved');
            }}
            label={label} />
          
            </div>
        )}
        </Card>
      }

      {tab === 'Security' &&
      <Card className="p-6 space-y-5">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-bg border border-line flex items-center justify-center text-accent shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-maintext">
                Two-factor authentication
              </p>
              <p className="text-xs text-secondary mt-0.5">
                Protect your account with an additional verification step.
              </p>
            </div>
            <div className="ml-auto">
              <Button
              size="sm"
              variant="secondary"
              onClick={() => toast.success('Two-factor setup email sent')}>
              
                Enable
              </Button>
            </div>
          </div>
          <div className="pt-5 border-t border-line">
            <p className="text-sm font-medium text-maintext mb-3">
              Active sessions
            </p>
            <div className="space-y-2">
              {[
            ['Chrome · Colombo, Sri Lanka', 'Current session'],
            ['Mobile app · Kandy, Sri Lanka', 'Last active 2 hours ago']].
            map(([device, meta]) =>
            <div
              key={device}
              className="flex items-center justify-between p-3 rounded-xl bg-bg border border-line">
              
                  <div>
                    <p className="text-sm text-maintext">{device}</p>
                    <p className="text-xs text-secondary">{meta}</p>
                  </div>
                  <Button
                size="sm"
                variant="ghost"
                onClick={() => toast.success('Session revoked')}>
                
                    Revoke
                  </Button>
                </div>
            )}
            </div>
          </div>
        </Card>
      }
    </div>
  );
}

export default function SettingsPage() {
  return (
    <AppLayout>
      <Settings />
    </AppLayout>
  );
}
