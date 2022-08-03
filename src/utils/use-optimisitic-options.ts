//乐观更新

import { QueryKey, useQueryClient } from "react-query"
import { Project } from "types/project"

export const useConfig = (queryKey: QueryKey, callback: (target: any, old?: any[]) => any[]) => {
  const queryClient = useQueryClient()
  const previousItems = queryClient.getQueryData(queryKey)
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target: any) {
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old)
      })
      return { previousItems }
    },
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItems)
    }
  }
}

export const useEditConfig = (queryKey: QueryKey) => {
  return useConfig(queryKey, (target, old: any[] | undefined) => old?.map((item: { id: any }) => item.id === target.id ? { ...item, ...target } : item) || [])
}
export const useAddConfig = (queryKey: QueryKey) => {
  return useConfig(queryKey, (target, old: any[] | undefined) => old ? [...old, target] : [])
}
export const useDeleteConfig = (queryKey: QueryKey) => {
  return useConfig(queryKey, (target, old: any[] | undefined) => old?.filter((item: { id: any }) => item.id !== target.id) || [])
} 