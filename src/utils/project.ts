// 抽象出来对project的异步操作

import { useCallback, useEffect } from "react"
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query"
import { Project } from "screens/project-list/list"
import { useProjectsSearchParams } from "screens/project-list/util"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./use-async"
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimisitic-options"

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()

  //param变化，就重新触发
  return useQuery<Project[]>(['projects', param], () => client('projects', { data: param }))
}

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Project>) => client(`projects/${params.id}`, {
      data: params,
      method: 'PATCH'
    }),
    useEditConfig(queryKey)
  )

  // const { run, ...asyncResult } = useAsync()
  // 使用react-query缓存工程列表
  // const mutate = (params: Partial<Project>) => {
  //   return run(client(`projects/${params.id}`, {
  //     data: params,
  //     method: 'PATCH'
  //   }))
  // }
  // return {
  //   mutate,
  //   ...asyncResult
  // }
}

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Project>) => client(`projects`, {
      data: params,
      method: 'POST'
    }),
    useAddConfig(queryKey)
  )


  // 使用react-query缓存工程列表
  // const { run, ...asyncResult } = useAsync()
  // const client = useHttp()
  // const mutate = (params: Partial<Project>) => {
  //   return run(client(`projects/${params.id}`, {
  //     data: params,
  //     method: 'POST'
  //   }))
  // }
  // return {
  //   mutate,
  //   ...asyncResult
  // }
}

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    ({ id }: { id: number }) => client(`projects/${id}`, {
      method: 'DELETE'
    }),
    useDeleteConfig(queryKey)
  )
}

export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<Project>(
    ['project', { id }],
    () => client(`projects/${id}`),
    //第三个参数，config,只有当id为真，有值时，才触发
    {
      enabled: !!id
    }
  )
}