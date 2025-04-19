import { Button } from '@/components/ui/button';
import { useTodoList } from '@/context/todo-list-context';
import clsx from 'clsx';
import { PlusIcon } from 'lucide-react';

interface DataTableAddActionProps {
  className?: string;
}

function DataTableAddAction({ className }: DataTableAddActionProps) {
  const { setOpen } = useTodoList();

  return (
    <div className={clsx('flex justify-between items-center', className)}>
      <Button
        className='w-[80px]'
        variant='default'
        onClick={() => setOpen('add')}
      >
        <PlusIcon />
        Add
      </Button>
    </div>
  );
}

export default DataTableAddAction;
