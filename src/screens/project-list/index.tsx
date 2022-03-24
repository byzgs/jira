import React from "react"
import { useEffect, useState } from "react"
import * as qs from "qs";
import { cleanObject, useMount, useDebounce } from "utils"
import { List, Project } from "./list"
import { SearchPanel } from "./search-panel"
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useAsync } from "utils/use-async";

export const ProjectListScreen = () => {

  const apiUrl = process.env.REACT_APP_API_URL

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debouncedParam = useDebounce(param, 2000)

  // const [list, setList] = useState([]) --> 用了useAsync来处理异步操作

  const [users, setUsers] = useState([])
  // 自定义hook，处理异步操作
  const { run, isLoading, error, data: list } = useAsync<Project[]>()

  const client = useHttp()

  useEffect(() => {
    run(client('projects', { data: cleanObject(debouncedParam) }))
      
  }, [debouncedParam])

  useMount(() => {
    client('users').then(setUsers)
    // fetch(`${apiUrl}/users`).then(async response => {
    //   if(response.ok) {
    //     setUsers(await response.json())
    //   }
    // })
  })

  return <Container>
    <h1>项目列表</h1>
    <SearchPanel users={users} param={param} setParam={setParam} />
    {
      error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null
    }
    <List dataSource={list || []} loading={isLoading} users={users} />
  </Container>
}

const Container = styled.div`
padding: 3.2rem;
`