// 抽象出来对users的异步操作

import { User } from "types/user";
import { useEffect } from "react"
import { cleanObject, useMount } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./use-async"
import { useQuery } from "react-query";

// export const useUsers = (param?: Partial<User>) => {
//   const client = useHttp()
//   const { run, ...result } = useAsync<User[]>()

//   useMount(() => {
//     run(client('users', { data: cleanObject(param || {}) }))
//     // fetch(`${apiUrl}/users`).then(async response => {
//     //   if(response.ok) {
//     //     setUsers(await response.json())
//     //   }
//     // })
//   })

//   return result
// }

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp()

  //param变化，就重新触发
  return useQuery<User[]>(['users', param], () => client('users', { data: param }))
}