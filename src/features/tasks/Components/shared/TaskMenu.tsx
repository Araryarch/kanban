import { Dispatch, SetStateAction, useState } from 'react'
import TaskModal from '../shared/TaskModal'
import { TASK_MODAL_TYPE, TASK_PROGRESS_ID } from '../../../../constants/app'
interface TaskMenuProps {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
  responsive: string
}

const TaskMenu = ({ setIsMenuOpen, responsive }: TaskMenuProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  return (
    <div className={`${responsive} menu`}>
      <div className="close-wrapper flex justify-end gap-2 p-1">
        <div
          className="menuItem flex-1 hover:bg-white hover:text-[#3da9fc]"
          onClick={(): void => setIsModalOpen(true)}
        >
          <span className="material-icons px-1">edit</span>
          Edit
        </div>
        <span className="material-icons closeIcon" onClick={() => setIsMenuOpen(false)}>
          close
        </span>
      </div>
      <div className="menuItem hover:bg-white hover:text-red-600">
        <span className="material-icons px-1">delete</span>Delete
      </div>
      {isModalOpen && (
        <TaskModal
          setIsModalOpen={setIsModalOpen}
          type={TASK_MODAL_TYPE.EDIT}
          headingTitle="Edit your task"
          defaultProgressOrder={TASK_PROGRESS_ID.NOT_STARTED}
        />
      )}
    </div>
  )
}

export default TaskMenu
