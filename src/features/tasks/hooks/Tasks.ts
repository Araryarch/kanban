import { useRecoilState } from 'recoil'
import { tasksState } from '../TaskAtoms'
import type { Task } from '../../../types'
import { TASK_PROGRESS_ID } from '../../../constants/app'

interface useTaskActionType {
  completeTask: (taskId: number) => void
  moveTaskCard: (taskId: number, nextStatusId: number) => void
  addTask: (title: string, detail: string, dueDate: string, progressOrder: number) => void
  editTask: (taskId: number, updatedTask: Task) => void
}

export const useTasksAction = (): useTaskActionType => {
  const [tasks, setTasks] = useRecoilState<Task[]>(tasksState)

  const completeTask = (taskId: number): void => {
    const updatedTasks: Task[] = tasks.map((task) =>
      task.id === taskId ? { ...task, progressOrder: TASK_PROGRESS_ID.COMPLETED } : task,
    )
    setTasks(updatedTasks)
  }

  const moveTaskCard = (taskId: number, nextStatusId: number): void => {
    const updatedTasks: Task[] = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, progressOrder: nextStatusId }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  const addTask = (title: string, detail: string, dueDate: string, progressOrder: number): void => {
    const newTask: Task = {
      id: tasks.length + 1,
      title,
      detail,
      dueDate,
      progressOrder,
    }
    setTasks([...tasks, newTask])
  }

  const editTask = (taskId: number, updatedTask: Task): void => {
    const updatedTasks: Task[] = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedTask } : task,
    )
    setTasks(updatedTasks)
  }

  return {
    completeTask,
    moveTaskCard,
    addTask,
    editTask,
  }
}
