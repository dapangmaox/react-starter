import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTodoList } from '@/context/todo-list-context';
import { Todo } from '@/types/todo';
import { Ellipsis, Trash2Icon } from 'lucide-react';

interface TodoRowActionsProps {
  todo: Todo;
}

function TodoRowActions({ todo }: TodoRowActionsProps) {
  const { setOpen, setCurrentRow } = useTodoList();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(todo);
            setOpen('edit');
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(todo);
            setOpen('delete');
          }}
        >
          Delete
          <DropdownMenuShortcut>
            <Trash2Icon />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TodoRowActions;
