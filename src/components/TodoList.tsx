import { filteredTodoListSelector } from '@states/todo';
import { useRecoilValue } from 'recoil';
import { TodoItem } from './TodoItem';
import { TodoItemCreator } from './TodoItemCreator';
import { TodoListFilters } from './TodoListFilters';
import { TodoListStats } from './TodoListStats';

export function TodoList() {
  const todoList = useRecoilValue(filteredTodoListSelector);

  return (
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />
      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
}
