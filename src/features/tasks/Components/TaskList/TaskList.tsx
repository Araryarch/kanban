import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { tasksState } from '../../TaskAtoms'
import TaskListItem from './TaskListItem'
import type { Task } from '../../../../types'
import TaskModal from '../shared/TaskModal'
import { TASK_PROGRESS_ID, TASK_MODAL_TYPE } from '../../../../constants/app'

const TaskList = (): JSX.Element => {
  const tasks: Task[] = useRecoilValue(tasksState)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <div className="list-container">
      <h1 className="task-title">Your Tasks</h1>
      <div className="task-button-wrapper">
        <button
          className="list-button"
          onClick={(): void => {
            setIsModalOpen(true)
          }}
        >
          <span className="material-icons px-1">add</span>Add task
        </button>
        <button className="list-button">
          <span className="material-icons px-1">sort</span>Filter tasks
        </button>
      </div>
      <div>
        <div className="table-head">
          <div className="tableHeaderTaskName">Task Name</div>
          <div className="tableHeaderDetail">Detail</div>
          <div className="tableHeaderDueDate">Due Date</div>
          <div className="tableHeaderProgress">Progress</div>
        </div>
        {tasks.map((task: Task) => {
          return <TaskListItem task={task} key={task.id} />
        })}
      </div>
      {isModalOpen && (
        <TaskModal
          headingTitle="Add your task"
          type={TASK_MODAL_TYPE.ADD}
          setIsModalOpen={setIsModalOpen}
          defaultProgressOrder={TASK_PROGRESS_ID.NOT_STARTED}
        />
      )}
    </div>
  )
}

export default TaskList
