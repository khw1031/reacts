import { todoListFilterAtom } from '@states/todo';
import { TodoListFilterType } from '@typings/todo';
import { ChangeEventHandler } from 'react';
import { useRecoilState } from 'recoil';

export function TodoListFilters() {
  const [filter, setFilter] = useRecoilState(todoListFilterAtom);

  const updateFilter: ChangeEventHandler<HTMLSelectElement> = ({ target: { value } }) => {
    setFilter(value as TodoListFilterType);
  };

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value={TodoListFilterType.SHOW_ALL}>All</option>
        <option value={TodoListFilterType.SHOW_COMPLETED}>Completed</option>
        <option value={TodoListFilterType.SHOW_UNCOMPLETED}>Uncompleted</option>
      </select>
    </>
  );
}
