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
  const [isFilter, setIsFilter] = useState<boolean>(false)

  const [filter, setFilter] = useState<number>()
  const filteredTask = filter ? tasks.filter((task) => task.progressOrder == filter) : tasks

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
        <button className="list-button" onClick={() => setIsFilter(!isFilter)}>
          <span className="material-icons px-1">sort</span>
          Filter tasks
        </button>
        {/* filter button */}
        {isFilter && (
          <div className="filter-wrapper flex gap-5 text-white">
            <button
              className="list-button bg-[#eebbc3] text-[#232946] hover:bg-[#d7a7ae]"
              onClick={() => setFilter(undefined)}
            >
              <span className="material-icons px-1">sort</span>
              All Task
            </button>
            <button
              className="list-button bg-red-600 hover:bg-red-800"
              onClick={() => setFilter(TASK_PROGRESS_ID.NOT_STARTED)}
            >
              <span className="material-icons px-1">sort</span>
              Not Started
            </button>
            <button
              className="list-button bg-yellow-600 hover:bg-yellow-800"
              onClick={() => setFilter(TASK_PROGRESS_ID.IN_PROGRESS)}
            >
              <span className="material-icons px-1">sort</span>
              In Progress
            </button>
            <button
              className="list-button bg-blue-600 hover:bg-blue-800"
              onClick={() => setFilter(TASK_PROGRESS_ID.WAITING)}
            >
              <span className="material-icons px-1">sort</span>
              Waiting
            </button>
            <button
              className="list-button bg-green-600 hover:bg-green-800"
              onClick={() => setFilter(TASK_PROGRESS_ID.COMPLETED)}
            >
              <span className="material-icons px-1">sort</span>
              Completed
            </button>
          </div>
        )}
      </div>
      <div>
        <div className="table-head">
          <div className="tableHeaderTaskName">Task Name</div>
          <div className="tableHeaderDetail">Detail</div>
          <div className="tableHeaderDueDate">Due Date</div>
          <div className="tableHeaderProgress">Progress</div>
        </div>
        {filteredTask.map((task: Task) => {
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
