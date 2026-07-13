import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';

export default function RegisterPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<Role>('Team Member');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
    router.push('/dashboard');
  };
  return (
    <div className="min-h-screen w-full bg-bg flex items-center justify-center p-4">
      <motion.div
        initial={{
          opacity: 0,
          y: 12
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="w-full max-w-md">
        
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="h-11 w-11 rounded-xl bg-accent flex items-center justify-center font-display font-bold text-black text-xl">
            T
          </div>
          <span className="font-display font-bold text-maintext text-2xl">
            T LAB
          </span>
        </div>

        <div className="bg-card border border-line rounded-2xl p-7">
          <h1 className="font-display text-xl font-bold text-maintext">
            Create account
          </h1>
          <p className="text-sm text-secondary mt-1 mb-6">
            Start managing your projects
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full name" placeholder="Kasun Perera" required />
            <Input
              label="Email"
              type="email"
              placeholder="kasun@lankatech.lk"
              required />
            
            <Input
              label="Password"
              type="password"
              placeholder="Create a password"
              required />
            
            <Select
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}>
              
              <option>Administrator</option>
              <option>Project Manager</option>
              <option>Team Member</option>
            </Select>
            <Button type="submit" className="w-full" size="lg">
              Create account
            </Button>
          </form>

          <p className="text-sm text-secondary text-center mt-6">
            Already have an account?{' '}
            <button
              onClick={() => router.push('/login')}
              className="text-accent font-medium hover:underline">
              
              Sign in
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
