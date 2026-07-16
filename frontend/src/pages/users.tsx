import React, { useMemo, useState } from 'react';
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  UsersRound,
  ArrowUpDown } from
'lucide-react';
import { toast } from 'sonner';
import { useData } from '../context/DataContext';
import { Role, User, UserStatus } from '../types';
import { createUser, deleteUser, updateUser } from '../lib/api';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { EmptyState } from '../components/ui/EmptyState';
import { Pagination } from '../components/ui/Pagination';
import { AppLayout } from '../components/layout/AppLayout';
import { Spinner } from '../components/ui/Spinner';
const PAGE_SIZE = 6;
export function Users() {
  const { users, setUsers } = useData();
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<Role | 'All'>('All');
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<{
    name: string;
    email: string;
    phone: string;
    department: string;
    city: string;
    role: Role;
    status: UserStatus;
  }>({
    name: '',
    email: '',
    phone: '',
    department: '',
    city: 'Colombo',
    role: 'Team Member',
    status: 'Active'
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
  }>({});
  const filtered = useMemo(() => {
    let list = users.filter(
      (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase())
    );
    if (roleFilter !== 'All') list = list.filter((u) => u.role === roleFilter);
    return [...list].sort((a, b) =>
    sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
  }, [users, query, roleFilter, sortAsc]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const openAdd = () => {
    setEditing(null);
    setForm({
      name: '',
      email: '',
      phone: '',
      department: '',
      city: 'Colombo',
      role: 'Team Member',
      status: 'Active'
    });
    setErrors({});
    setModalOpen(true);
  };
  const openEdit = (u: User) => {
    setEditing(u);
    setForm({
      name: u.name,
      email: u.email,
      phone: u.phone,
      department: u.department,
      city: u.city,
      role: u.role,
      status: u.status
    });
    setErrors({});
    setModalOpen(true);
  };
  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';else
    if (!/^\S+@\S+\.\S+$/.test(form.email))
    e.email = 'Enter a valid email address';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const save = async () => {
    if (!validate()) return;
    setSaving(true);

    try {
      if (editing) {
        const updated = await updateUser(editing.id, {
          name: form.name,
          email: form.email,
          phone: form.phone,
          department: form.department,
          city: form.city,
          role: form.role,
          status: form.status,
        });

        setUsers((l) =>
          l.map((u) =>
            u.id === editing.id
              ? {
                  ...u,
                  ...updated,
                  phone: updated.phone ?? u.phone,
                  department: updated.department ?? u.department,
                  city: updated.city ?? u.city,
                  role: updated.role ?? u.role,
                  status: updated.status ?? u.status,
                }
              : u
          )
        );
        toast.success('User updated successfully');
      } else {
        const created = await createUser({
          name: form.name,
          email: form.email,
          password: 'TempPass123!',
          phone: form.phone,
          department: form.department,
          city: form.city,
          role: form.role,
          status: form.status,
        });

        setUsers((l) => [
          ...l,
          {
            id: created.id,
            avatarColor: '#2C2C2C',
            skills: [],
            experience: 'New member · LankaTech Solutions',
            ...created,
            phone: created.phone ?? form.phone,
            department: created.department ?? form.department,
            city: created.city ?? form.city,
            role: created.role ?? form.role,
            status: created.status ?? form.status,
          },
        ]);
        toast.success('User added successfully');
      }

      setModalOpen(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to save user';
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!deleteId) return;

    try {
      await deleteUser(deleteId);
      setUsers((l) => l.filter((u) => u.id !== deleteId));
      toast.success('User deleted');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to delete user';
      toast.error(message);
    } finally {
      setDeleteId(null);
    }
  };
  return (
    <div>
      <PageHeader
        title="User Management"
        subtitle="Add, edit, and manage system users"
        action={
        <Button onClick={openAdd}>
            <Plus size={16} /> Add user
          </Button>
        } />
      

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="max-w-xs w-full relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
            size={16} />
          
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search users…"
            aria-label="Search users"
            className="w-full bg-bg border border-line rounded-xl pl-9 pr-3 py-2.5 text-sm text-maintext placeholder:text-secondary/60 focus:outline-none focus:border-accent" />
          
        </div>
        <div className="w-48">
          <Select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value as Role | 'All');
              setPage(1);
            }}
            aria-label="Filter by role">
            
            <option value="All">All roles</option>
            <option>Administrator</option>
            <option>Project Manager</option>
            <option>Team Member</option>
          </Select>
        </div>
      </div>

      {filtered.length === 0 ?
      <Card>
          <EmptyState
          icon={UsersRound}
          title="No users found"
          description="Try a different search term or filter." />
        
        </Card> :

      <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-card z-10">
                <tr className="border-b border-line text-xs uppercase tracking-wide text-secondary">
                  <th className="px-5 py-3 font-medium">
                    <button
                    onClick={() => setSortAsc((a) => !a)}
                    className="flex items-center gap-1 hover:text-accent">
                    
                      Name <ArrowUpDown size={12} />
                    </button>
                  </th>
                  <th className="px-5 py-3 font-medium hidden md:table-cell">
                    Email
                  </th>
                  <th className="px-5 py-3 font-medium hidden lg:table-cell">
                    Department
                  </th>
                  <th className="px-5 py-3 font-medium">Role</th>
                  <th className="px-5 py-3 font-medium hidden sm:table-cell">
                    Status
                  </th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {pageItems.map((u) =>
              <tr key={u.id} className="hover:bg-bg transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={u.name} color={u.avatarColor} size="sm" />
                        <div>
                          <span className="text-sm font-medium text-maintext block whitespace-nowrap">
                            {u.name}
                          </span>
                          <span className="text-xs text-secondary">
                            {u.city}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-secondary hidden md:table-cell">
                      {u.email}
                    </td>
                    <td className="px-5 py-3 text-sm text-secondary hidden lg:table-cell">
                      {u.department}
                    </td>
                    <td className="px-5 py-3">
                      <Badge
                    variant={
                    u.role === 'Administrator' ? 'accent' : 'outline'
                    }>
                    
                        {u.role}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 hidden sm:table-cell">
                      <span
                    className={
                    u.status === 'Active' ?
                    'text-sm text-accent' :
                    'text-sm text-secondary'
                    }>
                    
                        {u.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                      onClick={() => openEdit(u)}
                      aria-label={`Edit ${u.name}`}
                      className="p-2 rounded-lg text-secondary hover:text-accent hover:bg-card">
                      
                          <Pencil size={15} />
                        </button>
                        <button
                      onClick={() => setDeleteId(u.id)}
                      aria-label={`Delete ${u.name}`}
                      className="p-2 rounded-lg text-secondary hover:text-red-500 hover:bg-card">
                      
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </Card>
      }

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit user' : 'Add user'}
        footer={
        <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={save} disabled={saving}>
              {saving && <Spinner size={14} />}{' '}
              {saving ? 'Saving…' : editing ? 'Save changes' : 'Add user'}
            </Button>
          </>
        }>
        
        <div className="space-y-4">
          <Input
            label="Name"
            placeholder="e.g. Kasun Perera"
            value={form.name}
            onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value
            })
            }
            error={errors.name} />
          
          <Input
            label="Email"
            type="email"
            placeholder="name@lankatech.lk"
            value={form.email}
            onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
            }
            error={errors.email} />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Phone"
              placeholder="+94 7x xxx xxxx"
              value={form.phone}
              onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value
              })
              } />
            
            <Input
              label="Department"
              placeholder="e.g. Engineering"
              value={form.department}
              onChange={(e) =>
              setForm({
                ...form,
                department: e.target.value
              })
              } />
            
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Select
              label="City"
              value={form.city}
              onChange={(e) =>
              setForm({
                ...form,
                city: e.target.value
              })
              }>
              
              {[
              'Colombo',
              'Kandy',
              'Galle',
              'Kurunegala',
              'Jaffna',
              'Matara',
              'Negombo',
              'Batticaloa'].
              map((c) =>
              <option key={c}>{c}</option>
              )}
            </Select>
            <Select
              label="Role"
              value={form.role}
              onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value as Role
              })
              }>
              
              <option>Administrator</option>
              <option>Project Manager</option>
              <option>Team Member</option>
            </Select>
            <Select
              label="Status"
              value={form.status}
              onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value as UserStatus
              })
              }>
              
              <option>Active</option>
              <option>Inactive</option>
            </Select>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={remove}
        title="Delete user"
        message="This user will lose access to T LAB and be removed from all projects. This action cannot be undone." />
      
    </div>
  );
}

export default function UsersPage() {
  return (
    <AppLayout>
      <Users />
    </AppLayout>
  );
}
