import { useState } from 'react'
import { TASK_PROGRESS_ID, TASK_PROGRESS_STATUS, TASK_MODAL_TYPE } from '../../../../constants/app'
import { useTasksAction } from '../../hooks/Tasks'
import type { Dispatch, SetStateAction } from 'react'

interface TaskFormProps {
  type: string
  defaultProgressOrder: number
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

const TaskForm = ({ type, defaultProgressOrder, setIsModalOpen }: TaskFormProps): JSX.Element => {
  const [title, setTitle] = useState<string>('')
  const [detail, setDetail] = useState<string>('')
  const [dueDate, setDueDate] = useState<string>('')
  const [progressOrder, setProgressOrder] = useState<number>(defaultProgressOrder)
  const { addTask } = useTasksAction()

  const handleSubmit = (): void => {
    if (type === TASK_MODAL_TYPE.ADD) {
      addTask(title, detail, dueDate, progressOrder)
      setIsModalOpen(false)
    }
  }
  return (
    <form className="form">
      <div className="formItem">
        <label>Title：</label>
        <input
          type="text"
          value={title}
          onChange={(e): void => {
            setTitle(e.target.value)
          }}
          className="formInput"
        />
      </div>
      <div className="formItem">
        <label>Detail：</label>
        <textarea
          value={detail}
          onChange={(e): void => {
            setDetail(e.target.value)
          }}
          className="formTextArea"
        />
      </div>
      <div className="formItem">
        <label>Due Date：</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e): void => {
            setDueDate(e.target.value)
          }}
          className="formInput"
        />
      </div>
      <div className="formItem">
        <label>Progress：</label>
        <select
          className="formInput"
          defaultValue={progressOrder}
          onChange={(e): void => {
            setProgressOrder(Number(e.target.value))
          }}
        >
          <option value={TASK_PROGRESS_ID.NOT_STARTED}>{TASK_PROGRESS_STATUS.NOT_STARTED}</option>
          <option value={TASK_PROGRESS_ID.IN_PROGRESS}>{TASK_PROGRESS_STATUS.IN_PROGRESS}</option>
          <option value={TASK_PROGRESS_ID.WAITING}>{TASK_PROGRESS_STATUS.WAITING}</option>
          <option value={TASK_PROGRESS_ID.COMPLETED}>{TASK_PROGRESS_STATUS.COMPLETED}</option>
        </select>
      </div>
      <button
        type="button"
        className="formButton"
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
