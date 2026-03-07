import TaskCard from './TaskCard'
import type { Task } from '../../../../types'
import TaskModal from '../shared/TaskModal'
import { TASK_MODAL_TYPE, TASK_PROGRESS_ID } from '../../../../constants/app'
import { useState } from 'react'
interface TaskColumnProps {
  columnTitle: string
  tasks: Task[]
}

const titleColor = (columnTitle: string): JSX.Element => {
  if (columnTitle === 'Not Started') {
    return (
      <span className="inline-flex items-center gap-3 border border-red-600 px-4 py-2 text-xs font-medium uppercase tracking-widest text-red-600">
        <span className="material-icons text-sm">hourglass_disabled</span>
        Not Started
      </span>
    )
  } else if (columnTitle === 'In Progress') {
    return (
      <span className="inline-flex items-center gap-3 border border-yellow-600 px-4 py-2 text-xs font-medium uppercase tracking-widest text-yellow-600">
        <span className="material-icons text-sm">hourglass_top</span>
        In Progress
      </span>
    )
  } else if (columnTitle === 'In Review / Waiting') {
    return (
      <span className="inline-flex items-center gap-3 border border-blue-600 px-4 py-2 text-xs font-medium uppercase tracking-widest text-blue-600">
        <span className="material-icons text-sm">pending</span>
        Waiting
      </span>
    )
  } else if (columnTitle === 'Completed') {
    return (
      <span className="inline-flex items-center gap-3 border border-green-600 px-4 py-2 text-xs font-medium uppercase tracking-widest text-green-600">
        <span className="material-icons text-sm">check_circle</span>
        Completed
      </span>
    )
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  return (
    <div className="w-[23%]">
      <div className="mb-6 flex items-center justify-between border-b border-slate-300 bg-white p-6 dark:border-slate-700 dark:bg-slate-950">
        <h2 className="text-xs">{titleColor(columnTitle)}</h2>
        <button
          className="material-icons cursor-pointer border border-slate-900 bg-transparent p-2 text-lg text-slate-900 transition-all hover:bg-slate-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-slate-900"
          onClick={() => setIsModalOpen(true)}
        >
          add
        </button>
      </div>
      <div className="space-y-4">
        {tasks.map((task: Task) => {
          return <TaskCard key={task.id} task={task} />
        })}
      </div>
      {isModalOpen && (
        <TaskModal
          headingTitle="New Task"
          type={TASK_MODAL_TYPE.ADD}
          setIsModalOpen={setIsModalOpen}
          defaultProgressOrder={newProgress(columnTitle)}
        />
      )}
    </div>
  )
}

export default TaskColumn
