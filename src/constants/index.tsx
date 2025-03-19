import {
  CheckIcon,
  CircleXIcon,
  ClockIcon,
  LoaderCircleIcon,
  TimerOffIcon,
} from 'lucide-react';

import { TodoStatus } from '@/types/todo';

export const statusList: {
  value: TodoStatus;
  label: string;
  icon: React.ElementType;
}[] = [
  {
    value: 'todo',
    label: 'Todo',
    icon: LoaderCircleIcon,
  },
  {
    value: 'in-progress',
    label: 'In Progress',
    icon: ClockIcon,
  },
  {
    value: 'done',
    label: 'Done',
    icon: CheckIcon,
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: CircleXIcon,
  },
  {
    value: 'expired',
    label: 'Expired',
    icon: TimerOffIcon,
  },
];
