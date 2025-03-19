import { format } from 'date-fns';
import { ArrowUpIcon, ArrowRightIcon, ArrowDownIcon } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Todo, TodoPriority, TodoStatus } from '@/types/todo';
import TodoRowActions from './todo-row-actions';
import { statusList } from '@/constants';

interface TodoListProps {
  todos: Todo[];
}

export function TodoList({ todos }: TodoListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Task</TableHead>
          <TableHead className="w-[150px]">Due Date</TableHead>
          <TableHead className="w-[120px]">Priority</TableHead>
          <TableHead className="w-[120px]">Status</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
          <TableRow key={todo.id}>
            <TableCell>{todo.task}</TableCell>
            <TableCell>{format(todo.dueDate, 'PPP')}</TableCell>
            <TableCell>
              <div className="flex items-center space-x-1">
                <PriorityIcon priority={todo.priority} />
                <span>{todo.priority}</span>
              </div>
            </TableCell>
            <TableCell>
              <StatusCell statusValue={todo.status} />
            </TableCell>
            <TableCell>{todo.description}</TableCell>
            <TableCell>
              <TodoRowActions todo={todo} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function PriorityIcon({ priority }: { priority: TodoPriority }) {
  switch (priority) {
    case 'High':
      return <ArrowUpIcon className="w-4 h-4" />;
    case 'Medium':
      return <ArrowRightIcon className="w-4 h-4" />;
    case 'Low':
      return <ArrowDownIcon className="w-4 h-4" />;
    default:
      return null;
  }
}

function StatusCell({ statusValue }: { statusValue: TodoStatus }) {
  const status = statusList.find((status) => status.value === statusValue);

  if (!status) {
    return null;
  }

  return (
    <div className="flex w-[100px] items-center">
      {status.icon && (
        <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
      )}
      <span>{status.label}</span>
    </div>
  );
}

export default TodoList;
