export type Role = 'Administrator' | 'Project Manager' | 'Team Member';

export type UserStatus = 'Active' | 'Inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  avatarColor: string;
  phone: string;
  department: string;
  city: string;
  skills: string[];
  experience: string;
}

export type TaskStatus = 'Todo' | 'In Progress' | 'Review' | 'Completed';

export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface TaskComment {
  id: string;
  authorId: string;
  text: string;
  timestamp: string;
  replies: TaskComment[];
}

export type AttachmentType = 'pdf' | 'image' | 'word' | 'excel' | 'zip';

export interface Attachment {
  id: string;
  name: string;
  type: AttachmentType;
  size: string;
}

export interface ActivityEntry {
  id: string;
  actorId: string;
  text: string;
  timestamp: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  projectId: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  estimatedHours: number;
  actualHours: number;
  comments: TaskComment[];
  attachments: Attachment[];
  activity: ActivityEntry[];
}

export type ProjectStatus = 'Planning' | 'Active' | 'Completed' | 'Archived';

export interface Milestone {
  id: string;
  name: string;
  dueDate: string;
  completed: boolean;
}

export interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  goal: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  managerId: string;
  memberIds: string[];
  budget: string;
  startDate: string;
  endDate: string;
  createdDate: string;
  updatedDate: string;
  milestones: Milestone[];
  sprints: Sprint[];
}

export type NotificationType =
'task_assigned' |
'task_updated' |
'project_created' |
'deadline' |
'mention';

export interface AppNotification {
  id: string;
  type: NotificationType;
  message: string;
  read: boolean;
  timestamp: string;
}

export type AuditCategory = 'User' | 'Project' | 'Task' | 'Auth' | 'System';

export interface AuditLog {
  id: string;
  actorId: string;
  action: string;
  target: string;
  category: AuditCategory;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}