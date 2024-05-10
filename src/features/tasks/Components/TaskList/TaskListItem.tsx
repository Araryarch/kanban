import type { Task } from '../../../../types'
import { TASK_PROGRESS_STATUS, TASK_PROGRESS_ID } from '../../../../constants/app'
import { useTasksAction } from '../../hooks/Tasks'
interface TaskListItemProps {
  task: Task
}

const getIconStyle = (progressOrder: number): string => {
  const colorClass =
    progressOrder === TASK_PROGRESS_ID.COMPLETED
      ? 'text-green-500 checklist'
      : progressOrder === TASK_PROGRESS_ID.WAITING
        ? 'text-blue-500 checklist'
        : progressOrder === TASK_PROGRESS_ID.IN_PROGRESS
          ? 'text-yellow-500 checklist'
          : 'text-red-500 checklist'
  const cursorClass =
    progressOrder === TASK_PROGRESS_ID.COMPLETED ? 'cursor-default' : 'cursor-pointer'
  return `${colorClass} ${cursorClass} text-xl mr-2 material-icons`
}

const getProgressCategory = (progressOrder: number): JSX.Element => {
  switch (progressOrder) {
    case TASK_PROGRESS_ID.NOT_STARTED:
      return (
        <span className="text-red-500 transition-all duration-300 ease-in-out hover:text-red-700">
          {TASK_PROGRESS_STATUS.NOT_STARTED}
        </span>
      )
    case TASK_PROGRESS_ID.IN_PROGRESS:
      return (
        <span className="text-yellow-500 transition-all duration-300 ease-in-out hover:text-yellow-700">
          {TASK_PROGRESS_STATUS.IN_PROGRESS}
        </span>
      )
    case TASK_PROGRESS_ID.WAITING:
      return (
        <span className="text-blue-500 transition-all duration-300 ease-in-out hover:text-blue-700">
          {TASK_PROGRESS_STATUS.WAITING}
        </span>
      )
    case TASK_PROGRESS_ID.COMPLETED:
      return (
        <span className="text-green-500 transition-all duration-300 ease-in-out hover:text-green-700">
          {TASK_PROGRESS_STATUS.COMPLETED}
        </span>
      )
    default:
      return (
        <span className="text-red-500 transition-all duration-300 ease-in-out hover:text-red-700">
          {TASK_PROGRESS_STATUS.NOT_STARTED}
        </span>
      )
  }
}

const TaskListItem = ({ task }: TaskListItemProps): JSX.Element => {
  const { completeTask } = useTasksAction()
  return (
    <div className="table-body">
      <div className="tableBodyTaskTitle">
        <span
          className={getIconStyle(task.progressOrder)}
          onClick={(): void => completeTask(task.id)}
        >
          check_circle
        </span>
        {task.title}
      </div>
      <div className="tableBodyDetail">{task.detail}</div>
      <div className="tableBodyDueDate">{task.dueDate}</div>
      <div className="tableBodyprogress">{getProgressCategory(task.progressOrder)}</div>
      <div>
        <span className="material-icons cursor-pointer">more_horiz</span>
      </div>
    </div>
  )
}
export default TaskListItem
