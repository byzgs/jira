import React, { ReactNode, useState } from "react";
import * as auth from 'auth-provider'
import { User } from "screens/project-list/search-panel"
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageError, FullPageLoading } from "components/lib";

interface AuthForm {
  username: string;
  password: string
}

//初始化用户信息(用于保存登陆状态)
const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    // 用http而不用 useHttp的原因：想自己指定token
    // me API 返回值包括user信息
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

const AuthContext = React.createContext<{
  user: User | null,
  login: (form: AuthForm) => Promise<void>,
  register: (form: AuthForm) => Promise<void>,
  logout: () => Promise<void>
} | undefined>(undefined)

// 用于jira-dev-tool,实际项目中不用
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 进行逻辑处理
  // const [user, setUser] = useState<User | null>(null) --> 用useAsync改造
  const { data: user, error, isLoading, isError, isIdle, run, setData: setUser } = useAsync<User | null>()

  const login = (form: AuthForm) => {
    return auth.login(form).then(user => setUser(user))
    // 这种情况可以消去参数 --> point free
    // auth.login(form).then(setUser)
  }

  const register = (form: AuthForm) => {
    return auth.register(form).then(user => setUser(user))
  }

  const logout = () => {
    return auth.logout().then(() => setUser(null))
  }

  useMount(() => {
    // bootstrapUser().then(setUser) --> 用useAsync
    run(bootstrapUser())
  })
  
  if (isIdle || isLoading) {
    return  <FullPageLoading/>
  }

  if(isError) {
    return <FullPageError error={error}/>
  }

  return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}