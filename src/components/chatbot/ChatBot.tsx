import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, Maximize2, Minimize2 } from 'lucide-react';
import { ChatMessage } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { taskCounts } from '../../lib/projectUtils';
import { cn } from '../../lib/utils';
const suggestions = [
'Summarize this project',
'Summarize my tasks',
'Give team progress summary',
'Project risk summary',
'Deadline prediction',
'Workload summary',
'Productivity insights'];

export function ChatBot() {
  const { currentUser } = useAuth();
  const { tasks, projects, users, auditLogs } = useData();
  const [open, setOpen] = useState(false);
  const [large, setLarge] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
  {
    id: 'm0',
    role: 'assistant',
    content: `Ayubowan ${currentUser?.name?.split(' ')[0] || 'there'} 👋 I'm your T LAB assistant. Ask me for a summary or insight.`
  }]
  );
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages, loading]);
  const generateReply = (text: string): string => {
    const q = text.toLowerCase();
    if (q.includes('risk')) {
      const overdueSoon = tasks.filter(
        (t) => t.status !== 'Completed' && t.dueDate <= '2026-07-20'
      );
      const urgent = tasks.filter(
        (t) => t.priority === 'Urgent' && t.status !== 'Completed'
      );
      return `Project risk summary\n\n⚠ ${urgent.length} urgent tasks are still open — including "${urgent[0]?.title}".\n⏰ ${overdueSoon.length} tasks are due within the next 10 days.\n\nHighest risk: Smart Colombo — the citizen portal payment flow is urgent and due July 18.\nLanka HR System's EPF/ETF engine must pass compliance review on July 22.\n\nRecommendation: rebalance work from Tharindu Silva and Dinithi Perera before next sprint.`;
    }
    if (q.includes('deadline') || q.includes('predict')) {
      return `Deadline prediction\n\nBased on current velocity:\n\n• Smart Colombo — Citizen portal beta likely lands Aug 4 (5 days late). Consider moving the feedback widget to a later sprint.\n• Lanka HR System — EPF/ETF module on track for July 20.\n• National Education Platform — teacher onboarding trending 3 days early.\n\nOverall on-time delivery confidence: 78%.`;
    }
    if (q.includes('workload')) {
      const members = users.filter(
        (u) => u.role === 'Team Member' && u.status === 'Active'
      );
      const lines = members.
      map((m) => ({
        m,
        n: tasks.filter(
          (t) => t.assigneeId === m.id && t.status !== 'Completed'
        ).length
      })).
      sort((a, b) => b.n - a.n).
      slice(0, 5).
      map(({ m, n }) => `• ${m.name} (${m.city}): ${n} open tasks`).
      join('\n');
      return `Workload summary\n\n${lines}\n\nRuwan Wickramasinghe and Lahiru Bandara are carrying the heaviest load. Sachini Jayasinghe has capacity for one more design task.`;
    }
    if (q.includes('approval') || q.includes('pending')) {
      const review = tasks.filter((t) => t.status === 'Review');
      return `Pending approvals\n\n${review.length} tasks are waiting in Review:\n\n${review.map((t) => `• ${t.title} — ${users.find((u) => u.id === t.assigneeId)?.name}`).join('\n')}\n\nOldest item has been in Review for 2 days. Nadeesha Fernando and Yasiru Gunawardena are the approvers.`;
    }
    if (q.includes('recent') || q.includes('changes')) {
      const recent = auditLogs.slice(0, 5);
      return `Recent changes\n\n${recent.map((l) => `• ${users.find((u) => u.id === l.actorId)?.name}: ${l.action} — ${l.target}`).join('\n')}\n\nActivity is concentrated on Smart Colombo and Lanka HR System this week.`;
    }
    if (q.includes('productivity') || q.includes('insight')) {
      const c = taskCounts(tasks);
      return `Productivity insights\n\n📈 Completion rate: ${Math.round(c.completed / c.total * 100)}% across ${c.total} tasks.\n🔥 Best performing project: Ceylon Pay Gateway (100% complete).\n🕐 Average actual vs estimated hours: +8% over estimate.\n\nTip: tasks estimated over 30 hours run late 2× more often — consider splitting the offline lesson sync work.`;
    }
    if (q.includes('project')) {
      const p = projects[0];
      const c = taskCounts(tasks.filter((t) => t.projectId === p.id));
      return `Project overview — ${p.name}\n\n${p.description}\n\nStatus: ${p.status} · Manager: ${users.find((u) => u.id === p.managerId)?.name}\nProgress: ${Math.round(c.completed / Math.max(1, c.total) * 100)}% complete\nCompleted: ${c.completed} · In review: ${c.review} · Pending: ${c.todo + c.inProgress}\n\nImportant update: sensor integration shipped; the payment flow is the current priority.`;
    }
    if (q.includes('my task') || q.includes('task') && !q.includes('team')) {
      const mine = tasks.filter((t) => t.assigneeId === currentUser?.id);
      const c = taskCounts(mine);
      return `Your task summary\n\nAssigned tasks: ${c.total}\nCompleted: ${c.completed}\nIn review: ${c.review}\nIn progress: ${c.inProgress}\nTo do: ${c.todo}\n\nNext up: focus on in-progress items before their due dates.`;
    }
    if (q.includes('team')) {
      const c = taskCounts(tasks);
      return `Team progress summary\n\nActivity across all projects is steady.\nCompleted work: ${c.completed} tasks\nIn review: ${c.review} tasks\nRemaining: ${c.todo + c.inProgress} tasks.\n\nThe team is trending toward on-time delivery across Colombo, Kandy, and Jaffna initiatives.`;
    }
    return `I can help with summaries and insights. Try: "Project risk summary", "Deadline prediction", "Workload summary", "Pending approvals", "Recent changes", or "Productivity insights".`;
  };
  const send = (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: ChatMessage = {
      id: `u${Date.now()}`,
      role: 'user',
      content: text
    };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const reply = generateReply(text);
      setMessages((m) => [
      ...m,
      {
        id: `a${Date.now()}`,
        role: 'assistant',
        content: reply
      }]
      );
      setLoading(false);
    }, 1100);
  };
  return (
    <>
      <motion.button
        whileHover={{
          scale: 1.05
        }}
        whileTap={{
          scale: 0.95
        }}
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AI assistant"
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-2xl bg-accent text-black flex items-center justify-center shadow-lg">
        
        {open ? <X size={24} /> : <Bot size={24} />}
      </motion.button>

      <AnimatePresence>
        {open &&
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.96
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1
          }}
          exit={{
            opacity: 0,
            y: 20,
            scale: 0.96
          }}
          transition={{
            duration: 0.2
          }}
          className={cn(
            'fixed bottom-24 right-6 z-40 bg-bg border border-line rounded-2xl shadow-2xl flex flex-col overflow-hidden',
            large ?
            'w-[calc(100vw-3rem)] max-w-2xl h-[calc(100vh-9rem)] max-h-[44rem]' :
            'w-[calc(100vw-3rem)] max-w-sm h-[32rem]'
          )}>
          
            <div className="flex items-center gap-2 px-4 h-14 border-b border-line bg-card shrink-0">
              <div className="h-8 w-8 rounded-xl bg-accent flex items-center justify-center text-black">
                <Sparkles size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-maintext leading-none">
                  T LAB Assistant
                </p>
                <p className="text-[11px] text-secondary mt-0.5">
                  Summaries, risks & insights
                </p>
              </div>
              <button
              onClick={() => setLarge((l) => !l)}
              aria-label={large ? 'Shrink chat window' : 'Expand chat window'}
              className="ml-auto p-1.5 rounded-lg text-secondary hover:text-accent">
              
                {large ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m) =>
            <div
              key={m.id}
              className={
              m.role === 'user' ?
              'flex justify-end' :
              'flex justify-start'
              }>
              
                  <div
                className={
                m.role === 'user' ?
                'bg-accent text-black rounded-2xl rounded-br-md px-3.5 py-2.5 text-sm max-w-[85%] whitespace-pre-line' :
                'bg-card text-maintext border border-line rounded-2xl rounded-bl-md px-3.5 py-2.5 text-sm max-w-[90%] whitespace-pre-line'
                }>
                
                    {m.content}
                  </div>
                </div>
            )}
              {loading &&
            <div className="flex justify-start">
                  <div
                className="bg-card border border-line rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5"
                aria-label="Assistant is typing">
                
                    {[0, 1, 2].map((i) =>
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                  animate={{
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2
                  }} />

                )}
                  </div>
                </div>
            }
              <div ref={endRef} />
            </div>

            <div className="px-4 pb-2 flex flex-wrap gap-2 shrink-0">
              {suggestions.slice(0, large ? 7 : 3).map((s) =>
            <button
              key={s}
              onClick={() => send(s)}
              className="text-xs border border-accent text-accent rounded-full px-3 py-1.5 hover:bg-accent hover:text-black transition-colors">
              
                  {s}
                </button>
            )}
            </div>

            <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="p-3 border-t border-line flex items-center gap-2 shrink-0">
            
              <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for a summary or insight…"
              aria-label="Message"
              className="flex-1 bg-card border border-line rounded-xl px-3 py-2 text-sm text-maintext placeholder:text-secondary/60 focus:outline-none focus:border-accent" />
            
              <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="h-9 w-9 rounded-xl bg-accent text-black flex items-center justify-center disabled:opacity-50 shrink-0">
              
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}