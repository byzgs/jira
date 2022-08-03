import { useQuery } from "react-query"
import { Kanban } from "types/kanban"
import { useHttp } from "./http"

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp()

  //param变化，就重新触发
  return useQuery<Kanban[]>(['kanbans', param], () => client('kanbans', { data: param }))
}