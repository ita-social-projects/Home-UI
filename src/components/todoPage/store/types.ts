interface TodoListType {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
}

type TaskType = {
  title: string;
  description: string;
};

export { TodoListType, TaskType };
