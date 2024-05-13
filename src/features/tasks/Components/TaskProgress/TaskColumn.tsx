import TaskCard from './TaskCard'
import type { Task } from '../../../../types'
import TaskModal from '../shared/TaskModal'
import { TASK_MODAL_TYPE, TASK_PROGRESS_ID } from '../../../../constants/app'
import { useRecoilState } from 'recoil'
import { modalState } from '../state/state'
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

const newProgress = (columnTitle: string): number => {
  if (columnTitle === 'Not Started') {
    return TASK_PROGRESS_ID.NOT_STARTED
  } else if (columnTitle === 'In Progress') {
    return TASK_PROGRESS_ID.IN_PROGRESS
  } else if (columnTitle === 'In Review / Waiting') {
    return TASK_PROGRESS_ID.WAITING
  } else if (columnTitle === 'Completed') {
    return TASK_PROGRESS_ID.COMPLETED
  } else {
    return TASK_PROGRESS_ID.NOT_STARTED
  }
}

const TaskColumn = ({ columnTitle, tasks }: TaskColumnProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(modalState)
  return (
    <div className="w-[22%]">
      <div className="p-[0px 4px] flex items-center justify-between">
        <h2 className="text-xl text-white">{titleColor(columnTitle)}</h2>{' '}
        <div
          className="material-icons cursor-pointer text-2xl text-white"
          onClick={() => setIsModalOpen(true)}
        >
          add
        </div>
      </div>
      <div>
        {tasks.map((task: Task) => {
          return <TaskCard key={task.id} task={task} />
        })}
      </div>
      {isModalOpen && (
        <TaskModal
          headingTitle="Add your task"
          type={TASK_MODAL_TYPE.ADD}
          setIsModalOpen={setIsModalOpen}
          defaultProgressOrder={newProgress(columnTitle)}
        />
      )}
    </div>
  )
}

export default TaskColumn
