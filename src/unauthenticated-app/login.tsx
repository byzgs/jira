import { useAuth } from "context/auth.context";
import React, { FormEvent } from "react";
import { Button, Form, Input, Typography } from "antd";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";
import { Link } from "react-router-dom";

export const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {

  const { login, user } = useAuth()

  const { run, isLoading, error } = useAsync(undefined, { throwOnError: true })

  const apiUrl = process.env.REACT_APP_API_URL

  // const login = (param: { username: string, password: string }) => {

  // }
  const handleSubmit = async (values: { username: string, password: string }) => {
    // login(values)
    try {
      await run(login(values))
    } catch (e) {
      //@ts-ignore
      onError(e)
    }
  }

  return (
    <Form
      onFinish={handleSubmit}>
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
        <Input type="text" id={'username'} placeholder={'用户名'} />
      </Form.Item>
      <Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
        <Input type="password" id={'password'} placeholder={'密码'} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={'primary'}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  )
}