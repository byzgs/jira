import React, { useState } from "react";
import { Input } from "antd";
import { useAddKanban } from "utils/kanban";
import { useKanbanQueryKey, useProjectIdInUrl } from "./util";
import { ColumnContainer } from "./kanban-column";

export const CreateKanban = () => {
  const [name, setName] = useState('')
  const projectId = useProjectIdInUrl()
  const { mutateAsync: addKanban } = useAddKanban(useKanbanQueryKey())

  const submit = async () => {
    await addKanban({ name, projectId })
    setName('')
  }

  return <ColumnContainer>
    <Input
      size={'large'}
      placeholder={'新建看板名称'}
      onPressEnter={submit}
      value={name}
      onChange={evt => setName(evt.target.value)} />
  </ColumnContainer>
}