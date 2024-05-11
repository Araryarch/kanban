import React, { Dispatch, SetStateAction } from 'react'

interface TaskMenuProps {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
  responsive: string
  openModal: () => void
}

const TaskMenu: React.FC<TaskMenuProps> = ({
  setIsMenuOpen,
  responsive,
  openModal,
}: TaskMenuProps): JSX.Element => {
  const handleOpenModal = () => {
    openModal()
  }

  return (
    <div className={`${responsive} menu`}>
      <div className="close-wrapper flex justify-end gap-2 p-1">
        <div
          className="menuItem flex-1 hover:bg-white hover:text-[#3da9fc]"
          onClick={handleOpenModal}
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
    </div>
  )
}

export default TaskMenu
