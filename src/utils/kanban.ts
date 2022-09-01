import { QueryKey, useMutation, useQuery } from "react-query"
import { Kanban } from "types/kanban"
import { Task } from "types/task"
import { useHttp } from "./http"
import { useAddConfig } from "./use-optimisitic-options"

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp()

  //param变化，就重新触发
  return useQuery<Kanban[]>(['kanbans', param], () => client('kanbans', { data: param }))
}

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Kanban>) => client(`kanbans`, {
      data: params,
      method: 'POST'
    }),
    useAddConfig(queryKey)
  )

}

export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    ({ id }: { id: number }) => client(`kanbans/${id}`, {
      method: 'DELETE'
    }),
    useAddConfig(queryKey)
  )

}


