import { Dispatch, SetStateAction } from 'react'
import { modalState } from '../state/state'
import { useRecoilState } from 'recoil'
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
  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(modalState)
  const handleDeleteClick = () => {
    onDeleteTask(taskData.id)
    setIsMenuOpen(false)
  }
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
      <div className="menuItem hover:bg-white hover:text-red-600" onClick={handleDeleteClick}>
        <span className="material-icons px-1">delete</span>Delete
      </div>
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
