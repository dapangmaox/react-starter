import useDialogState from '@/hooks/use-dialog-state';
import { Todo } from '@/types/todo';
import React, { useState } from 'react';

type TodoListDialogType = 'add' | 'edit' | 'delete';

interface TodoListContextType {
  open: TodoListDialogType | null;
  setOpen: (type: TodoListDialogType | null) => void;
  currentRow: Todo | null;
  setCurrentRow: (row: Todo | null) => void;
}

const TodoListContext = React.createContext<TodoListContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function TodoListProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<TodoListDialogType>(null);
  const [currentRow, setCurrentRow] = useState<Todo | null>(null);

  return (
    <TodoListContext.Provider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </TodoListContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTodoList() {
  const context = React.useContext(TodoListContext);
  if (!context) {
    throw new Error('useTodoList must be used within a TodoListProvider');
  }
  return context;
}
