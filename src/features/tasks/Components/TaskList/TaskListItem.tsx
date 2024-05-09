import type { Task } from '../../../../types'

interface TaskListItemProps {
  task: Task
}

const getProgressCategory = (progressOrder: number): JSX.Element => {
  switch (progressOrder) {
    case 1:
      return (
        <span className="text-red-500 transition-all duration-300 ease-in-out hover:text-red-700">
          Not Started
        </span>
      )
    case 2:
      return (
        <span className="text-yellow-500 transition-all duration-300 ease-in-out hover:text-yellow-700">
          In Progress
        </span>
      )
    case 3:
      return (
        <span className="text-blue-500 transition-all duration-300 ease-in-out hover:text-blue-700">
          Waiting/In Review
        </span>
      )
    case 4:
      return (
        <span className="text-green-500 transition-all duration-300 ease-in-out hover:text-green-700">
          Completed
        </span>
      )
    default:
      return (
        <span className="text-red-500 transition-all duration-300 ease-in-out hover:text-red-700">
          Not Started
        </span>
      )
  }
}

const TaskListItem = ({ task }: TaskListItemProps): JSX.Element => {
  return (
    <div className="table-body">
      <div className="tableBodyTaskTitle">
        <span className="material-icons px-2">check_circle</span>
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
