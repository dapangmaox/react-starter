import { useEffect, useState } from 'react';
import './App.css';

import Header from '@/components/header';
import Loading from '@/components/loading';
import TodoDialogs from '@/components/todo-dialogs';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import TodoListProvider from './context/todo-list-context';
import { todoService } from './services/todo-service';
import { Todo } from './types/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTodos = async () => {
    setLoading(true);
    const response = await todoService.getAll();
    if (response.code !== 200) {
      setLoading(false);
      return;
    }
    setTodos(response.data);
    setLoading(false);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <TodoListProvider>
      <div className="bg-background text-foreground m-6">
        <div className="flex flex-col mx-auto">
          <div className="font-bold text-3xl text-center my-6">
            React To-Do List
          </div>
          <Header />
          <div className="mt-6">
            {loading ? (
              <Loading />
            ) : (
              <DataTable data={todos} columns={columns} />
            )}
          </div>
        </div>
      </div>
      <TodoDialogs onTodoChanged={loadTodos} />
    </TodoListProvider>
  );
}

export default App;
