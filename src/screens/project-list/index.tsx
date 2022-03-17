import React from "react"
import { useEffect, useState } from "react"
import * as qs from "qs";
import { cleanObject, useMount, useDebounce } from "utils"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useHttp } from "utils/http";

export const ProjectListScreen = () => {

  const apiUrl = process.env.REACT_APP_API_URL

  const [param, setParam] = useState({
    name:'',
    personId:''
  })
  const debouncedParam = useDebounce(param,2000)

  const [list,setList] = useState([])

  const [users,setUsers] = useState([])

  const client = useHttp()

  useEffect(()=> {
    client('projects', {data: cleanObject(debouncedParam)}).then(setList)

  },[debouncedParam])

  useMount(()=> {
    client('users').then(setUsers)
    // fetch(`${apiUrl}/users`).then(async response => {
    //   if(response.ok) {
    //     setUsers(await response.json())
    //   }
    // })
  })

  return <div>
    <SearchPanel users={users} param={param} setParam={setParam} />
    <List list={list} users={users} />
  </div>
}