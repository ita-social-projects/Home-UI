interface TodosType {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
}

type TaskType = {
  title: string;
  description: string;
};

export interface TodoStore {
  todoList: Array<TodosType>;
}

export { TodosType, TaskType };
