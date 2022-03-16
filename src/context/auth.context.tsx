import React, { ReactNode, useState } from "react";
import * as auth from 'auth-provider'
import { User } from "screens/project-list/search-panel"

interface AuthForm {
  username: string;
  password: string
}

const AuthContext = React.createContext<{
  user: User | null,
  login: (form: AuthForm) => Promise<void>,
  register: (form: AuthForm) => Promise<void>,
  logout: () => Promise<void>
} | undefined>(undefined)

// 用于jira-dev-tool,实际项目中不用
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({children}:{children:ReactNode}) => {
  // 进行逻辑处理
  const [user, setUser] = useState<User | null>(null)

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

  return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if(!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}