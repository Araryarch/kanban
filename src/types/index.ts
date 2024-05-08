export interface CSSProperties {
  [key: string]: React.CSSProperties
}

export interface Task {
  id: number
  title: string
  detail: string
  dueDate: string
  progressOrder: number
}
