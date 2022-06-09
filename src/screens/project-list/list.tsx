import { Dropdown, Menu, Table, TableProps } from "antd";
import Column from "antd/lib/table/Column";
import { ButtonNoPadding } from "components/lib";
import { Pin } from "components/pin";
import dayjs from "dayjs";
import React from "react"
import { Link } from "react-router-dom";
import { useEditProject } from "utils/project";
import { User } from "./search-panel";
import { useProjectModal } from "./util";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string,
  created: number
}
// ListProps： 包含两部分类型：1.继承TableProps所有类型的集合 2.users
interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}
export const List = ({ users, ...props }: ListProps) => {

  const { mutate } = useEditProject()
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })
  const {startEdit} = useProjectModal()
  const editProject = (id:number) => () => startEdit(id)
  return (
    <Table
      pagination={false}
      rowKey={(project) => project.id}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />
          }
        },
        {
          title: '名称',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>
          }
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
              {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
            </span>
          }
        },
        {
          render(value, project) {
            return <Dropdown overlay={<Menu>
              <Menu.Item key={'edit'} onClick={editProject(project.id)}>
                编辑
              </Menu.Item>
              <Menu.Item key={'delete'}>
                删除
              </Menu.Item>
            </Menu>}>
              <ButtonNoPadding type="link">...</ButtonNoPadding>
            </Dropdown>
          }
        }
      ]}
      {...props} //index.tsx 透传过来了dataSource、loading
    >

    </Table>

  )
}