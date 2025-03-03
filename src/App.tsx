import './App.css';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { Todo } from './types/todo';
import { todoService } from './services/todo-service';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './components/ui/form';
import { Checkbox } from './components/ui/checkbox';

const formSchema = z.object({
  task: z.string(),
  description: z.string(),
  category: z.string(),
  dueDate: z.string(),
  priority: z.string(),
  completed: z.boolean().default(false),
});

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: '',
      description: '',
      category: '',
      dueDate: '',
      priority: '',
      completed: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    todoService.create(values);

    form.reset();
    setDialogOpen(false);

    const loadTodos = async () => {
      setLoading(true);
      const data = await todoService.getAll();
      setTodos(data);
      setLoading(false);
    };
    loadTodos();
  }

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      const data = await todoService.getAll();
      setTodos(data);
      setLoading(false);
    };
    loadTodos();
  }, []);

  return (
    <div className="bg-background text-foreground m-6">
      <div className="flex flex-col mx-auto max-w-3xl">
        <div className="font-bold text-3xl text-center my-6">
          React To-Do List
        </div>
        <div className="flex justify-between items-center">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" className="w-[200px]">
                Add a new to-do
              </Button>
            </DialogTrigger>
            <DialogContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <DialogHeader>
                    <DialogTitle>Add a new to-do</DialogTitle>
                    <DialogDescription>
                      Fill in the details of the new to-do item.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <FormField
                      control={form.control}
                      name="task"
                      render={({ field }) => (
                        <FormItem className="grid-cols-1">
                          <FormLabel>Task</FormLabel>
                          <FormControl>
                            <Input placeholder="shadcn" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is your task name.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="grid-cols-1">
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input placeholder="shadcn" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is your task description.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem className="col-span-1">
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Input placeholder="Category" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is your task category.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dueDate"
                      render={({ field }) => (
                        <FormItem className="col-span-1">
                          <FormLabel>Due Date</FormLabel>
                          <FormControl>
                            <Input placeholder="Due Date" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is your task due date.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem className="col-span-1">
                          <FormLabel>Priority</FormLabel>
                          <FormControl>
                            <Input placeholder="Priority" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is your task priority.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="completed"
                      render={({ field }) => (
                        <FormItem className="col-span-1 flex flex-row items-start">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Use different settings for my mobile devices
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <DialogFooter className="sm:justify-start">
                    <Button type="submit">Submit</Button>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Cancel
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          <div className="space-x-4">
            <Button variant="default" className="w-[100px]">
              All
            </Button>
            <Button variant="secondary" className="w-[100px]">
              To-do
            </Button>
            <Button variant="secondary" className="w-[100px]">
              Completed
            </Button>
          </div>
        </div>
        <div className="mt-6">
          {loading ? (
            <div>Loading...</div>
          ) : (
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
                    <TableCell>{todo.dueDate}</TableCell>
                    <TableCell>{todo.priority}</TableCell>
                    <TableCell>
                      {todo.completed ? 'Completed' : 'To-do'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
