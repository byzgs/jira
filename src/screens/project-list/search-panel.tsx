// 此注释告诉 Babel 将 jsx 代码转换为 jsx 函数的调用，而不是 React.createElement
/** @jsxImportSource @emotion/react */
import { Form, Input, Select } from "antd";
import { UserSelect } from "components/user-select";
import React from "react"
import { Project } from "./list";
// import { useEffect, useState } from "react"

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string
}
interface SearchPanelProps {
  users: User[],
  param: Partial<Pick<Project, 'name' | 'personId'>>,
  setParam: (param: SearchPanelProps['param']) => void;
}
export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {

  return (
    <Form css={{ marginBottom: '2rem' }} layout="inline">
      <Form.Item>
        <Input
          placeholder="项目名"
          type="text"
          value={param.name}
          onChange={evt => setParam({
            ...param,
            name: evt.target.value
          })} />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName="负责人"
          value={param.personId}
          onChange={value => setParam({
            ...param,
            personId: value
          })}></UserSelect>
      </Form.Item>
    </Form>
  )
}