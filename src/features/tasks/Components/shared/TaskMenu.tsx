import type { Dispatch, SetStateAction } from 'react'

interface TaskMenuProps {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
  responsive: string
}

const TaskMenu = ({ setIsMenuOpen, responsive }: TaskMenuProps): JSX.Element => {
  return (
    <div className={`${responsive} menu`}>
      <div className="menuItem hover:text-green-600">
        <span className="material-icons px-1">edit</span>Edit
      </div>
      <div className="menuItem hover:text-red-600">
        <span className="material-icons px-1">delete</span>Delete
      </div>
      <span
        className="material-icons closeIcon"
        onClick={(): void => {
          setIsMenuOpen(false)
        }}
      >
        close
      </span>
    </div>
  )
}

export default TaskMenu
