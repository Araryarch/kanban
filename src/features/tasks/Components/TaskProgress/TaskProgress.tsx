import { useRecoilValue } from 'recoil'
import {
  notStartedTasksSelector,
  inProgressTasksSelector,
  waitingTasksSelector,
  completedTasksSelector,
} from '../../TaskSelectors'
import TaskColumn from './TaskColumn'
import type { Task } from '../../../../types'

const TaskProgress = (): JSX.Element => {
  const notStartedTasks: Task[] = useRecoilValue(notStartedTasksSelector)

  const inProgressTasks: Task[] = useRecoilValue(inProgressTasksSelector)

  const waitingTasks: Task[] = useRecoilValue(waitingTasksSelector)

  const completedTasks: Task[] = useRecoilValue(completedTasksSelector)

  return (
    <div className="task-container">
      <h1 className="task-title">Task Progress</h1>
      <div className="flex justify-around">
        <TaskColumn columnTitle="Not Started" tasks={notStartedTasks} />
        <TaskColumn columnTitle="In Progress" tasks={inProgressTasks} />
        <TaskColumn columnTitle="In Review / Waiting" tasks={waitingTasks} />
        <TaskColumn columnTitle="Completed" tasks={completedTasks} />
      </div>
    </div>
  )
}

export default TaskProgress
