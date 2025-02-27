import './App.css';
import { Button } from './components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Todo } from './types/todo';
import { useEffect, useState } from 'react';
import { todoService } from './services/todo-service';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

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
    <div className="bg-background text-foreground m-6">
      <div className="flex flex-col mx-auto max-w-3xl">
        <div className="font-bold text-3xl text-center my-6">
          React To-Do List
        </div>
        <div className="flex justify-between items-center">
          <Button variant="secondary" className="w-[200px]">
            Add a new to-do
          </Button>
          <div className="space-x-4">
            <Button variant="default" className="w-[100px]">
              All
            </Button>
            <Button variant="secondary" className="w-[100px]">
              To-do
            </Button>
            <Button variant="secondary" className="w-[100px]">
              Completed
            </Button>
          </div>
        </div>
        <div className="mt-6">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Task</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todos.map((todo) => (
                  <TableRow key={todo.id}>
                    <TableCell>{todo.task}</TableCell>
                    <TableCell>{todo.description}</TableCell>
                    <TableCell>{todo.category}</TableCell>
                    <TableCell>{todo.dueDate}</TableCell>
                    <TableCell>{todo.priority}</TableCell>
                    <TableCell>
                      {todo.completed ? 'Completed' : 'To-do'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
