import type { Task } from '../../../../types'

interface TaskCardProps {
  task: Task
}

const getArrowPositionStyle = (progressOrder: number): string => {
  const justifyContentValue: 'justify-end' | 'justify-between' =
    progressOrder === 1 ? 'justify-end' : 'justify-between'
  return `flex ${justifyContentValue}`
}

const TaskCard = ({ task }: TaskCardProps): JSX.Element => {
  return (
    <div className="taskCard">
      <div className="taskIcons">
        <div className="material-icons text-[#0f0e17]">check_circle</div>
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
        {task.progressOrder !== 1 && (
          <button className="material-icons cardIcons">chevron_left</button>
        )}
        {task.progressOrder !== 4 && (
          <button className="material-icons cardIcons">chevron_right</button>
        )}
      </div>
    </div>
  )
}

export default TaskCard