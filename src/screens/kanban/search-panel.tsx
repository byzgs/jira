import React from "react";
import Input from "antd/lib/input/Input";
import { ButtonNoPadding, CustomizedRow } from "components/lib";
import { TaskTypeSelect } from "components/task-type-select";
import { UserSelect } from "components/user-select";
import { useSetUrlSearchParam } from "utils/url";
import { useTasksSearchParams } from "./util";

export const SearchPanel = () => {
  const searchParams = useTasksSearchParams()
  const setSearchParams = useSetUrlSearchParam()
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined
    })
  }

  return <CustomizedRow marginBottom={4} gap={true}>
    <Input style={{ width: '20rem' }} placeholder={'任务名'} value={searchParams.name}
      onChange={evt => setSearchParams({ name: evt.target.value })} />
    <UserSelect defaultOptionName="经办人" value={searchParams.processorId}
      onChange={value => setSearchParams({ processorId: value })} />
    <TaskTypeSelect defaultOptionName="类型" value={searchParams.typeId}
      onChange={value => setSearchParams({ typeId: value })} />
    <ButtonNoPadding onClick={reset}>清除筛选器</ButtonNoPadding>
  </CustomizedRow>
}