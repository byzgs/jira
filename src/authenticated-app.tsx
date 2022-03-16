import React from "react"
import { useAuth } from "context/auth.context"
import { ProjectListScreen } from "screens/project-list"

export const AuthenticatedApp = () => {
  const {logout} = useAuth()
  return <div>
    <button onClick={() => {logout()}}>点我退出登录</button>
    <ProjectListScreen />
  </div>
}