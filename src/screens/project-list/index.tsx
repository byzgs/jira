import React from "react"
import { useEffect, useState } from "react"
import * as qs from "qs";
import { cleanObject, useMount, useDebounce, useDocumentTitle } from "utils"
import { List, Project } from "./list"
import { SearchPanel } from "./search-panel"
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Button, Row, Typography } from "antd";
import { useAsync } from "utils/use-async";
import { useProjects } from "utils/project";
import { useUsers } from "utils/users";
import { useUrlQueryParam } from "utils/url";
import { useProjectsSearchParams } from "./util";
import { CustomizedRow } from "components/lib";

export const ProjectListScreen = (props: { setProjectModalOpen: (isOpen: boolean) => void }) => {

  const apiUrl = process.env.REACT_APP_API_URL

  useDocumentTitle("项目列表", false)

  // const [param, setParam] = useState({
  //   name: '',
  //   personId: ''
  // })

  // const [param,setParam] = useUrlQueryParam(['name','personId'])
  // //从url得到的param都是string类型
  // const projectParam = {...param,personId: Number(param.personId) || undefined}
  // --> 抽象出去
  const [param, setParam] = useProjectsSearchParams()

  // const [list, setList] = useState([]) --> 用了useAsync来处理异步操作

  // 自定义hook，处理异步操作
  const { isLoading, error, data: list, retry } = useProjects(useDebounce(param, 2000))
  const { data: users } = useUsers()
  const client = useHttp()


  // console.log(useUrlQueryParam(['name']));

  return <Container>
    <CustomizedRow between={true}>
      <h1>项目列表</h1>
      <Button onClick={() => { props.setProjectModalOpen(true) }}>创建项目</Button>
    </CustomizedRow>

    <SearchPanel users={users || []} param={param} setParam={setParam} />
    {
      error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null
    }
    <List setProjectModalOpen={props.setProjectModalOpen} refresh={retry} dataSource={list || []} loading={isLoading} users={users || []} />
  </Container>
};

ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
padding: 3.2rem;
`