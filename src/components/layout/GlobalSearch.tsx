import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  Search,
  FolderKanban,
  CheckSquare,
  User as UserIcon } from
'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
export function GlobalSearch() {
  const { users, projects, tasks } = useData();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  const q = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!q)
    return {
      projects: [],
      tasks: [],
      users: []
    };
    return {
      projects: projects.
      filter(
        (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      ).
      slice(0, 4),
      tasks: tasks.filter((t) => t.title.toLowerCase().includes(q)).slice(0, 5),
      users: users.
      filter(
        (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      ).
      slice(0, 4)
    };
  }, [q, projects, tasks, users]);
  const hasResults =
  results.projects.length + results.tasks.length + results.users.length > 0;
  const go = (path: string) => {
    setOpen(false);
    setQuery('');
    router.push(path);
  };
  return (
    <div className="relative flex-1 max-w-md" ref={ref}>
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
        size={16} />
      
      <input
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => query && setOpen(true)}
        placeholder="Search projects, tasks, people…"
        aria-label="Global search"
        className="w-full bg-bg border border-line rounded-xl pl-9 pr-3 py-2 text-sm text-maintext placeholder:text-secondary/60 focus:outline-none focus:border-accent" />
      
      <AnimatePresence>
        {open && q &&
        <motion.div
          initial={{
            opacity: 0,
            y: -4
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: -4
          }}
          transition={{
            duration: 0.12
          }}
          className="absolute left-0 right-0 mt-2 bg-card border border-line rounded-2xl shadow-xl z-50 overflow-hidden max-h-96 overflow-y-auto">
          
            {!hasResults &&
          <p className="p-5 text-sm text-secondary text-center">
                No results for “{query}”.
              </p>
          }
            {results.projects.length > 0 &&
          <div>
                <p className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-secondary">
                  Projects
                </p>
                {results.projects.map((p) =>
            <button
              key={p.id}
              onClick={() => go(`/projects/${p.id}`)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-bg">
              
                    <FolderKanban size={15} className="text-accent shrink-0" />
                    <span className="text-sm text-maintext truncate">
                      {p.name}
                    </span>
                  </button>
            )}
              </div>
          }
            {results.tasks.length > 0 &&
          <div>
                <p className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-secondary">
                  Tasks
                </p>
                {results.tasks.map((t) =>
            <button
              key={t.id}
              onClick={() => go(`/tasks/${t.id}`)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-bg">
              
                    <CheckSquare
                size={15}
                className="text-secondary shrink-0" />
              
                    <span className="text-sm text-maintext truncate">
                      {t.title}
                    </span>
                  </button>
            )}
              </div>
          }
            {results.users.length > 0 &&
          <div className="pb-1">
                <p className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-secondary">
                  People
                </p>
                {results.users.map((u) =>
            <button
              key={u.id}
              onClick={() => go('/team')}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-bg">
              
                    <UserIcon size={15} className="text-secondary shrink-0" />
                    <span className="text-sm text-maintext truncate">
                      {u.name}
                    </span>
                    <span className="text-xs text-secondary truncate ml-auto">
                      {u.department}
                    </span>
                  </button>
            )}
              </div>
          }
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}