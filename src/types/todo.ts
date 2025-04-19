import { todoSchema } from '@/schema';
import { z } from 'zod';

export type Todo = z.infer<typeof todoSchema>;

export type TodoStatus =
  | 'todo'
  | 'in_progress'
  | 'done'
  | 'canceled'
  | 'expired';

export type TodoPriority = 'high' | 'medium' | 'low';
