export const mockColumns = [
  {
    id: 'todo',
    title: 'To do',
    tasks: [
      { id: 'task-1', title: 'Rebuild analytics cards', assignee: 'Mila', priority: 'High' },
      { id: 'task-2', title: 'Prep stakeholder deck', assignee: 'Jon', priority: 'Medium' },
    ],
  },
  {
    id: 'in-progress',
    title: 'In progress',
    tasks: [
      { id: 'task-3', title: 'Billing workflow polish', assignee: 'Sora', priority: 'Critical' },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    tasks: [
      { id: 'task-4', title: 'Contracts module QA', assignee: 'Phil', priority: 'Low' },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: 'task-5', title: 'New brand system', assignee: 'Raul', priority: 'Medium' },
    ],
  },
];

export const mockProjects = [
  { id: 1, name: 'Nebula', owner: 'Wayne', status: 'Active', progress: '12/20' },
  { id: 2, name: 'Astra', owner: 'Mila', status: 'Review', progress: '7/12' },
  { id: 3, name: 'Pulse', owner: 'Sora', status: 'Planning', progress: '3/8' },
];
