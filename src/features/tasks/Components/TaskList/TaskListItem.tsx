import { useState } from 'react'
import TaskMenu from '../shared/TaskMenu'
import type { Task } from '../../../../types'
import { TASK_PROGRESS_STATUS, TASK_PROGRESS_ID } from '../../../../constants/app'
import { useTasksAction } from '../../hooks/Tasks'
import TaskForm from '../shared/TaskForm'

interface TaskListItemProps {
  task: Task
}

const getIconStyle = (progressOrder: number): string => {
  const colorClass =
    progressOrder === TASK_PROGRESS_ID.COMPLETED
      ? 'text-green-500 hover:text-green-600'
      : progressOrder === TASK_PROGRESS_ID.WAITING
        ? 'text-blue-500 hover:text-blue-600'
        : progressOrder === TASK_PROGRESS_ID.IN_PROGRESS
          ? 'text-yellow-500 hover:text-yellow-600'
          : 'text-red-500 hover:text-red-600'
  const cursorClass =
    progressOrder === TASK_PROGRESS_ID.COMPLETED ? 'cursor-default' : 'cursor-pointer'
  return `${colorClass} ${cursorClass} text-2xl mr-3 material-icons transition-all`
}

const getProgressCategory = (progressOrder: number): JSX.Element => {
  switch (progressOrder) {
    case TASK_PROGRESS_ID.NOT_STARTED:
      return (
        <span className="inline-flex items-center border border-red-600 px-4 py-2 text-xs font-medium uppercase tracking-widest text-red-600">
          Not Started
        </span>
      )
    case TASK_PROGRESS_ID.IN_PROGRESS:
      return (
        <span className="inline-flex items-center border border-yellow-600 px-4 py-2 text-xs font-medium uppercase tracking-widest text-yellow-600">
          In Progress
        </span>
      )
    case TASK_PROGRESS_ID.WAITING:
      return (
        <span className="inline-flex items-center border border-blue-600 px-4 py-2 text-xs font-medium uppercase tracking-widest text-blue-600">
          Waiting
        </span>
      )
    case TASK_PROGRESS_ID.COMPLETED:
      return (
        <span className="inline-flex items-center border border-green-600 px-4 py-2 text-xs font-medium uppercase tracking-widest text-green-600">
          Completed
        </span>
      )
    default:
      return (
        <span className="inline-flex items-center border border-red-600 px-4 py-2 text-xs font-medium uppercase tracking-widest text-red-600">
          Not Started
        </span>
      )
  }
}

const TaskListItem = ({ task }: TaskListItemProps): JSX.Element => {
  const { completeTask, deleteTask } = useTasksAction()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const onDeleteTask = (): void => {
    deleteTask(task.id)
  }

  return (
    <div className="table-body text-slate-700 dark:text-slate-200">
      <div className="tableBodyTaskTitle">
        <span
          className={getIconStyle(task.progressOrder)}
          onClick={(): void => completeTask(task.id)}
        >
          check_circle
        </span>
        <span className="font-normal">{task.title}</span>
      </div>
      <div className="tableBodyDetail">{task.detail}</div>
      <div className="tableBodyDueDate">{task.dueDate}</div>
      <div className="tableBodyprogress">{getProgressCategory(task.progressOrder)}</div>
      <div>
        <span
          className="material-icons cursor-pointer text-slate-600 transition-opacity hover:opacity-70 dark:text-slate-400"
          onClick={() => setIsMenuOpen(true)}
        >
          more_horiz
        </span>
      </div>
      {isMenuOpen && (
        <TaskMenu
          responsive={''}
          setIsMenuOpen={setIsMenuOpen}
          taskData={task}
          onDeleteTask={onDeleteTask}
        />
      )}
      {isModalOpen && <TaskForm setIsModalOpen={setIsModalOpen} taskId={task.id} />}
    </div>
  )
}

export default TaskListItem
