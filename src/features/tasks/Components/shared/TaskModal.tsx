import type { Dispatch, SetStateAction } from 'react'
import TaskForm from './TaskForm'

interface TaskModalProps {
  headingTitle: string
  type: string
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  defaultProgressOrder: number
}

const TaskModal = ({
  headingTitle,
  type,
  setIsModalOpen,
  defaultProgressOrder,
}: TaskModalProps): JSX.Element => {
  return (
    <div className="modalContainer">
      <div className="flex items-center justify-between py-2">
        <h1>{headingTitle}</h1>
        <span
          className="material-icons cursor-pointer text-4xl"
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
      />
    </div>
  )
}

export default TaskModal
