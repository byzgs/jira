import React from "react";
import { Link, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { KanbanScreen } from "screens/kanban";
import { EpicScreen } from "screens/epic";
import { ScreenContainer } from "components/lib";
import { Menu } from "antd";
import styled from "@emotion/styled";

const useRouteType = () => {
  const units = useLocation().pathname.split('/')
  return units[units.length - 1]
}
export const ProjectScreen = () => {
  const routeType = useRouteType()
  
  return (<Container>
    <Aside>
      <Menu mode={'inline'} selectedKeys={[routeType]}>
        <Menu.Item key={'kanban'}>
          <Link to={'kanban'}>看板</Link>
        </Menu.Item>
        <Menu.Item key={'epic'}>
          <Link to={'epic'}>任务组</Link>
        </Menu.Item>
      </Menu>
    </Aside>

    <Main>
      <Routes>
        <Route path="/kanban" element={<KanbanScreen />}></Route>
        <Route path="/epic" element={<EpicScreen />}></Route>
        <Route path="*" element={<Navigate to={window.location.pathname + "/kanban"} replace={true} />} />
      </Routes>
    </Main>
    {/* <Outlet></Outlet> */}
  </Container>)
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  overflow: hidden;
  width: 100%
`

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0,0,0,0.1);
  display: flex;
  overflow: hidden;
`
