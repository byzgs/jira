import React from "react"
import { LoginScreen } from "./login"
import { RegisterScreen } from "./register"

export const UnauthenticatedApp = () => {
  const [isRegister,setIsRegister] = React.useState(false)

  return <div>
    {
      isRegister ? <RegisterScreen /> : <LoginScreen />
    }
    <button onClick={() => setIsRegister(!isRegister)}>切换到{isRegister? '登陆界面' : '注册界面'}</button>
  </div>
}