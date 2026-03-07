import { Dispatch, SetStateAction, useState } from 'react'
import TaskModal from '../shared/TaskModal'
import { TASK_MODAL_TYPE, TASK_PROGRESS_ID } from '../../../../constants/app'
import { Task } from '../../../../types'
interface TaskMenuProps {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
  onDeleteTask: (taskId: number) => void
  responsive: string
  taskData: Task
}

const TaskMenu = ({
  setIsMenuOpen,
  responsive,
  taskData,
  onDeleteTask,
}: TaskMenuProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const handleDeleteClick = () => {
    onDeleteTask(taskData.id)
    setIsMenuOpen(false)
  }
  return (
    <div className={`${responsive} menu`}>
      <div className="close-wrapper mb-2 flex justify-end">
        <button
          className="material-icons closeIcon"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
        >
          close
        </button>
      </div>
      <button
        className="menuItem w-full hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900 dark:hover:text-indigo-300"
        onClick={(): void => setIsModalOpen(true)}
      >
        <span className="material-icons">edit</span>
        Edit
      </button>
      <button
        className="menuItem w-full hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900 dark:hover:text-red-300"
        onClick={handleDeleteClick}
      >
        <span className="material-icons">delete</span>
        Delete
      </button>
      {isModalOpen && (
        <TaskModal
          setIsModalOpen={setIsModalOpen}
          type={TASK_MODAL_TYPE.EDIT}
          headingTitle="Edit your task"
          defaultProgressOrder={TASK_PROGRESS_ID.NOT_STARTED}
          taskData={taskData}
        />
      )}
    </div>
  )
}

export default TaskMenu
