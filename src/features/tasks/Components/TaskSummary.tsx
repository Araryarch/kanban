import { useRecoilValue } from 'recoil'
import { completedTasksSelector, uncompletedTasksSelector } from '../TaskSelectors'
import type { Task } from '../../../types'
import { Link } from 'react-router-dom'

const TaskSummary = (): JSX.Element => {
  const completedTasks = useRecoilValue<Task[]>(completedTasksSelector)
  const uncompletedTasks = useRecoilValue<Task[]>(uncompletedTasksSelector)

  return (
    <div className="task-container">
      <h1 className="task-title">Summary of Your Tasks</h1>
      <div className="list-task">
        <h2>
          You have completed {completedTasks.length} {completedTasks.length <= 1 ? 'task' : 'tasks'}
        </h2>
      </div>
      <div className="list-task hover:bg-[#e53170]">
        <h2>
          You still have {uncompletedTasks.length} {uncompletedTasks.length <= 1 ? 'task' : 'tasks'}{' '}
          left
        </h2>
      </div>
      <div className="flex">
        <Link to="/task-list" className="link-task">
          See Your Task List
        </Link>
        <Link to="/task-progress" className="link-task">
          Manage Your Task Progress
        </Link>
      </div>
    </div>
  )
}

export default TaskSummary
