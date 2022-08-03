import { useQuery } from "react-query"
import { Task } from "types/task"
import { useHttp } from "./http"

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp()

  //param变化，就重新触发
  return useQuery<Task[]>(['tasks', param], () => client('tasks', { data: param }))
}