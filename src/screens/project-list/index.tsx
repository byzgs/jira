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
import { useProjects } from "utils/project";
import { useUsers } from "utils/users";

export const ProjectListScreen = () => {

  const apiUrl = process.env.REACT_APP_API_URL

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debouncedParam = useDebounce(param, 2000)

  // const [list, setList] = useState([]) --> 用了useAsync来处理异步操作

  // 自定义hook，处理异步操作
  const { isLoading, error, data: list } = useProjects(debouncedParam)
  const {data:users} = useUsers()
  const client = useHttp()



  return <Container>
    <h1>项目列表</h1>
    <SearchPanel users={users || []} param={param} setParam={setParam} />
    {
      error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null
    }
    <List dataSource={list || []} loading={isLoading} users={users || []} />
  </Container>
}

const Container = styled.div`
padding: 3.2rem;
`