import { useTodoList } from '@/context/todo-list-context';
import { ConfirmDialog } from '@/components/confirm-dialog';
import TodoMutate from './todo-mutate';
import { todoService } from '@/services/todo-service';

interface TodoDialogProps {
  onTodoChanged: () => void;
}

function TodoDialogs({ onTodoChanged }: TodoDialogProps) {
  const { open, setOpen, currentRow, setCurrentRow } = useTodoList();

  return (
    <>
      <TodoMutate
        key="todo-add"
        open={open === 'add'}
        onTodoChanged={() => {
          setOpen('add');
          onTodoChanged();
          setCurrentRow(null);
        }}
      />
      ;
      {currentRow && (
        <>
          <TodoMutate
            key="todo-update"
            open={open === 'update'}
            todo={currentRow}
            onTodoChanged={() => {
              setOpen('update');
              onTodoChanged();
              setCurrentRow(null);
            }}
          />

          <ConfirmDialog
            key="todo-delete"
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete');
              setCurrentRow(null);
            }}
            handleConfirm={async () => {
              setOpen(null);
              await todoService.delete(currentRow.id!);
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
              onTodoChanged();
            }}
            className="max-w-md"
            title={`Delete this task: ${currentRow.id} ?`}
            desc={
              <>
                You are about to delete a task with the ID{' '}
                <strong>{currentRow.id}</strong>. <br />
                This action cannot be undone.
              </>
            }
            confirmText="Delete"
          />
        </>
      )}
    </>
  );
}

export default TodoDialogs;
