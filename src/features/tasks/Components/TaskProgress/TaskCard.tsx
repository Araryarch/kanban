import type { Task } from '../../../../types'
import { TASK_PROGRESS_ID } from '../../../../constants/app'
import { useTasksAction } from '../../hooks/Tasks'

interface TaskCardProps {
  task: Task
}

const getIconStyle = (progressOrder: number): string => {
  const colorClass =
    progressOrder === TASK_PROGRESS_ID.COMPLETED ? 'text-green-500' : 'text-gray-500'
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
  const { completeTask } = useTasksAction()
  return (
    <div className="taskCard">
      <div className="taskIcons">
        <div
          className={`${getIconStyle(task.progressOrder)} text-[#0f0e17]`}
          onClick={(): void => completeTask(task.id)}
        >
          check_circle
        </div>
        <div className="material-icons menuIcons">more_vert</div>
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
          <button className="material-icons cardIcons bg-yellow-500 hover:bg-yellow-700">
            chevron_right
          </button>
        )}
        {task.progressOrder !== TASK_PROGRESS_ID.NOT_STARTED &&
          task.progressOrder !== TASK_PROGRESS_ID.COMPLETED && (
            <>
              <button
                className={`material-icons cardIcons ${task.progressOrder === TASK_PROGRESS_ID.IN_PROGRESS ? 'bg-red-500 hover:bg-red-700' : 'bg-yellow-500 hover:bg-yellow-700'}`}
              >
                chevron_left
              </button>
              <button
                className={`material-icons cardIcons ${task.progressOrder === TASK_PROGRESS_ID.IN_PROGRESS ? 'bg-blue-500 hover:bg-blue-700' : 'bg-green-500 hover:bg-green-700'}`}
              >
                chevron_right
              </button>
            </>
          )}
        {task.progressOrder === TASK_PROGRESS_ID.COMPLETED && (
          <button className="material-icons cardIcons bg-blue-500 hover:bg-blue-700">
            chevron_left
          </button>
        )}
      </div>
    </div>
  )
}

export default TaskCard
