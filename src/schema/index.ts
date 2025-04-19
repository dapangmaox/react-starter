import { z } from 'zod';

export const todoSchema = z.object({
  id: z.number().optional(),
  task: z.string(),
  description: z.string(),
  dueDate: z.date(),
  priority: z.enum(['high', 'medium', 'low']),
  status: z.enum(['todo', 'in_progress', 'done', 'canceled', 'expired']),
});
