import type { Task } from '../../../../types'
import { TASK_PROGRESS_ID } from '../../../../constants/app'
import { useTasksAction } from '../../hooks/Tasks'
import { menuState } from '../state/state'
import { useRecoilState } from 'recoil'
import TaskMenu from '../shared/TaskMenu'

interface TaskCardProps {
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

const getArrowPositionStyle = (progressOrder: number): string => {
  const justifyContentValue: 'justify-end' | 'justify-between' =
    progressOrder === 1 ? 'justify-end' : 'justify-between'
  return `flex ${justifyContentValue}`
}

const TaskCard = ({ task }: TaskCardProps): JSX.Element => {
  const { completeTask, moveTaskCard } = useTasksAction()
  const [isMenuOpen, setIsMenuOpen] = useRecoilState<boolean>(menuState)
  const handleDeleteTask = (taskId: number): void => {
    console.log('Deleting task with ID:', taskId)
  }

  return (
    <div className="taskCard">
      <div className="taskIcons">
        <div
          className={`${getIconStyle(task.progressOrder)} text-[#0f0e17]`}
          onClick={(): void => completeTask(task.id)}
        >
          check_circle
        </div>
        <div
          className="material-icons menuIcons"
          onClick={(): void => {
            setIsMenuOpen(true)
          }}
        >
          more_vert
        </div>
      </div>
      <p className="cardTitle font-semibold">{task.title}</p>
      <div>
        <p>{task.detail}</p>
      </div>
      <div className="cardDetail">
        <p>Due on {task.dueDate}</p>
      </div>
      <div className={getArrowPositionStyle(task.progressOrder)}>
        {task.progressOrder === TASK_PROGRESS_ID.NOT_STARTED && (
          <button
            className="material-icons cardIcons bg-yellow-500 hover:bg-yellow-700"
            onClick={(): void => moveTaskCard(task.id, TASK_PROGRESS_ID.IN_PROGRESS)}
          >
            chevron_right
          </button>
        )}
        {task.progressOrder === TASK_PROGRESS_ID.IN_PROGRESS && (
          <>
            <button
              className="material-icons cardIcons bg-red-500 hover:bg-red-700"
              onClick={(): void => moveTaskCard(task.id, TASK_PROGRESS_ID.NOT_STARTED)}
            >
              chevron_left
            </button>
            <button
              className="material-icons cardIcons bg-blue-500 hover:bg-blue-700"
              onClick={(): void => moveTaskCard(task.id, TASK_PROGRESS_ID.WAITING)}
            >
              chevron_right
            </button>
          </>
        )}
        {task.progressOrder === TASK_PROGRESS_ID.WAITING && (
          <>
            <button
              className="material-icons cardIcons bg-yellow-500 hover:bg-yellow-700"
              onClick={(): void => moveTaskCard(task.id, TASK_PROGRESS_ID.IN_PROGRESS)}
            >
              chevron_left
            </button>
            <button
              className="material-icons cardIcons bg-green-500 hover:bg-green-700"
              onClick={(): void => moveTaskCard(task.id, TASK_PROGRESS_ID.COMPLETED)}
            >
              chevron_right
            </button>
          </>
        )}
        {task.progressOrder === TASK_PROGRESS_ID.COMPLETED && (
          <button
            className="material-icons cardIcons bg-blue-500 hover:bg-blue-700"
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
          onDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  )
}

export default TaskCard
