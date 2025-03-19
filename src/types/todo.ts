export interface Todo {
  id: number;
  task: string;
  description: string;
  dueDate: string;
  priority: TodoPriority;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
}

export type TodoStatus =
  | 'todo'
  | 'in-progress'
  | 'done'
  | 'canceled'
  | 'expired';

export type TodoPriority = 'high' | 'medium' | 'low';
