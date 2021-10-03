export type TodoItemType = {
  id: number;
  text: string;
  isComplete: boolean;
};

export enum TodoListFilterType {
  SHOW_ALL = 'Show All',
  SHOW_COMPLETED = 'Show Completed',
  SHOW_UNCOMPLETED = 'Show Uncompleted',
}
