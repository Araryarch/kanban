import TaskCard from './TaskCard'
import type { Task } from '../../../../types'

interface TaskColumnProps {
  columnTitle: string
  tasks: Task[]
}

const titleColor = (columnTitle: string): JSX.Element => {
  if (columnTitle === 'Not Started') {
    return <span className="text-red-500">Not Started</span>
  } else if (columnTitle === 'In Progress') {
    return <span className="text-yellow-500">In Progress</span>
  } else if (columnTitle === 'In Review / Waiting') {
    return <span className="text-blue-500">In Review / Waiting</span>
  } else if (columnTitle === 'Completed') {
    return <span className="text-green-500">Completed</span>
  } else {
    return <span>{columnTitle}</span>
  }
}

const TaskColumn = ({ columnTitle, tasks }: TaskColumnProps): JSX.Element => {
  return (
    <div className="w-[22%]">
      <div className="p-[0px 4px] flex items-center justify-between">
        <h2 className="text-xl text-white">{titleColor(columnTitle)}</h2>{' '}
        <div className="material-icons cursor-pointer text-2xl text-white">add</div>
      </div>
      <div>
        {tasks.map((task: Task) => {
          return <TaskCard key={task.id} task={task} />
        })}
      </div>
    </div>
  )
}

export default TaskColumn
