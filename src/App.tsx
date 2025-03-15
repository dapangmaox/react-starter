import { useEffect, useState } from 'react';
import './App.css';

import { Button } from '@/components/ui/button';
import TodoList from '@/components/todo-list';
import { TodoDialog } from '@/components/todo-dialog';
import { todoService } from './services/todo-service';
import TodoListProvider from './context/todo-list-context';
import { Todo } from './types/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTodos = async () => {
    setLoading(true);
    const data = await todoService.getAll();
    setTodos(data);
    setLoading(false);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      const data = await todoService.getAll();
      setTodos(data);
      setLoading(false);
    };
    loadTodos();
  }, []);

  return (
    <TodoListProvider>
      <div className="bg-background text-foreground m-6">
        <div className="flex flex-col mx-auto">
          <div className="font-bold text-3xl text-center my-6">
            React To-Do List
          </div>
          <div className="flex justify-between items-center">
            <div className="space-x-4">
              <Button variant="default" className="w-[100px]">
                All
              </Button>
              <Button variant="secondary" className="w-[100px]">
                To-Do
              </Button>
              <Button variant="secondary" className="w-[100px]">
                Completed
              </Button>
            </div>
          </div>
          <div className="mt-6">
            {loading ? <div>Loading...</div> : <TodoList todos={todos} />}
          </div>
        </div>
      </div>
      <TodoDialog onTodoAdded={loadTodos} />
    </TodoListProvider>
  );
}

export default App;
