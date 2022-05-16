import React, { useState } from "react"
import styled from "@emotion/styled"
import { Link, Navigate, Route, Routes } from "react-router-dom"
import { useAuth } from "context/auth.context"
import { ProjectListScreen } from "screens/project-list"
import { ProjectScreen } from "screens/project"
import { ButtonNoPadding, CustomizedRow } from "components/lib"
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Button, Dropdown, Menu } from "antd"
import { resetRoute } from "utils"
import { ProjectModal } from "screens/project-list/project-modal"
import { ProjectPopover } from "components/projext-popover"

export const AuthenticatedApp = () => {

  return (
    <Container>
      <PageHeader />
      <Main>
        {/* <ProjectListScreen /> */}
        <Routes>
          {/* <Route path="/" element={<ProjectListScreen />}></Route> */}
          <Route path="/projects" element={<ProjectListScreen/>}></Route>
          <Route path="/projects/:projectId/*" element={<ProjectScreen />}></Route>
          <Route path="*" element={<Navigate to="/projects" replace={true} />} />
        </Routes>
      </Main>
      <ProjectModal />
    </Container>
  )
}

const PageHeader = () => {
  return (
    <Header between={true} >
      <HeaderLeft gap={true}>
        <ButtonNoPadding type="link" onClick={resetRoute}>
          <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
        </ButtonNoPadding>
        {/* <Link to={'/projects'}>项目</Link> */}
        <ProjectPopover />
        <Link to={'/users'}>用户</Link>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  )
}

const User = () => {
  const { logout, user } = useAuth()

  return <Dropdown
    overlay={
      <Menu>
        <Menu.Item key={'logout'}>
          <Button type="link" onClick={logout}>登出</Button>
        </Menu.Item>
      </Menu>}>
    <Button type="link" onClick={e => e.preventDefault()}>你好！{user?.name}</Button>
  </Dropdown>
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
  grid-template-areas: 
  "header"
  "main"

`



// grid-area 给grid元素起名字
const Header = styled(CustomizedRow)`
  grid-area: header;
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const HeaderLeft = styled(CustomizedRow)`
  display: flex;
  align-items: center;
`
const HeaderRight = styled.div`

`

const Main = styled.div`
  grid-area: main;

`