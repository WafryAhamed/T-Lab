import React, { useState, createContext, useContext } from 'react';
import {
  Task,
  Project,
  User,
  AppNotification,
  AuditLog,
  TaskStatus,
  TaskComment } from
'../types';
import {
  tasks as seedTasks,
  projects as seedProjects,
  users as seedUsers,
  notifications as seedNotifications,
  auditLogs as seedAuditLogs } from
'../data/mockData';
interface DataContextValue {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  auditLogs: AuditLog[];
  updateTaskStatus: (
  taskId: string,
  status: TaskStatus,
  actorId?: string)
  => void;
  addComment: (taskId: string, comment: TaskComment, parentId?: string) => void;
  editComment: (taskId: string, commentId: string, text: string) => void;
  deleteComment: (taskId: string, commentId: string) => void;
}
const DataContext = createContext<DataContextValue | undefined>(undefined);
export function DataProvider({ children }: {children: React.ReactNode;}) {
  const [users, setUsers] = useState<User[]>(seedUsers);
  const [projects, setProjects] = useState<Project[]>(seedProjects);
  const [tasks, setTasks] = useState<Task[]>(seedTasks);
  const [notifications, setNotifications] =
  useState<AppNotification[]>(seedNotifications);
  const [auditLogs] = useState<AuditLog[]>(seedAuditLogs);
  const markNotificationRead = (id: string) =>
  setNotifications((n) =>
  n.map((x) =>
  x.id === id ?
  {
    ...x,
    read: true
  } :
  x
  )
  );
  const markAllNotificationsRead = () =>
  setNotifications((n) =>
  n.map((x) => ({
    ...x,
    read: true
  }))
  );
  const updateTaskStatus = (
  taskId: string,
  status: TaskStatus,
  actorId = 'u1') =>

  setTasks((ts) =>
  ts.map((t) =>
  t.id === taskId ?
  {
    ...t,
    status,
    activity: [
    ...t.activity,
    {
      id: `act${Date.now()}`,
      actorId,
      text: `moved status to ${status}`,
      timestamp: 'Just now'
    }]

  } :
  t
  )
  );
  const addComment = (
  taskId: string,
  comment: TaskComment,
  parentId?: string) =>

  setTasks((ts) =>
  ts.map((t) => {
    if (t.id !== taskId) return t;
    if (!parentId)
    return {
      ...t,
      comments: [...t.comments, comment]
    };
    return {
      ...t,
      comments: t.comments.map((c) =>
      c.id === parentId ?
      {
        ...c,
        replies: [...c.replies, comment]
      } :
      c
      )
    };
  })
  );
  const editComment = (taskId: string, commentId: string, text: string) =>
  setTasks((ts) =>
  ts.map((t) => {
    if (t.id !== taskId) return t;
    return {
      ...t,
      comments: t.comments.map((c) =>
      c.id === commentId ?
      {
        ...c,
        text
      } :
      {
        ...c,
        replies: c.replies.map((r) =>
        r.id === commentId ?
        {
          ...r,
          text
        } :
        r
        )
      }
      )
    };
  })
  );
  const deleteComment = (taskId: string, commentId: string) =>
  setTasks((ts) =>
  ts.map((t) => {
    if (t.id !== taskId) return t;
    return {
      ...t,
      comments: t.comments.
      filter((c) => c.id !== commentId).
      map((c) => ({
        ...c,
        replies: c.replies.filter((r) => r.id !== commentId)
      }))
    };
  })
  );
  return (
    <DataContext.Provider
      value={{
        users,
        setUsers,
        projects,
        setProjects,
        tasks,
        setTasks,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        auditLogs,
        updateTaskStatus,
        addComment,
        editComment,
        deleteComment
      }}>
      
      {children}
    </DataContext.Provider>);

}
export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}