import { User, Project, Task, AppNotification, AuditLog } from '../types';

export const users: User[] = [
{
  id: 'u1',
  name: 'Kasun Perera',
  email: 'kasun@lankatech.lk',
  role: 'Administrator',
  status: 'Active',
  avatarColor: '#FFAB00',
  phone: '+94 77 123 4567',
  department: 'IT Operations',
  city: 'Colombo',
  skills: ['System Administration', 'Security', 'DevOps'],
  experience: '9 years · LankaTech Solutions'
},
{
  id: 'u2',
  name: 'Nadeesha Fernando',
  email: 'nadeesha@lankatech.lk',
  role: 'Project Manager',
  status: 'Active',
  avatarColor: '#2C2C2C',
  phone: '+94 71 234 5678',
  department: 'Engineering',
  city: 'Colombo',
  skills: ['Agile', 'Sprint Planning', 'Stakeholder Management'],
  experience: '7 years · Ceylon Digital Labs'
},
{
  id: 'u3',
  name: 'Tharindu Silva',
  email: 'tharindu@lankatech.lk',
  role: 'Team Member',
  status: 'Active',
  avatarColor: '#2C2C2C',
  phone: '+94 76 345 6789',
  department: 'Engineering',
  city: 'Kandy',
  skills: ['React', 'TypeScript', 'Node.js'],
  experience: '4 years · Colombo Software Institute'
},
{
  id: 'u4',
  name: 'Sachini Jayasinghe',
  email: 'sachini@lankatech.lk',
  role: 'Team Member',
  status: 'Active',
  avatarColor: '#2C2C2C',
  phone: '+94 75 456 7890',
  department: 'Design',
  city: 'Galle',
  skills: ['UI Design', 'Figma', 'Design Systems'],
  experience: '5 years · Ceylon Digital Labs'
},
{
  id: 'u5',
  name: 'Yasiru Gunawardena',
  email: 'yasiru@lankatech.lk',
  role: 'Project Manager',
  status: 'Active',
  avatarColor: '#2C2C2C',
  phone: '+94 77 567 8901',
  department: 'Delivery',
  city: 'Negombo',
  skills: ['Kanban', 'Risk Management', 'Reporting'],
  experience: '8 years · LankaTech Solutions'
},
{
  id: 'u6',
  name: 'Dinithi Perera',
  email: 'dinithi@lankatech.lk',
  role: 'Team Member',
  status: 'Active',
  avatarColor: '#2C2C2C',
  phone: '+94 72 678 9012',
  department: 'Engineering',
  city: 'Matara',
  skills: ['Java', 'Spring Boot', 'PostgreSQL'],
  experience: '3 years · University of Moratuwa'
},
{
  id: 'u7',
  name: 'Ruwan Wickramasinghe',
  email: 'ruwan@lankatech.lk',
  role: 'Team Member',
  status: 'Active',
  avatarColor: '#2C2C2C',
  phone: '+94 78 789 0123',
  department: 'QA',
  city: 'Kurunegala',
  skills: ['Test Automation', 'Cypress', 'API Testing'],
  experience: '6 years · Sri Lanka Finance Solutions'
},
{
  id: 'u8',
  name: 'Ishara Rathnayake',
  email: 'ishara@lankatech.lk',
  role: 'Team Member',
  status: 'Active',
  avatarColor: '#2C2C2C',
  phone: '+94 70 890 1234',
  department: 'Mobile',
  city: 'Jaffna',
  skills: ['Flutter', 'Kotlin', 'Firebase'],
  experience: '4 years · Ceylon Digital Labs'
},
{
  id: 'u9',
  name: 'Chamodi Senanayake',
  email: 'chamodi@lankatech.lk',
  role: 'Team Member',
  status: 'Inactive',
  avatarColor: '#2C2C2C',
  phone: '+94 76 901 2345',
  department: 'Data',
  city: 'Batticaloa',
  skills: ['Python', 'Power BI', 'SQL'],
  experience: '2 years · University of Colombo'
},
{
  id: 'u10',
  name: 'Lahiru Bandara',
  email: 'lahiru@lankatech.lk',
  role: 'Team Member',
  status: 'Active',
  avatarColor: '#2C2C2C',
  phone: '+94 71 012 3456',
  department: 'Engineering',
  city: 'Colombo',
  skills: ['Go', 'Kubernetes', 'AWS'],
  experience: '5 years · LankaTech Solutions'
}];


export const projects: Project[] = [
{
  id: 'p1',
  name: 'Smart Colombo',
  description:
  'Smart city platform for Colombo Municipal Council — IoT dashboards, citizen services, and traffic analytics.',
  status: 'Active',
  managerId: 'u2',
  memberIds: ['u2', 'u3', 'u4', 'u10'],
  budget: 'LKR 48,500,000',
  startDate: '2026-03-02',
  endDate: '2026-11-30',
  createdDate: '2026-02-10',
  updatedDate: '2026-07-08',
  milestones: [
  {
    id: 'm1',
    name: 'IoT sensor network integration',
    dueDate: '2026-05-15',
    completed: true
  },
  {
    id: 'm2',
    name: 'Citizen services portal beta',
    dueDate: '2026-07-30',
    completed: false
  },
  {
    id: 'm3',
    name: 'Traffic analytics go-live',
    dueDate: '2026-10-15',
    completed: false
  }],

  sprints: [
  {
    id: 's1',
    name: 'Sprint 7',
    startDate: '2026-06-29',
    endDate: '2026-07-12',
    goal: 'Citizen portal payments flow'
  },
  {
    id: 's2',
    name: 'Sprint 8',
    startDate: '2026-07-13',
    endDate: '2026-07-26',
    goal: 'Analytics dashboard MVP'
  }]

},
{
  id: 'p2',
  name: 'Digital Kandy',
  description:
  'Digital transformation programme for Kandy municipal services and heritage tourism experiences.',
  status: 'Active',
  managerId: 'u2',
  memberIds: ['u2', 'u4', 'u6', 'u8'],
  budget: 'LKR 32,000,000',
  startDate: '2026-04-15',
  endDate: '2026-12-20',
  createdDate: '2026-03-22',
  updatedDate: '2026-07-05',
  milestones: [
  {
    id: 'm4',
    name: 'Service digitization audit',
    dueDate: '2026-06-01',
    completed: true
  },
  {
    id: 'm5',
    name: 'Mobile app pilot — Kandy city',
    dueDate: '2026-08-20',
    completed: false
  }],

  sprints: [
  {
    id: 's3',
    name: 'Sprint 4',
    startDate: '2026-07-06',
    endDate: '2026-07-19',
    goal: 'Heritage site booking module'
  }]

},
{
  id: 'p3',
  name: 'Lanka HR System',
  description:
  'Enterprise HR and payroll platform for Sri Lanka Finance Solutions covering 2,400 employees.',
  status: 'Active',
  managerId: 'u5',
  memberIds: ['u5', 'u6', 'u7', 'u9'],
  budget: 'LKR 27,800,000',
  startDate: '2026-01-12',
  endDate: '2026-09-30',
  createdDate: '2025-12-18',
  updatedDate: '2026-07-10',
  milestones: [
  {
    id: 'm6',
    name: 'Payroll engine certification',
    dueDate: '2026-05-30',
    completed: true
  },
  {
    id: 'm7',
    name: 'EPF/ETF compliance module',
    dueDate: '2026-07-25',
    completed: false
  },
  {
    id: 'm8',
    name: 'Company-wide rollout',
    dueDate: '2026-09-15',
    completed: false
  }],

  sprints: [
  {
    id: 's4',
    name: 'Sprint 12',
    startDate: '2026-07-06',
    endDate: '2026-07-19',
    goal: 'Leave management workflows'
  }]

},
{
  id: 'p4',
  name: 'Tourism Portal Sri Lanka',
  description:
  'National tourism portal with itinerary planning across Galle, Ella, Sigiriya and the southern coast.',
  status: 'Planning',
  managerId: 'u5',
  memberIds: ['u5', 'u3', 'u8'],
  budget: 'LKR 19,500,000',
  startDate: '2026-08-01',
  endDate: '2027-02-28',
  createdDate: '2026-06-20',
  updatedDate: '2026-07-02',
  milestones: [
  {
    id: 'm9',
    name: 'Content partnerships signed',
    dueDate: '2026-08-30',
    completed: false
  }],

  sprints: []
},
{
  id: 'p5',
  name: 'National Education Platform',
  description:
  'E-learning platform for the Ministry of Education serving schools from Jaffna to Matara.',
  status: 'Active',
  managerId: 'u2',
  memberIds: ['u2', 'u6', 'u7', 'u10'],
  budget: 'LKR 61,200,000',
  startDate: '2026-02-01',
  endDate: '2026-10-31',
  createdDate: '2026-01-08',
  updatedDate: '2026-07-09',
  milestones: [
  {
    id: 'm10',
    name: 'Sinhala & Tamil localization',
    dueDate: '2026-06-15',
    completed: true
  },
  {
    id: 'm11',
    name: 'Teacher onboarding — 5,000 users',
    dueDate: '2026-08-10',
    completed: false
  }],

  sprints: [
  {
    id: 's5',
    name: 'Sprint 9',
    startDate: '2026-07-01',
    endDate: '2026-07-14',
    goal: 'Offline lesson sync'
  }]

},
{
  id: 'p6',
  name: 'Ceylon Pay Gateway',
  description:
  'Unified payment gateway for Ceylon Digital Labs merchants with LankaQR support.',
  status: 'Completed',
  managerId: 'u5',
  memberIds: ['u5', 'u10', 'u7'],
  budget: 'LKR 22,000,000',
  startDate: '2025-09-01',
  endDate: '2026-05-31',
  createdDate: '2025-08-05',
  updatedDate: '2026-06-01',
  milestones: [
  {
    id: 'm12',
    name: 'LankaQR certification',
    dueDate: '2026-03-15',
    completed: true
  },
  {
    id: 'm13',
    name: 'Production launch',
    dueDate: '2026-05-20',
    completed: true
  }],

  sprints: []
}];


export const tasks: Task[] = [
{
  id: 't1',
  title: 'Integrate traffic sensor feeds',
  description:
  'Connect Colombo traffic IoT sensors to the streaming pipeline and normalise readings.',
  assigneeId: 'u3',
  projectId: 'p1',
  status: 'Completed',
  priority: 'High',
  dueDate: '2026-06-10',
  estimatedHours: 24,
  actualHours: 28,
  comments: [
  {
    id: 'c1',
    authorId: 'u2',
    text: 'Great work — sensor latency is now under 2s.',
    timestamp: '2026-06-11 09:20',
    replies: [
    {
      id: 'c1r1',
      authorId: 'u3',
      text: 'Thanks @Nadeesha Fernando! Caching helped a lot.',
      timestamp: '2026-06-11 10:05',
      replies: []
    }]

  }],

  attachments: [
  { id: 'a1', name: 'sensor-mapping.xlsx', type: 'excel', size: '245 KB' },
  {
    id: 'a2',
    name: 'architecture-diagram.png',
    type: 'image',
    size: '1.2 MB'
  }],

  activity: [
  {
    id: 'act1',
    actorId: 'u2',
    text: 'created this task',
    timestamp: '2026-05-20 08:30'
  },
  {
    id: 'act2',
    actorId: 'u3',
    text: 'moved status to In Progress',
    timestamp: '2026-05-22 09:15'
  },
  {
    id: 'act3',
    actorId: 'u3',
    text: 'marked as Completed',
    timestamp: '2026-06-10 17:40'
  }]

},
{
  id: 't2',
  title: 'Citizen portal payment flow',
  description:
  'Build utility bill payment flow with LankaQR and card options for the citizen portal.',
  assigneeId: 'u3',
  projectId: 'p1',
  status: 'In Progress',
  priority: 'Urgent',
  dueDate: '2026-07-18',
  estimatedHours: 40,
  actualHours: 22,
  comments: [
  {
    id: 'c2',
    authorId: 'u2',
    text: '@Tharindu Silva please prioritise the LankaQR path first.',
    timestamp: '2026-07-06 11:00',
    replies: []
  }],

  attachments: [
  { id: 'a3', name: 'payment-spec.pdf', type: 'pdf', size: '890 KB' }],

  activity: [
  {
    id: 'act4',
    actorId: 'u2',
    text: 'created this task',
    timestamp: '2026-06-30 10:00'
  },
  {
    id: 'act5',
    actorId: 'u3',
    text: 'moved status to In Progress',
    timestamp: '2026-07-02 08:45'
  }]

},
{
  id: 't3',
  title: 'Design citizen services dashboard',
  description:
  'High-fidelity designs for the citizen dashboard — Sinhala, Tamil and English variants.',
  assigneeId: 'u4',
  projectId: 'p1',
  status: 'Review',
  priority: 'High',
  dueDate: '2026-07-14',
  estimatedHours: 32,
  actualHours: 30,
  comments: [],
  attachments: [
  { id: 'a4', name: 'dashboard-mockups.zip', type: 'zip', size: '14.6 MB' }],

  activity: [
  {
    id: 'act6',
    actorId: 'u2',
    text: 'created this task',
    timestamp: '2026-06-25 09:00'
  },
  {
    id: 'act7',
    actorId: 'u4',
    text: 'moved status to Review',
    timestamp: '2026-07-09 16:20'
  }]

},
{
  id: 't4',
  title: 'Deploy analytics API to staging',
  description:
  'Containerise and deploy traffic analytics API to the staging cluster.',
  assigneeId: 'u10',
  projectId: 'p1',
  status: 'Todo',
  priority: 'Medium',
  dueDate: '2026-07-24',
  estimatedHours: 16,
  actualHours: 0,
  comments: [],
  attachments: [],
  activity: [
  {
    id: 'act8',
    actorId: 'u2',
    text: 'created this task',
    timestamp: '2026-07-05 14:10'
  }]

},
{
  id: 't5',
  title: 'Heritage site booking module',
  description:
  'Booking and ticketing for Temple of the Tooth and Kandy heritage walks.',
  assigneeId: 'u8',
  projectId: 'p2',
  status: 'In Progress',
  priority: 'High',
  dueDate: '2026-07-19',
  estimatedHours: 36,
  actualHours: 18,
  comments: [
  {
    id: 'c3',
    authorId: 'u2',
    text: 'Peak season starts in August — booking flow must be solid.',
    timestamp: '2026-07-07 09:30',
    replies: []
  }],

  attachments: [
  { id: 'a5', name: 'booking-wireframes.pdf', type: 'pdf', size: '2.1 MB' }],

  activity: [
  {
    id: 'act9',
    actorId: 'u2',
    text: 'created this task',
    timestamp: '2026-07-01 10:00'
  },
  {
    id: 'act10',
    actorId: 'u8',
    text: 'moved status to In Progress',
    timestamp: '2026-07-06 08:30'
  }]

},
{
  id: 't6',
  title: 'Kandy services content audit',
  description:
  'Audit all municipal service content and map to digital service categories.',
  assigneeId: 'u4',
  projectId: 'p2',
  status: 'Completed',
  priority: 'Medium',
  dueDate: '2026-06-01',
  estimatedHours: 20,
  actualHours: 19,
  comments: [],
  attachments: [
  { id: 'a6', name: 'content-audit.xlsx', type: 'excel', size: '512 KB' }],

  activity: [
  {
    id: 'act11',
    actorId: 'u2',
    text: 'created this task',
    timestamp: '2026-05-10 09:00'
  },
  {
    id: 'act12',
    actorId: 'u4',
    text: 'marked as Completed',
    timestamp: '2026-06-01 15:00'
  }]

},
{
  id: 't7',
  title: 'Municipal notice board API',
  description:
  'REST API for public notices with Sinhala/Tamil content support.',
  assigneeId: 'u6',
  projectId: 'p2',
  status: 'Todo',
  priority: 'Low',
  dueDate: '2026-08-02',
  estimatedHours: 18,
  actualHours: 0,
  comments: [],
  attachments: [],
  activity: [
  {
    id: 'act13',
    actorId: 'u2',
    text: 'created this task',
    timestamp: '2026-07-08 11:20'
  }]

},
{
  id: 't8',
  title: 'EPF/ETF calculation engine',
  description:
  'Implement statutory EPF and ETF contribution calculations with audit trail.',
  assigneeId: 'u6',
  projectId: 'p3',
  status: 'In Progress',
  priority: 'Urgent',
  dueDate: '2026-07-20',
  estimatedHours: 44,
  actualHours: 31,
  comments: [
  {
    id: 'c4',
    authorId: 'u5',
    text: 'Compliance review is booked for July 22 — @Dinithi Perera keep me posted.',
    timestamp: '2026-07-09 10:15',
    replies: [
    {
      id: 'c4r1',
      authorId: 'u6',
      text: 'On track. Edge cases for gratuity remain.',
      timestamp: '2026-07-09 12:40',
      replies: []
    }]

  }],

  attachments: [
  { id: 'a7', name: 'epf-etf-rules.docx', type: 'word', size: '340 KB' }],

  activity: [
  {
    id: 'act14',
    actorId: 'u5',
    text: 'created this task',
    timestamp: '2026-06-15 09:00'
  },
  {
    id: 'act15',
    actorId: 'u6',
    text: 'moved status to In Progress',
    timestamp: '2026-06-18 08:20'
  }]

},
{
  id: 't9',
  title: 'Leave workflow regression tests',
  description:
  'Automated test suite for leave approval chains and carry-forward rules.',
  assigneeId: 'u7',
  projectId: 'p3',
  status: 'Review',
  priority: 'High',
  dueDate: '2026-07-16',
  estimatedHours: 26,
  actualHours: 24,
  comments: [],
  attachments: [
  { id: 'a8', name: 'test-report.pdf', type: 'pdf', size: '1.8 MB' }],

  activity: [
  {
    id: 'act16',
    actorId: 'u5',
    text: 'created this task',
    timestamp: '2026-06-28 10:30'
  },
  {
    id: 'act17',
    actorId: 'u7',
    text: 'moved status to Review',
    timestamp: '2026-07-10 09:10'
  }]

},
{
  id: 't10',
  title: 'Payslip PDF generation',
  description:
  'Branded payslip PDFs with Sinhala fonts and email distribution.',
  assigneeId: 'u9',
  projectId: 'p3',
  status: 'Todo',
  priority: 'Medium',
  dueDate: '2026-07-29',
  estimatedHours: 14,
  actualHours: 0,
  comments: [],
  attachments: [],
  activity: [
  {
    id: 'act18',
    actorId: 'u5',
    text: 'created this task',
    timestamp: '2026-07-06 13:00'
  }]

},
{
  id: 't11',
  title: 'Payroll rollout training deck',
  description: 'Training material for HR officers across all branches.',
  assigneeId: 'u7',
  projectId: 'p3',
  status: 'Todo',
  priority: 'Low',
  dueDate: '2026-08-12',
  estimatedHours: 10,
  actualHours: 0,
  comments: [],
  attachments: [],
  activity: [
  {
    id: 'act19',
    actorId: 'u5',
    text: 'created this task',
    timestamp: '2026-07-09 15:45'
  }]

},
{
  id: 't12',
  title: 'Itinerary planner data model',
  description:
  'Design the itinerary and attraction data model covering all provinces.',
  assigneeId: 'u3',
  projectId: 'p4',
  status: 'Todo',
  priority: 'Medium',
  dueDate: '2026-08-08',
  estimatedHours: 22,
  actualHours: 0,
  comments: [],
  attachments: [],
  activity: [
  {
    id: 'act20',
    actorId: 'u5',
    text: 'created this task',
    timestamp: '2026-07-03 09:20'
  }]

},
{
  id: 't13',
  title: 'Partner hotel API research',
  description:
  'Evaluate integration options with hotel booking providers for Galle and Ella.',
  assigneeId: 'u8',
  projectId: 'p4',
  status: 'In Progress',
  priority: 'Low',
  dueDate: '2026-07-31',
  estimatedHours: 12,
  actualHours: 5,
  comments: [],
  attachments: [],
  activity: [
  {
    id: 'act21',
    actorId: 'u5',
    text: 'created this task',
    timestamp: '2026-07-04 10:00'
  },
  {
    id: 'act22',
    actorId: 'u8',
    text: 'moved status to In Progress',
    timestamp: '2026-07-08 08:15'
  }]

},
{
  id: 't14',
  title: 'Offline lesson sync engine',
  description:
  'Sync lessons for low-connectivity schools in Northern and Eastern provinces.',
  assigneeId: 'u10',
  projectId: 'p5',
  status: 'In Progress',
  priority: 'Urgent',
  dueDate: '2026-07-14',
  estimatedHours: 48,
  actualHours: 39,
  comments: [
  {
    id: 'c5',
    authorId: 'u2',
    text: 'Pilot schools in Jaffna are ready for testing next week.',
    timestamp: '2026-07-08 14:00',
    replies: []
  }],

  attachments: [
  { id: 'a9', name: 'sync-protocol.pdf', type: 'pdf', size: '760 KB' }],

  activity: [
  {
    id: 'act23',
    actorId: 'u2',
    text: 'created this task',
    timestamp: '2026-06-20 09:00'
  },
  {
    id: 'act24',
    actorId: 'u10',
    text: 'moved status to In Progress',
    timestamp: '2026-06-23 08:00'
  }]

},
{
  id: 't15',
  title: 'Teacher onboarding portal',
  description:
  'Self-service onboarding flow with NIC verification for teachers.',
  assigneeId: 'u6',
  projectId: 'p5',
  status: 'Review',
  priority: 'High',
  dueDate: '2026-07-17',
  estimatedHours: 30,
  actualHours: 29,
  comments: [],
  attachments: [
  { id: 'a10', name: 'onboarding-flow.png', type: 'image', size: '980 KB' }],

  activity: [
  {
    id: 'act25',
    actorId: 'u2',
    text: 'created this task',
    timestamp: '2026-06-22 10:30'
  },
  {
    id: 'act26',
    actorId: 'u6',
    text: 'moved status to Review',
    timestamp: '2026-07-09 17:00'
  }]

},
{
  id: 't16',
  title: 'Grade 5 scholarship exam module',
  description: 'Practice exam module with past papers and instant scoring.',
  assigneeId: 'u7',
  projectId: 'p5',
  status: 'Todo',
  priority: 'Medium',
  dueDate: '2026-08-05',
  estimatedHours: 28,
  actualHours: 0,
  comments: [],
  attachments: [],
  activity: [
  {
    id: 'act27',
    actorId: 'u2',
    text: 'created this task',
    timestamp: '2026-07-07 11:00'
  }]

},
{
  id: 't17',
  title: 'Sinhala/Tamil UI localization QA',
  description:
  'Verify translated strings and RTL-safe layouts across the platform.',
  assigneeId: 'u7',
  projectId: 'p5',
  status: 'Completed',
  priority: 'High',
  dueDate: '2026-06-15',
  estimatedHours: 20,
  actualHours: 23,
  comments: [],
  attachments: [],
  activity: [
  {
    id: 'act28',
    actorId: 'u2',
    text: 'created this task',
    timestamp: '2026-05-28 09:30'
  },
  {
    id: 'act29',
    actorId: 'u7',
    text: 'marked as Completed',
    timestamp: '2026-06-15 16:45'
  }]

},
{
  id: 't18',
  title: 'Merchant settlement reports',
  description: 'Daily settlement reporting for LankaQR merchants.',
  assigneeId: 'u10',
  projectId: 'p6',
  status: 'Completed',
  priority: 'Medium',
  dueDate: '2026-05-10',
  estimatedHours: 16,
  actualHours: 15,
  comments: [],
  attachments: [
  {
    id: 'a11',
    name: 'settlement-format.xlsx',
    type: 'excel',
    size: '128 KB'
  }],

  activity: [
  {
    id: 'act30',
    actorId: 'u5',
    text: 'created this task',
    timestamp: '2026-04-15 09:00'
  },
  {
    id: 'act31',
    actorId: 'u10',
    text: 'marked as Completed',
    timestamp: '2026-05-10 12:30'
  }]

},
{
  id: 't19',
  title: 'Gateway load testing',
  description: 'Load test at 500 TPS with production-like merchant mix.',
  assigneeId: 'u7',
  projectId: 'p6',
  status: 'Completed',
  priority: 'Urgent',
  dueDate: '2026-05-18',
  estimatedHours: 18,
  actualHours: 21,
  comments: [],
  attachments: [],
  activity: [
  {
    id: 'act32',
    actorId: 'u5',
    text: 'created this task',
    timestamp: '2026-05-01 10:00'
  },
  {
    id: 'act33',
    actorId: 'u7',
    text: 'marked as Completed',
    timestamp: '2026-05-18 18:20'
  }]

},
{
  id: 't20',
  title: 'Citizen feedback widget',
  description: 'Embeddable feedback widget for all Smart Colombo services.',
  assigneeId: 'u4',
  projectId: 'p1',
  status: 'Todo',
  priority: 'Low',
  dueDate: '2026-08-15',
  estimatedHours: 12,
  actualHours: 0,
  comments: [],
  attachments: [],
  activity: [
  {
    id: 'act34',
    actorId: 'u2',
    text: 'created this task',
    timestamp: '2026-07-10 09:40'
  }]

},
{
  id: 't21',
  title: 'Kandy app store submission',
  description:
  'Prepare store listings and submit the Digital Kandy pilot app.',
  assigneeId: 'u8',
  projectId: 'p2',
  status: 'Review',
  priority: 'Medium',
  dueDate: '2026-07-22',
  estimatedHours: 8,
  actualHours: 7,
  comments: [],
  attachments: [
  { id: 'a12', name: 'store-assets.zip', type: 'zip', size: '22.4 MB' }],

  activity: [
  {
    id: 'act35',
    actorId: 'u2',
    text: 'created this task',
    timestamp: '2026-07-02 10:15'
  },
  {
    id: 'act36',
    actorId: 'u8',
    text: 'moved status to Review',
    timestamp: '2026-07-10 11:30'
  }]

},
{
  id: 't22',
  title: 'Education platform uptime alerts',
  description: 'PagerDuty-style alerting for exam-day traffic spikes.',
  assigneeId: 'u10',
  projectId: 'p5',
  status: 'Todo',
  priority: 'High',
  dueDate: '2026-07-26',
  estimatedHours: 10,
  actualHours: 0,
  comments: [],
  attachments: [],
  activity: [
  {
    id: 'act37',
    actorId: 'u2',
    text: 'created this task',
    timestamp: '2026-07-09 08:50'
  }]

}];


export const notifications: AppNotification[] = [
{
  id: 'n1',
  type: 'task_assigned',
  message: 'Nadeesha Fernando assigned you "Citizen portal payment flow"',
  read: false,
  timestamp: '2026-07-10 09:15'
},
{
  id: 'n2',
  type: 'deadline',
  message: '"Offline lesson sync engine" is due in 3 days',
  read: false,
  timestamp: '2026-07-10 08:00'
},
{
  id: 'n3',
  type: 'mention',
  message: 'Yasiru Gunawardena mentioned you in "EPF/ETF calculation engine"',
  read: false,
  timestamp: '2026-07-09 10:16'
},
{
  id: 'n4',
  type: 'task_updated',
  message: 'Ishara Rathnayake moved "Kandy app store submission" to Review',
  read: true,
  timestamp: '2026-07-10 11:31'
},
{
  id: 'n5',
  type: 'project_created',
  message: 'New project "Tourism Portal Sri Lanka" was created',
  read: true,
  timestamp: '2026-06-20 14:05'
},
{
  id: 'n6',
  type: 'deadline',
  message: '"Design citizen services dashboard" is due in 4 days',
  read: true,
  timestamp: '2026-07-09 08:00'
}];


export const auditLogs: AuditLog[] = [
{
  id: 'log1',
  actorId: 'u1',
  action: 'Updated role permissions',
  target: 'Project Manager role',
  category: 'System',
  timestamp: '2026-07-10 14:22'
},
{
  id: 'log2',
  actorId: 'u2',
  action: 'Created task',
  target: 'Citizen feedback widget',
  category: 'Task',
  timestamp: '2026-07-10 09:40'
},
{
  id: 'log3',
  actorId: 'u8',
  action: 'Moved task to Review',
  target: 'Kandy app store submission',
  category: 'Task',
  timestamp: '2026-07-10 11:30'
},
{
  id: 'log4',
  actorId: 'u1',
  action: 'Added user',
  target: 'Lahiru Bandara',
  category: 'User',
  timestamp: '2026-07-09 16:05'
},
{
  id: 'log5',
  actorId: 'u5',
  action: 'Updated project budget',
  target: 'Lanka HR System',
  category: 'Project',
  timestamp: '2026-07-09 13:12'
},
{
  id: 'log6',
  actorId: 'u3',
  action: 'Signed in',
  target: 'Web session · Colombo',
  category: 'Auth',
  timestamp: '2026-07-09 08:31'
},
{
  id: 'log7',
  actorId: 'u1',
  action: 'Deactivated user',
  target: 'Chamodi Senanayake',
  category: 'User',
  timestamp: '2026-07-08 17:45'
},
{
  id: 'log8',
  actorId: 'u2',
  action: 'Updated milestone',
  target: 'Citizen services portal beta',
  category: 'Project',
  timestamp: '2026-07-08 10:20'
},
{
  id: 'log9',
  actorId: 'u6',
  action: 'Uploaded attachment',
  target: 'epf-etf-rules.docx',
  category: 'Task',
  timestamp: '2026-07-07 15:55'
},
{
  id: 'log10',
  actorId: 'u1',
  action: 'Exported user report',
  target: 'All users CSV',
  category: 'System',
  timestamp: '2026-07-07 09:10'
},
{
  id: 'log11',
  actorId: 'u5',
  action: 'Archived project',
  target: 'Ceylon Pay Gateway',
  category: 'Project',
  timestamp: '2026-06-30 11:00'
},
{
  id: 'log12',
  actorId: 'u4',
  action: 'Signed in',
  target: 'Web session · Galle',
  category: 'Auth',
  timestamp: '2026-07-10 07:58'
}];