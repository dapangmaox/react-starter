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
import { todoSchema } from '@/schema';
import { todoService } from '@/services/todo-service';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { Trash2Icon } from 'lucide-react';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const todo = todoSchema.parse(row.original);

  const { setOpen, setCurrentRow, todoList, setTodoList } = useTodoList();

  const handleMarkAsDone = async () => {
    await todoService.addUpdate({
      ...todo,
      status: 'done',
    });
    setTodoList(
      todoList.map((item) => {
        if (item.id === todo.id) {
          return { ...item, status: 'done' };
        }
        return item;
      })
    );
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(todo);
            setOpen('update');
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleMarkAsDone}>
          Mark as Done
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
            <Trash2Icon size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
