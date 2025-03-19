import { useTodoList } from '@/context/todo-list-context';
import TodoMutate from './todo-mutate';

interface TodoDialogProps {
  onTodoChanged: () => void;
}

function TodoDialog({ onTodoChanged }: TodoDialogProps) {
  const { open, currentRow } = useTodoList();

  return (
    <>
      <TodoMutate open={open === 'add'} onTodoChanged={onTodoChanged} />;
      {currentRow && (
        <>
          <TodoMutate
            open={open === 'edit'}
            todo={currentRow}
            onTodoChanged={onTodoChanged}
          />
        </>
      )}
    </>
  );
}

export default TodoDialog;
