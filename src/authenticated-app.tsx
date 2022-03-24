import React from "react"
import { useAuth } from "context/auth.context"
import { ProjectListScreen } from "screens/project-list"
import styled from "@emotion/styled"
import { CustomizedRow } from "components/lib"
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Button, Dropdown, Menu } from "antd"

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth()
  return (
    <Container>
      <Header between={true} >
        <HeaderLeft gap={true}>
          <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={'logout'}>
                  <Button type="link" onClick={logout}>登出</Button>
                </Menu.Item>
              </Menu>}>
            <Button type="link" onClick={e => e.preventDefault()}>你好！{user?.name}</Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  )
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