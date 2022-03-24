import { Table, TableProps } from "antd";
import Column from "antd/lib/table/Column";
import dayjs from "dayjs";
import React from "react"
import { User } from "./search-panel";

export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string,
  created: number
}
// ListProps： 包含两部分类型：1.继承TableProps所有类型的集合 2.users
interface ListProps extends TableProps<Project>{
  users: User[]
}
export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      pagination={false}
      rowKey={(project) => project.id}
      columns={[
        {
          title: '名称',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
          title: '部门',
          dataIndex: 'orginization',
          render(value, project) {
            return <span>
              {users.find(user => user.id === project.personId)?.organization || '无'}
            </span>
          }
        },
        {
          title: '负责人',
          render(value, project) {
            return <span>
              {users.find(user => user.id === project.personId)?.name || '无'}
            </span>
          }
        },
        {
          title: '创建时间',
          render(value, project) {
            return <span>
              {project.created? dayjs(project.created).format('YYYY-MM-DD') : '无'}
            </span>
          }
        },
      ]}
      {...props} //index.tsx 透传过来了dataSource、loading
      >

    </Table>

  )
}