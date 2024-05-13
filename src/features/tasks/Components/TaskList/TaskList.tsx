import { useState } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { modalState } from '../state/state'
import { tasksState } from '../../TaskAtoms'
import TaskListItem from './TaskListItem'
import type { Task } from '../../../../types'
import TaskModal from '../shared/TaskModal'
import { TASK_PROGRESS_ID, TASK_MODAL_TYPE } from '../../../../constants/app'

const TaskList = (): JSX.Element => {
  const tasks: Task[] = useRecoilValue(tasksState)
  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(modalState)
  const [isFilter, setIsFilter] = useState<boolean>(false)
  const [filter, setFilter] = useState<number>()
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: boolean }>({
    all: true,
    notStarted: false,
    inProgress: false,
    waiting: false,
    completed: false,
  })

  const handleClick = (progress: number | undefined, filterName: string): void => {
    setFilter(progress)
    setActiveFilters({
      ...activeFilters,
      all: false,
      notStarted: false,
      inProgress: false,
      waiting: false,
      completed: false,
      [filterName]: true,
    })
    setIsFilter(false)
  }

  const filterClassName = (filterName: string): string => {
    return activeFilters[filterName]
      ? 'bg-opacity-100 text-white shadow-md shadow-[#ff8906]'
      : 'bg-opacity-20'
  }

  const filteredTask = filter ? tasks.filter((task) => task.progressOrder === filter) : tasks

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
        {isFilter && (
          <div className="filter-wrapper flex gap-5 text-white">
            <button
              className={`list-button bg-[#232946] hover:bg-[#232946] ${filterClassName('all')}`}
              onClick={() => handleClick(undefined, 'all')}
            >
              <span className="material-icons px-1">menu</span>
              All Task
            </button>
            <button
              className={`list-button bg-red-600 hover:bg-red-600 ${filterClassName('notStarted')}`}
              onClick={() => handleClick(TASK_PROGRESS_ID.NOT_STARTED, 'notStarted')}
            >
              <span className="material-icons px-1">hourglass_disabled</span>
              Not Started
            </button>
            <button
              className={`list-button bg-yellow-600 hover:bg-yellow-600 ${filterClassName('inProgress')}`}
              onClick={() => handleClick(TASK_PROGRESS_ID.IN_PROGRESS, 'inProgress')}
            >
              <span className="material-icons px-1">hourglass_top</span>
              In Progress
            </button>
            <button
              className={`list-button bg-blue-600 hover:bg-blue-600 ${filterClassName('waiting')}`}
              onClick={() => handleClick(TASK_PROGRESS_ID.WAITING, 'waiting')}
            >
              <span className="material-icons px-1">pending</span>
              Waiting
            </button>
            <button
              className={`list-button bg-green-600 hover:bg-green-600 ${filterClassName('completed')}`}
              onClick={() => handleClick(TASK_PROGRESS_ID.COMPLETED, 'completed')}
            >
              <span className="material-icons px-1">done_all</span>
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
