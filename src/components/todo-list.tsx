import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Todo } from '@/types/todo';
import { format } from 'date-fns';

interface TodoListProps {
  todos: Todo[];
}

export function TodoList({ todos }: TodoListProps) {
  return (
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
            <TableCell>{format(todo.dueDate, 'PPP')}</TableCell>
            <TableCell>{todo.priority}</TableCell>
            <TableCell>{todo.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TodoList;
