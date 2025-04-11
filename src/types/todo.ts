export interface Todo {
  id: number;
  task: string;
  description: string;
  dueDate: Date;
  priority: TodoPriority;
  status: TodoStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type TodoStatus =
  | 'todo'
  | 'in_progress'
  | 'done'
  | 'canceled'
  | 'expired';

export type TodoPriority = 'high' | 'medium' | 'low';
