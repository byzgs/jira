import React from "react"
import { useAuth } from "context/auth.context"
import { ProjectListScreen } from "screens/project-list"
import styled from "@emotion/styled"

export const AuthenticatedApp = () => {
  const { logout } = useAuth()
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h3>我是Logo</h3>
          <h3>项目</h3>
          <h3></h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={() => { logout() }}>点我退出登录</button>
        </HeaderRight>
      </Header>

      <Nav>我是nav</Nav>
      <Main>
        <ProjectListScreen />
      </Main>
      <Aside>我是aside</Aside>
      <Footer>我是footer</Footer>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  height: 100vh;
  grid-template-areas: 
  "header header header"
  "nav main aside"
  "footer footer footer";

`

// grid-area 给grid元素起名字
const Header = styled.header`
grid-area: header;
display: flex;
align-items: center;
justify-content: space-between;
`

const HeaderLeft = styled.div`
display: flex;
align-items: center;
`
const HeaderRight = styled.div`

`

const Main = styled.div`
grid-area: main;

`
const Nav = styled.footer`
grid-area: nav;

`
const Aside = styled.footer`
grid-area: aside;
`

const Footer = styled.footer`
grid-area: footer;
`
