import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
const roles: Role[] = ['Administrator', 'Project Manager', 'Team Member'];

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<Role>('Administrator');
  const [email, setEmail] = useState('kasun@lankatech.lk');
  const [password, setPassword] = useState('••••••••');
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
            Welcome back
          </h1>
          <p className="text-sm text-secondary mt-1 mb-6">
            Sign in to your workspace
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            

            <div>
              <span className="block text-sm font-medium text-secondary mb-2">
                Sign in as
              </span>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((r) =>
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={
                  role === r ?
                  'text-xs font-medium rounded-xl px-2 py-2.5 bg-accent text-black' :
                  'text-xs font-medium rounded-xl px-2 py-2.5 bg-bg border border-line text-secondary hover:border-accent'
                  }>
                  
                    {r.split(' ')[0]}
                  </button>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Sign in
            </Button>
          </form>

          <p className="text-sm text-secondary text-center mt-6">
            No account?{' '}
            <button
              onClick={() => router.push('/register')}
              className="text-accent font-medium hover:underline">
              
              Create one
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
