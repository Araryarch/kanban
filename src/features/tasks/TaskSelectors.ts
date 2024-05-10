import { selector } from 'recoil'
import { SelectorKeys } from '../../constants/recoilKeys'
import { tasksState } from './TaskAtoms'
import type { Task } from '../../types'

const filterTasksByProgressOrder = (tasks: Task[], progressOrder: number): Task[] => {
  return tasks.filter((task) => task.progressOrder === progressOrder)
}

export const uncompletedTasksSelector = selector<Task[]>({
  key: SelectorKeys.UNCOMPLETED_TASKS,
  get: ({ get }) => {
    const tasks = get(tasksState)
    return filterTasksByProgressOrder(tasks, 1)
  },
})

export const completedTasksSelector = selector<Task[]>({
  key: SelectorKeys.COMPLETED_TASKS,
  get: ({ get }) => {
    const tasks = get(tasksState)
    return filterTasksByProgressOrder(tasks, 4)
  },
})

export const notStartedTasksSelector = selector<Task[]>({
  key: SelectorKeys.NOT_STARTED_TASKS,
  get: ({ get }) => {
    const tasks = get(tasksState)
    return filterTasksByProgressOrder(tasks, 1)
  },
})

export const inProgressTasksSelector = selector<Task[]>({
  key: SelectorKeys.IN_PROGRESS_TASKS,
  get: ({ get }) => {
    const tasks = get(tasksState)
    return filterTasksByProgressOrder(tasks, 2)
  },
})

export const waitingTasksSelector = selector<Task[]>({
  key: SelectorKeys.WAITING_TASKS,
  get: ({ get }) => {
    const tasks = get(tasksState)
    return filterTasksByProgressOrder(tasks, 3)
  },
})
