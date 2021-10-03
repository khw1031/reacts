import { todoListStatsSelector } from '@states/todo';
import { useRecoilValue } from 'recoil';

export function TodoListStats() {
  const { totalNum, totalCompletedNum, totalUncompleteNum, percentCompleted } = useRecoilValue(todoListStatsSelector);

  const formattedPercentCompleted = Math.round(percentCompleted * 100) + '%';

  return (
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUncompleteNum}</li>
      <li>Percent completed: {formattedPercentCompleted}</li>
    </ul>
  );
}
