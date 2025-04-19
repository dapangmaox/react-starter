import './App.css';
import TodoList from './components/todo-list';
import TodoListProvider from './context/todo-list-context';

function App() {
  return (
    <TodoListProvider>
      <TodoList />
    </TodoListProvider>
  );
}

export default App;
