import { Button } from '@/components/ui/button';
import { useTodoList } from '@/context/todo-list-context';

function Header() {
  const { setOpen } = useTodoList();

  return (
    <div className="flex justify-between items-center">
      <Button
        variant="secondary"
        className="w-[200px]"
        onClick={() => setOpen('add')}
      >
        Add a New To-Do
      </Button>
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
  );
}

export default Header;
