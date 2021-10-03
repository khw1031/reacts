import { TodoItemType, TodoListFilterType } from '@typings/todo';
import { atom, selector } from 'recoil';

export const todoListAtom = atom<TodoItemType[]>({
  key: 'todoList',
  default: [],
});

export const todoListFilterAtom = atom<TodoListFilterType>({
  key: 'todoListFilter',
  default: TodoListFilterType.SHOW_ALL,
});

export const filteredTodoListSelector = selector({
  key: 'filteredTodoList',
  get: ({ get }) => {
    const filter = get(todoListFilterAtom);
    const list = get(todoListAtom);

    switch (filter) {
      case TodoListFilterType.SHOW_COMPLETED:
        return list.filter((item) => item.isComplete);
      case TodoListFilterType.SHOW_UNCOMPLETED:
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

export const todoListStatsSelector = selector({
  key: 'todoListStats',
  get: ({ get }) => {
    const todoList = get(todoListAtom);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompleteNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompleteNum,
      percentCompleted,
    };
  },
});
