import { useRecoilValue } from 'recoil'
import { completedTasksSelector, uncompletedTasksSelector } from '../TaskSelectors'
import type { Task } from '../../../types'
import { Link } from 'react-router-dom'

const TaskSummary = (): JSX.Element => {
  const completedTasks = useRecoilValue<Task[]>(completedTasksSelector)
  const uncompletedTasks = useRecoilValue<Task[]>(uncompletedTasksSelector)

  return (
    <div className="task-container">
      <h1 className="task-title">Overview</h1>
      <div className="space-y-6">
        <div className="list-task border-green-600 text-green-600 dark:border-green-500 dark:text-green-500">
          <div className="flex items-center gap-4">
            <span className="material-icons text-3xl">check_circle</span>
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Completed
              </p>
              <h2 className="text-3xl font-light">
                {completedTasks.length}
              </h2>
            </div>
          </div>
        </div>
        <div className="list-task border-slate-900 text-slate-900 dark:border-white dark:text-white">
          <div className="flex items-center gap-4">
            <span className="material-icons text-3xl">pending_actions</span>
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Remaining
              </p>
              <h2 className="text-3xl font-light">
                {uncompletedTasks.length}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 flex flex-wrap gap-4">
        <Link to="/task-list" className="link-task">
          View Tasks
        </Link>
        <Link to="/task-progress" className="link-task">
          View Board
        </Link>
      </div>
    </div>
  )
}

export default TaskSummary
