import { useState, useEffect } from 'react'
import { TASK_PROGRESS_ID, TASK_PROGRESS_STATUS, TASK_MODAL_TYPE } from '../../../../constants/app'
import { useTasksAction } from '../../hooks/Tasks'
import type { Dispatch, SetStateAction } from 'react'
import type { Task } from '../../../../types'

interface TaskFormProps {
  type?: string
  defaultProgressOrder?: number
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  taskId?: number
  taskData?: Task
}

const TaskForm = ({
  type,
  defaultProgressOrder,
  setIsModalOpen,
  taskId,
  taskData,
}: TaskFormProps): JSX.Element => {
  const [title, setTitle] = useState<string>('')
  const [detail, setDetail] = useState<string>('')
  const [dueDate, setDueDate] = useState<string>('')
  const [progressOrder, setProgressOrder] = useState<number>(defaultProgressOrder || 0)

  const { addTask, editTask } = useTasksAction()

  useEffect(() => {
    if (taskData) {
      setTitle(taskData.title || '')
      setDetail(taskData.detail || '')
      setDueDate(taskData.dueDate || '')
      setProgressOrder(taskData.progressOrder || defaultProgressOrder || 0)
    }
  }, [taskData, defaultProgressOrder])

  const handleSubmit = (): void => {
    if (type === TASK_MODAL_TYPE.ADD) {
      addTask(title, detail, dueDate, progressOrder)
    }
    if (type === TASK_MODAL_TYPE.EDIT && taskId !== undefined) {
      console.log('aku diedit jir')
      const updatedTask: Task = {
        id: taskId,
        title,
        detail,
        dueDate,
        progressOrder,
      }
      editTask(taskId, updatedTask)
    }
    setIsModalOpen(false)
  }

  return (
    <form className="form">
      <div className="formItem">
        <label className="text-xs font-medium uppercase tracking-wider text-slate-600 dark:text-slate-400">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e): void => {
            setTitle(e.target.value)
          }}
          className="formInput"
          required
        />
      </div>
      <div className="formItem">
        <label className="text-xs font-medium uppercase tracking-wider text-slate-600 dark:text-slate-400">
          Detail
        </label>
        <textarea
          value={detail}
          onChange={(e): void => {
            setDetail(e.target.value)
          }}
          className="formTextArea"
          required
        />
      </div>
      <div className="formItem">
        <label className="text-xs font-medium uppercase tracking-wider text-slate-600 dark:text-slate-400">
          Due Date
        </label>
        <input
          type="date"
          value={dueDate}
          onChange={(e): void => {
            setDueDate(e.target.value)
          }}
          className="formInput"
          required
        />
      </div>
      <div className="formItem">
        <label className="text-xs font-medium uppercase tracking-wider text-slate-600 dark:text-slate-400">
          Progress
        </label>
        <select
          className="formInput"
          defaultValue={1}
          value={progressOrder}
          onChange={(e): void => {
            setProgressOrder(Number(e.target.value))
          }}
          required
        >
          <option value={TASK_PROGRESS_ID.NOT_STARTED}>{TASK_PROGRESS_STATUS.NOT_STARTED}</option>
          <option value={TASK_PROGRESS_ID.IN_PROGRESS}>{TASK_PROGRESS_STATUS.IN_PROGRESS}</option>
          <option value={TASK_PROGRESS_ID.WAITING}>{TASK_PROGRESS_STATUS.WAITING}</option>
          <option value={TASK_PROGRESS_ID.COMPLETED}>{TASK_PROGRESS_STATUS.COMPLETED}</option>
        </select>
      </div>
      <button
        type="button"
        className="formButton mt-4 w-full"
        onClick={(): void => {
          handleSubmit()
        }}
      >
        Submit
      </button>
    </form>
  )
}

export default TaskForm
