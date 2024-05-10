import { useRecoilValue } from 'recoil'
import {
  notStartedTasksSelector,
  inProgressTasksSelector,
  waitingTasksSelector,
  completedTasksSelector,
} from '../../TaskSelectors'
import TaskColumn from './TaskColumn'
import type { Task } from '../../../../types'
import { TASK_PROGRESS_STATUS } from '../../../../constants/app'

const TaskProgress = (): JSX.Element => {
  const notStartedTasks: Task[] = useRecoilValue(notStartedTasksSelector)

  const inProgressTasks: Task[] = useRecoilValue(inProgressTasksSelector)

  const waitingTasks: Task[] = useRecoilValue(waitingTasksSelector)

  const completedTasks: Task[] = useRecoilValue(completedTasksSelector)

  return (
    <div className="task-container">
      <h1 className="task-title">Task Progress</h1>
      <div className="flex justify-around">
        <TaskColumn columnTitle={TASK_PROGRESS_STATUS.NOT_STARTED} tasks={notStartedTasks} />
        <TaskColumn columnTitle={TASK_PROGRESS_STATUS.IN_PROGRESS} tasks={inProgressTasks} />
        <TaskColumn columnTitle={TASK_PROGRESS_STATUS.WAITING} tasks={waitingTasks} />
        <TaskColumn columnTitle={TASK_PROGRESS_STATUS.COMPLETED} tasks={completedTasks} />
      </div>
    </div>
  )
}

export default TaskProgress
