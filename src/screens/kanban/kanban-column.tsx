import React from "react"
import { Kanban } from "types/kanban"
import { useTasks } from "utils/task"
import { useTaskTypes } from "utils/task-types"
import { useKanbanQueryKey, useTasksModal, useTasksSearchParams } from "./util"
import taskIcon from 'assets/task.svg'
import bugIcon from 'assets/bug.svg'
import styled from "@emotion/styled"
import { Button, Card, Dropdown, Menu, Modal } from "antd"
import { CreateTask } from "./create-task"
import { Task } from "types/task"
import { Mark } from "components/mark"
import { useDeleteKanban } from "utils/kanban"
import { CustomizedRow } from "components/lib"

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes()
  const name = taskTypes?.find(taskType => taskType.id === id)?.name
  if (!name) {
    return null
  }
  return <img alt="task-icon" src={name === 'task' ? taskIcon : bugIcon} />
}

const TaskCard = ({ task }: { task: Task }) => {

  const { startEdit } = useTasksModal()
  const { name: keyword } = useTasksSearchParams()
  return <Card onClick={() => startEdit(task.id)} style={{ marginBottom: '0.5rem', cursor: 'pointer' }} key={task.id}>
    <p>
      <Mark keyword={keyword} name={task.name} />
    </p>
    <TaskTypeIcon id={task.typeId} />
  </Card>
}

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams())
  const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)

  return <ColumnContainer>
    <CustomizedRow between={true}>
      <h3>{kanban.name}</h3>
      <More kanban={kanban} />
    </CustomizedRow>
    <TasksContainer>
      {
        tasks?.map((task, index) => {
          return (
            <TaskCard task={task} key={index} />
          )
        })
      }
      <CreateTask kanbanId={kanban.id} />
    </TasksContainer>
  </ColumnContainer>
}

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync: deleteKanban } = useDeleteKanban(useKanbanQueryKey())

  const startDelete = () => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除看板吗？',
      onOk() {
        return deleteKanban({ id: kanban.id })
      }
    })
  }

  const overlay = <Menu>
    <Menu.Item key={kanban.name}>
      <Button onClick={startDelete} type={'link'}>
        删除
      </Button>
    </Menu.Item>
  </Menu>
  return <Dropdown overlay={overlay}>
    <Button type={'link'}>...</Button>
  </Dropdown>
}

export const ColumnContainer = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`
const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar{
    display: none;
  }
`