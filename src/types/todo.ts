export interface Todo {
  id: number;
  task: string;
  description: string;
  category: string;
  dueDate: string;
  priority: string;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
}

export type TodoStatus =
  | 'todo'
  | 'in-progress'
  | 'done'
  | 'canceled'
  | 'backlog';
