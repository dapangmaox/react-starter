import { HttpResult } from '@/types/response';
import { Todo } from '@/types/todo';

const API_BASE_URL = '/api/todo';

// 提取日期转换逻辑
function transformTodoDates(todo: Todo): Todo {
  return {
    ...todo,
    dueDate: new Date(todo.dueDate),
  };
}

// 通用请求函数
async function request<T>(
  url: string,
  options: RequestInit
): Promise<HttpResult<T>> {
  const response = await fetch(url, options);

  if (!response.ok) {
    return {
      code: response.status,
      message: response.statusText || 'Request failed',
      data: null as unknown as T,
    };
  }

  return response.json();
}

export const todoService = {
  // 获取所有 Todo
  async getAll(): Promise<HttpResult<Todo[]>> {
    const result = await request<Todo[]>(`${API_BASE_URL}/list`, {
      method: 'GET',
    });

    if (result.code === 200) {
      return {
        ...result,
        data: result.data.map(transformTodoDates), // 转换日期字段
      };
    }

    return result;
  },

  // 添加或更新 Todo
  async addUpdate(todo: Partial<Todo>): Promise<HttpResult<Partial<Todo>>> {
    return request<Partial<Todo>>(`${API_BASE_URL}/addUpdate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...todo,
        dueDate: todo.dueDate?.toISOString(), // 转换日期为字符串
      }),
    });
  },

  // 删除 Todo
  async delete(id: number): Promise<HttpResult<boolean>> {
    return request<boolean>(`${API_BASE_URL}/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
  },
};
