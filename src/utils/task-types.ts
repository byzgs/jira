import { useQuery } from "react-query"
import { TaskTypes } from "types/task-types"
import { useHttp } from "./http"

export const useTaskTypes = () => {
  const client = useHttp()

  //param变化，就重新触发
  return useQuery<TaskTypes[]>(['taskTypes'], () => client('taskTypes'))
}