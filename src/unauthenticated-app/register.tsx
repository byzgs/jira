import { useAuth } from "context/auth.context";
import React, { FormEvent } from "react";

export const RegisterScreen = () => {

  const {register,user} = useAuth()

  const apiUrl = process.env.REACT_APP_API_URL

  // const login = (param: { username: string, password: string }) => {
    
  // }
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value
    register({ username, password })
  }

  return <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="username">用户名</label>
      <input type="text" id={'username'} />
    </div>
    <div>
      <label htmlFor="username">密码</label>
      <input type="password" id={'password'} />
    </div>
    <button type={'submit'} style={{backgroundColor:'blue'}}>注册</button>
  </form>
}