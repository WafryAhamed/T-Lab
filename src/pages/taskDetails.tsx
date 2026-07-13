import React, { useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import {
  ArrowLeft,
  Send,
  CheckSquare,
  FileText,
  Image as ImageIcon,
  FileSpreadsheet,
  FileArchive,
  File,
  Pencil,
  Trash2,
  Reply,
  Clock,
  Eye } from
'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { TaskStatus, AttachmentType, TaskComment } from '../types';
import { formatDate, cn } from '../lib/utils';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Textarea } from '../components/ui/Input';
import { Avatar } from '../components/ui/Avatar';
import { StatusBadge } from '../components/ui/StatusBadge';
import { PriorityBadge } from '../components/ui/PriorityBadge';
import { EmptyState } from '../components/ui/EmptyState';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { AppLayout } from '../components/layout/AppLayout';
import { Modal } from '../components/ui/Modal';
import { ProgressBar } from '../components/ui/ProgressBar';
const flow: TaskStatus[] = ['Todo', 'In Progress', 'Review', 'Completed'];
const fileIcon: Record<AttachmentType, React.ElementType> = {
  pdf: FileText,
  image: ImageIcon,
  word: File,
  excel: FileSpreadsheet,
  zip: FileArchive
};
function renderMentions(text: string) {
  const parts = text.split(/(@[A-Z][a-z]+ [A-Z][a-z]+)/g);
  return parts.map((part, i) =>
  part.startsWith('@') ?
  <span key={i} className="text-accent font-medium">
        {part}
      </span> :

  <Fragment key={i}>{part}</Fragment>

  );
}
export function TaskDetails() {
  const router = useRouter();
  const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
  const { currentUser } = useAuth();
  const {
    tasks,
    users,
    projects,
    updateTaskStatus,
    addComment,
    editComment,
    deleteComment
  } = useData();
  const task = tasks.find((t) => t.id === id);
  const [note, setNote] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [deleteCommentId, setDeleteCommentId] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  if (!task) {
    return (
      <Card>
        <EmptyState
          icon={CheckSquare}
          title="Task not found"
          action={
          <Button onClick={() => router.push('/tasks')}>Back to tasks</Button>
          } />
        
      </Card>);

  }
  const assignee = users.find((u) => u.id === task.assigneeId);
  const project = projects.find((p) => p.id === task.projectId);
  const hoursPct =
  task.estimatedHours > 0 ?
  Math.min(
    100,
    Math.round(task.actualHours / task.estimatedHours * 100)
  ) :
  0;
  const changeStatus = (s: TaskStatus) => {
    updateTaskStatus(task.id, s, currentUser?.id);
    toast.success(`Status updated to ${s === 'Todo' ? 'To Do' : s}`);
  };
  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    addComment(task.id, {
      id: `c${Date.now()}`,
      authorId: currentUser?.id || 'u3',
      text: note,
      timestamp: 'Just now',
      replies: []
    });
    setNote('');
    toast.success('Comment added');
  };
  const submitReply = (parentId: string) => {
    if (!replyText.trim()) return;
    addComment(
      task.id,
      {
        id: `c${Date.now()}`,
        authorId: currentUser?.id || 'u3',
        text: replyText,
        timestamp: 'Just now',
        replies: []
      },
      parentId
    );
    setReplyTo(null);
    setReplyText('');
    toast.success('Reply added');
  };
  const saveEdit = () => {
    if (!editingId || !editText.trim()) return;
    editComment(task.id, editingId, editText);
    setEditingId(null);
    toast.success('Comment updated');
  };
  const CommentBlock = ({
    comment,
    isReply = false



  }: {comment: TaskComment;isReply?: boolean;}) => {
    const author = users.find((u) => u.id === comment.authorId);
    const isMine = comment.authorId === currentUser?.id;
    return (
      <div className={cn('flex gap-3', isReply && 'ml-10 mt-3')}>
        <Avatar
          name={author?.name || '?'}
          color={author?.avatarColor}
          size="sm" />
        
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-maintext">
              {author?.name}
            </span>
            <span className="text-xs text-secondary">{comment.timestamp}</span>
          </div>
          {editingId === comment.id ?
          <div className="mt-2 space-y-2">
              <Textarea
              rows={2}
              value={editText}
              onChange={(e) => setEditText(e.target.value)} />
            
              <div className="flex gap-2">
                <Button size="sm" onClick={saveEdit}>
                  Save
                </Button>
                <Button
                size="sm"
                variant="secondary"
                onClick={() => setEditingId(null)}>
                
                  Cancel
                </Button>
              </div>
            </div> :

          <p className="text-sm text-secondary mt-0.5">
              {renderMentions(comment.text)}
            </p>
          }
          <div className="flex items-center gap-3 mt-1.5">
            {!isReply &&
            <button
              onClick={() => {
                setReplyTo(replyTo === comment.id ? null : comment.id);
                setReplyText('');
              }}
              className="flex items-center gap-1 text-xs text-secondary hover:text-accent">
              
                <Reply size={12} /> Reply
              </button>
            }
            {isMine &&
            <>
                <button
                onClick={() => {
                  setEditingId(comment.id);
                  setEditText(comment.text);
                }}
                className="flex items-center gap-1 text-xs text-secondary hover:text-accent">
                
                  <Pencil size={12} /> Edit
                </button>
                <button
                onClick={() => setDeleteCommentId(comment.id)}
                className="flex items-center gap-1 text-xs text-secondary hover:text-red-500">
                
                  <Trash2 size={12} /> Delete
                </button>
              </>
            }
          </div>
          {replyTo === comment.id &&
          <div className="mt-2 flex items-end gap-2">
              <Textarea
              rows={2}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Reply to ${author?.name}… use @Name to mention`} />
            
              <Button
              size="sm"
              onClick={() => submitReply(comment.id)}
              aria-label="Send reply">
              
                <Send size={14} />
              </Button>
            </div>
          }
          {comment.replies.map((r) =>
          <CommentBlock key={r.id} comment={r} isReply />
          )}
        </div>
      </div>);

  };
  return (
    <div>
      <button
        onClick={() => router.push('/tasks')}
        className="flex items-center gap-1 text-sm text-secondary hover:text-accent mb-4">
        
        <ArrowLeft size={16} /> Back to tasks
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <h1 className="font-display text-xl font-bold text-maintext">
                {task.title}
              </h1>
              <div className="flex items-center gap-2">
                <PriorityBadge priority={task.priority} />
                <StatusBadge status={task.status} />
              </div>
            </div>
            <p className="text-sm text-secondary mt-3">{task.description}</p>
          </Card>

          <Card className="p-6">
            <h2 className="font-display font-semibold text-maintext mb-4">
              Update status
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {flow.map((s) =>
              <button
                key={s}
                onClick={() => changeStatus(s)}
                className={cn(
                  'py-3 rounded-xl text-sm font-medium border transition-colors',
                  task.status === s ?
                  'bg-accent text-black border-accent' :
                  'bg-bg border-line text-secondary hover:border-accent'
                )}>
                
                  {s === 'Todo' ? 'To Do' : s}
                </button>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-display font-semibold text-maintext mb-4">
              Comments ({task.comments.length})
            </h2>
            <div className="space-y-5 mb-5">
              {task.comments.length === 0 &&
              <p className="text-sm text-secondary">
                  No comments yet. Start the conversation.
                </p>
              }
              {task.comments.map((c) =>
              <CommentBlock key={c.id} comment={c} />
              )}
            </div>
            <form onSubmit={submitComment} className="flex items-end gap-3">
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                placeholder="Add a comment… use @Name to mention teammates" />
              
              <Button
                type="submit"
                aria-label="Send comment"
                className="mb-0.5">
                
                <Send size={16} />
              </Button>
            </form>
          </Card>

          <Card className="p-6">
            <h2 className="font-display font-semibold text-maintext mb-4">
              Activity history
            </h2>
            <ol className="relative border-l border-line ml-3 space-y-5">
              {task.activity.map((a) => {
                const actor = users.find((u) => u.id === a.actorId);
                return (
                  <li key={a.id} className="ml-5">
                    <span
                      className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-accent"
                      aria-hidden="true" />
                    
                    <p className="text-sm text-maintext">
                      <span className="font-medium">{actor?.name}</span>{' '}
                      {a.text}
                    </p>
                    <p className="text-xs text-secondary mt-0.5">
                      {a.timestamp}
                    </p>
                  </li>);

              })}
            </ol>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-display font-semibold text-maintext mb-4">
              Details
            </h2>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-secondary">Assignee</dt>
                <dd className="flex items-center gap-2 mt-1 text-maintext">
                  {assignee &&
                  <Avatar
                    name={assignee.name}
                    color={assignee.avatarColor}
                    size="sm" />

                  }
                  {assignee?.name}
                </dd>
              </div>
              <div>
                <dt className="text-secondary">Project</dt>
                <dd className="mt-1 text-maintext">{project?.name}</dd>
              </div>
              <div>
                <dt className="text-secondary">Due date</dt>
                <dd className="mt-1 text-maintext">
                  {formatDate(task.dueDate)}
                </dd>
              </div>
            </dl>
          </Card>

          <Card className="p-6">
            <h2 className="font-display font-semibold text-maintext mb-4 flex items-center gap-2">
              <Clock size={16} /> Time tracking
            </h2>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-secondary">Actual vs estimated</span>
              <span className="text-maintext font-medium">
                {task.actualHours}h / {task.estimatedHours}h
              </span>
            </div>
            <ProgressBar value={hoursPct} showLabel />
          </Card>

          <Card className="p-6">
            <h2 className="font-display font-semibold text-maintext mb-4">
              Attachments ({task.attachments.length})
            </h2>
            {task.attachments.length === 0 &&
            <p className="text-sm text-secondary">
                No attachments on this task.
              </p>
            }
            <div className="space-y-2">
              {task.attachments.map((a) => {
                const Icon = fileIcon[a.type];
                return (
                  <button
                    key={a.id}
                    onClick={() => setPreviewFile(a.name)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-bg border border-line hover:border-accent transition-colors text-left">
                    
                    <span className="h-9 w-9 rounded-xl border border-line flex items-center justify-center text-accent shrink-0">
                      <Icon size={16} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-maintext truncate">
                        {a.name}
                      </span>
                      <span className="block text-xs text-secondary uppercase">
                        {a.type} · {a.size}
                      </span>
                    </span>
                    <Eye size={14} className="text-secondary shrink-0" />
                  </button>);

              })}
            </div>
          </Card>
        </div>
      </div>

      <ConfirmDialog
        open={!!deleteCommentId}
        onClose={() => setDeleteCommentId(null)}
        onConfirm={() => {
          if (deleteCommentId) {
            deleteComment(task.id, deleteCommentId);
            toast.success('Comment deleted');
          }
        }}
        title="Delete comment"
        message="This comment will be permanently removed." />
      

      <Modal
        open={!!previewFile}
        onClose={() => setPreviewFile(null)}
        title={previewFile || 'Preview'}>
        
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="h-16 w-16 rounded-2xl bg-bg border border-line flex items-center justify-center text-accent mb-4">
            <FileText size={28} />
          </div>
          <p className="text-sm text-maintext font-medium">{previewFile}</p>
          <p className="text-xs text-secondary mt-1">
            Preview is available for supported file types in the full
            application.
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default function TaskDetailsPage() {
  return (
    <AppLayout>
      <TaskDetails />
    </AppLayout>
  );
}
