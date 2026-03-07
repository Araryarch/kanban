import type { Dispatch, SetStateAction } from 'react'
import TaskForm from './TaskForm'
import { Task } from '../../../../types'

interface TaskModalProps {
  headingTitle: string
  type: string
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  defaultProgressOrder: number
  taskData?: Task
}

const TaskModal = ({
  headingTitle,
  type,
  setIsModalOpen,
  defaultProgressOrder,
  taskData,
}: TaskModalProps): JSX.Element => {
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-20"
        onClick={(): void => {
          setIsModalOpen(false)
        }}
      ></div>
      <div className="modalContainer text-slate-900 dark:text-white">
        <div className="flex items-center justify-between border-b border-slate-300 pb-6 dark:border-slate-700">
          <h1 className="text-2xl font-extralight uppercase tracking-widest">{headingTitle}</h1>
          <button
            className="material-icons cursor-pointer border border-red-600 p-2 text-xl text-red-600 transition-all hover:bg-red-600 hover:text-white"
            onClick={(): void => {
              setIsModalOpen(false)
            }}
          >
            close
          </button>
        </div>
        <TaskForm
          type={type}
          defaultProgressOrder={defaultProgressOrder}
          setIsModalOpen={setIsModalOpen}
          taskData={taskData}
          taskId={taskData?.id}
        />
      </div>
    </>
  )
}

export default TaskModal
