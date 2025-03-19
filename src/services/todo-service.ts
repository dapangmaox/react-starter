import { Todo } from '@/types/todo';

// 初始模拟数据
let todos: Todo[] = [
  {
    id: 1,
    task: '开发任务',
    description: '完成项目架构搭建',
    dueDate: '2025-03-01',
    priority: 'high',
    status: 'todo',
    createdAt: '2025-02-27T09:00:00',
    updatedAt: '2025-02-27T09:00:00',
  },
  {
    id: 2,
    task: '开发任务',
    description: '完成登录注册功能',
    dueDate: '2025-03-01',
    priority: 'medium',
    status: 'done',
    createdAt: '2025-02-27T09:00:00',
    updatedAt: '2025-02-27T09:00:00',
  },
];

// 模拟网络延迟 (可选)
const simulateDelay = () => new Promise((resolve) => setTimeout(resolve, 500));

// 服务方法
export const todoService = {
  // 获取全部 Todo
  async getAll(): Promise<Todo[]> {
    await simulateDelay();
    return [...todos];
  },

  // 创建 Todo
  async create(
    newTodo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Todo> {
    await simulateDelay();
    const todo: Todo = {
      ...newTodo,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    todos.push(todo);
    return todo;
  },

  // 更新 Todo
  async update(
    id: number,
    updateData: Partial<Todo>
  ): Promise<Todo | undefined> {
    await simulateDelay();
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) return undefined;

    const updated = {
      ...todos[index],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };
    todos[index] = updated;
    return updated;
  },

  // 删除 Todo
  async delete(id: number): Promise<boolean> {
    await simulateDelay();
    const initialLength = todos.length;
    todos = todos.filter((t) => t.id !== id);
    return todos.length !== initialLength;
  },
};
