import { useAuth } from "context/auth.context";
import React, { FormEvent } from "react";
import { Button, Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";

export const LoginScreen = () => {

  const { login, user } = useAuth()

  const apiUrl = process.env.REACT_APP_API_URL

  // const login = (param: { username: string, password: string }) => {

  // }
  const handleSubmit = (values: { username: string, password: string }) => {
    login(values)
  }

  return (
    <Form
      onFinish={handleSubmit}>
      <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
        <Input type="text" id={'username'} placeholder={'用户名'} />
      </Form.Item>
      <Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
        <Input type="password" id={'password'} placeholder={'密码'} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={"submit"} type={'primary'}>登录</LongButton>
      </Form.Item>
    </Form>
  )
}