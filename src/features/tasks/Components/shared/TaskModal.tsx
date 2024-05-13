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
    <div className="modalContainer font-semibold">
      <div className="flex items-center justify-between py-2">
        <h1>{headingTitle}</h1>
        <span
          className="material-icons cursor-pointer rounded-md bg-red-500 px-2 py-1 text-4xl hover:bg-red-700"
          onClick={(): void => {
            setIsModalOpen(false)
          }}
        >
          close
        </span>
      </div>
      <TaskForm
        type={type}
        defaultProgressOrder={defaultProgressOrder}
        setIsModalOpen={setIsModalOpen}
        taskData={taskData}
        taskId={taskData?.id}
      />
    </div>
  )
}

export default TaskModal
