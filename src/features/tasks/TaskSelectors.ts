import { selector } from 'recoil'
import { tasksState } from './TaskAtoms'
import type { Task } from '../../types'

const filterTasksByProgressOrder = (tasks: Task[], progressOrder: number): Task[] => {
  return tasks.filter((task) => task.progressOrder === progressOrder)
}

export const uncompletedTasksSelector = selector<Task[]>({
  key: 'uncompleted_tasksSelector',
  get: ({ get }) => {
    const tasks = get(tasksState)
    return filterTasksByProgressOrder(tasks, 1)
  },
})

export const completedTasksSelector = selector<Task[]>({
  key: 'completed_tasksSelector',
  get: ({ get }) => {
    const tasks = get(tasksState)
    return filterTasksByProgressOrder(tasks, 4)
  },
})

export const notStartedTasksSelector = selector<Task[]>({
  key: 'not_started_tasksSelector',
  get: ({ get }) => {
    const tasks = get(tasksState)
    return filterTasksByProgressOrder(tasks, 1)
  },
})

export const inProgressTasksSelector = selector<Task[]>({
  key: 'inProgress_tasksSelector',
  get: ({ get }) => {
    const tasks = get(tasksState)
    return filterTasksByProgressOrder(tasks, 2)
  },
})

export const waitingTasksSelector = selector<Task[]>({
  key: 'waiting_tasksSelector',
  get: ({ get }) => {
    const tasks = get(tasksState)
    return filterTasksByProgressOrder(tasks, 3)
  },
})
