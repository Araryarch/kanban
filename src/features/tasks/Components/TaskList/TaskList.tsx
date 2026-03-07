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
      <h1 className="task-title">Tasks</h1>
      <div className="task-button-wrapper">
        <button
          className="list-button"
          onClick={(): void => {
            setIsModalOpen(true)
          }}
        >
          <span className="material-icons text-base">add</span>
          New Task
        </button>
        <button className="list-button" onClick={() => setIsFilter(!isFilter)}>
          <span className="material-icons text-base">filter_list</span>
          Filter
        </button>
        {isFilter && (
          <div className="flex flex-wrap gap-3">
            <button
              className={`list-button ${activeFilters.all ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900' : ''}`}
              onClick={() => handleClick(undefined, 'all')}
            >
              All
            </button>
            <button
              className={`list-button ${activeFilters.notStarted ? 'border-red-600 bg-red-600 text-white' : ''}`}
              onClick={() => handleClick(TASK_PROGRESS_ID.NOT_STARTED, 'notStarted')}
            >
              Not Started
            </button>
            <button
              className={`list-button ${activeFilters.inProgress ? 'border-yellow-600 bg-yellow-600 text-white' : ''}`}
              onClick={() => handleClick(TASK_PROGRESS_ID.IN_PROGRESS, 'inProgress')}
            >
              In Progress
            </button>
            <button
              className={`list-button ${activeFilters.waiting ? 'border-blue-600 bg-blue-600 text-white' : ''}`}
              onClick={() => handleClick(TASK_PROGRESS_ID.WAITING, 'waiting')}
            >
              Waiting
            </button>
            <button
              className={`list-button ${activeFilters.completed ? 'border-green-600 bg-green-600 text-white' : ''}`}
              onClick={() => handleClick(TASK_PROGRESS_ID.COMPLETED, 'completed')}
            >
              Completed
            </button>
          </div>
        )}
      </div>
      <div className="overflow-hidden border border-slate-300 dark:border-slate-700">
        <div className="table-head">
          <div className="tableHeaderTaskName">Task</div>
          <div className="tableHeaderDetail">Description</div>
          <div className="tableHeaderDueDate">Due Date</div>
          <div className="tableHeaderProgress">Status</div>
        </div>
        {filteredTask.map((task: Task) => {
          return <TaskListItem task={task} key={task.id} />
        })}
      </div>
      {isModalOpen && (
        <TaskModal
          headingTitle="New Task"
          type={TASK_MODAL_TYPE.ADD}
          setIsModalOpen={setIsModalOpen}
          defaultProgressOrder={TASK_PROGRESS_ID.NOT_STARTED}
        />
      )}
    </div>
  )
}

export default TaskList
