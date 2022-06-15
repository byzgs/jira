import React from "react";
import { Link, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { KanbanScreen } from "screens/kanban";
import { EpicScreen } from "screens/epic";

export const ProjectScreen = () => {

  return (<>
    <h2>我是ProjectScreen</h2>
    <Link to={'kanban'}>看板</Link>
    <Link to={'epic'}>任务组</Link>

    <Routes>
      <Route path="/kanban" element={<KanbanScreen />}></Route>
      <Route path="/epic" element={<EpicScreen />}></Route>
      <Route path="*" element={<Navigate to={window.location.pathname + "/kanban"} replace={true} />} />
    </Routes>
    {/* <Outlet></Outlet> */}
  </>)
}