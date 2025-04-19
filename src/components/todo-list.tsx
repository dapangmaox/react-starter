import { useCallback, useEffect, useState } from 'react';

import Loading from '@/components/loading';
import TodoDialogs from '@/components/todo-dialogs';
import { todoService } from '@/services/todo-service';
import { columns } from './columns';
import { DataTable } from './data-table';
import { useTodoList } from '@/context/todo-list-context';

function TodoList() {
  const { todoList, setTodoList } = useTodoList();
  const [loading, setLoading] = useState(false);

  const loadTodos = useCallback(async () => {
    setLoading(true);
    const response = await todoService.getAll();
    if (response.code !== 200) {
      setLoading(false);
      return;
    }
    setTodoList(response.data);
    setLoading(false);
  }, [setTodoList]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  return (
    <>
      <div className='bg-background text-foreground m-6'>
        <div className='flex flex-col mx-auto'>
          <div className='font-bold text-3xl text-center'>React To-Do List</div>
          <div className='mt-6'>
            {loading ? (
              <Loading />
            ) : (
              <DataTable data={todoList} columns={columns} />
            )}
          </div>
        </div>
      </div>
      <TodoDialogs onTodoChanged={loadTodos} />
    </>
  );
}

export default TodoList;
