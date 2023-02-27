import { v4 as uuidv4 } from 'uuid';
export const data = [
  {
    id: '1',
    Task: 'Task A',
  },
  {
    id: '2',
    Task: 'Task B',
  },
  {
    id: '3',
    Task: 'Task C',
  },
  {
    id: '4',
    Task: 'Task D',
  },
  {
    id: '5',
    Task: 'Task E',
  },
];

export const columnsFromBackend = {
  [uuidv4()]: {
    title: 'To-do',
    items: data,
  },
  [uuidv4()]: {
    title: 'In Progress',
    items: [],
  },
  [uuidv4()]: {
    title: 'Done',
    items: [],
  },
};
