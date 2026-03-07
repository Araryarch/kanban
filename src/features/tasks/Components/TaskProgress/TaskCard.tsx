import type { Task } from '../../../../types'
import { TASK_PROGRESS_ID } from '../../../../constants/app'
import { useTasksAction } from '../../hooks/Tasks'
import { useState } from 'react'
import TaskMenu from '../shared/TaskMenu'

interface TaskCardProps {
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
  return `${colorClass} ${cursorClass} text-2xl mr-2 material-icons transition-all`
}

const getArrowPositionStyle = (progressOrder: number): string => {
  const justifyContentValue: 'justify-end' | 'justify-between' =
    progressOrder === 1 ? 'justify-end' : 'justify-between'
  return `flex ${justifyContentValue}`
}

const TaskCard = ({ task }: TaskCardProps): JSX.Element => {
  const { completeTask, moveTaskCard, deleteTask } = useTasksAction()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const handleDeleteClick = () => {
    deleteTask(task.id)
  }
  return (
    <div className="taskCard">
      <div className="taskIcons">
        <div
          className={`${getIconStyle(task.progressOrder)}`}
          onClick={(): void => completeTask(task.id)}
        >
          check_circle
        </div>
        <div
          className="material-icons menuIcons text-slate-600 dark:text-slate-300"
          onClick={(): void => {
            setIsMenuOpen(true)
          }}
        >
          more_vert
        </div>
      </div>
      <p className="cardTitle">{task.title}</p>
      <div>
        <p className="text-sm text-slate-600 dark:text-slate-400">{task.detail}</p>
      </div>
      <div className="cardDetail">
        <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-500">
          Due: {task.dueDate}
        </p>
      </div>
      <div className={getArrowPositionStyle(task.progressOrder)}>
        {task.progressOrder === TASK_PROGRESS_ID.NOT_STARTED && (
          <button
            className="material-icons cardIcons border-yellow-600 text-yellow-600"
            onClick={(): void => moveTaskCard(task.id, TASK_PROGRESS_ID.IN_PROGRESS)}
          >
            chevron_right
          </button>
        )}
        {task.progressOrder === TASK_PROGRESS_ID.IN_PROGRESS && (
          <>
            <button
              className="material-icons cardIcons border-red-600 text-red-600"
              onClick={(): void => moveTaskCard(task.id, TASK_PROGRESS_ID.NOT_STARTED)}
            >
              chevron_left
            </button>
            <button
              className="material-icons cardIcons border-blue-600 text-blue-600"
              onClick={(): void => moveTaskCard(task.id, TASK_PROGRESS_ID.WAITING)}
            >
              chevron_right
            </button>
          </>
        )}
        {task.progressOrder === TASK_PROGRESS_ID.WAITING && (
          <>
            <button
              className="material-icons cardIcons border-yellow-600 text-yellow-600"
              onClick={(): void => moveTaskCard(task.id, TASK_PROGRESS_ID.IN_PROGRESS)}
            >
              chevron_left
            </button>
            <button
              className="material-icons cardIcons border-green-600 text-green-600"
              onClick={(): void => moveTaskCard(task.id, TASK_PROGRESS_ID.COMPLETED)}
            >
              chevron_right
            </button>
          </>
        )}
        {task.progressOrder === TASK_PROGRESS_ID.COMPLETED && (
          <button
            className="material-icons cardIcons border-blue-600 text-blue-600"
            onClick={(): void => moveTaskCard(task.id, TASK_PROGRESS_ID.WAITING)}
          >
            chevron_left
          </button>
        )}
      </div>
      {isMenuOpen && (
        <TaskMenu
          responsive={'top-0'}
          setIsMenuOpen={setIsMenuOpen}
          taskData={task}
          onDeleteTask={handleDeleteClick}
        />
      )}
    </div>
  )
}

export default TaskCard
