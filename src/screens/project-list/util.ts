import { useMemo } from "react"
import { useProject } from "utils/project"
import { useUrlQueryParam } from "utils/url"
import { useSearchParams } from "react-router-dom";

export const useProjectsSearchParams = () => {
  const [param,setParam] = useUrlQueryParam(['name','personId'])
  //从url得到的param都是string类型
  return [
    useMemo(() => ({...param,personId: Number(param.personId) || undefined}), [param]),
    setParam
  ] as const
}

//url来管理项目模态框状态
export const useProjectModal = () => {
  const [{projectCreate}, setProjectCreate] = useUrlQueryParam([
    'projectCreate'
  ])
  const [{editingProjectId},setEditingProjectId] = useUrlQueryParam([
    'editingProjectId'
  ])
  const {data: editingProject, isLoading} = useProject(Number(editingProjectId))

  const [_, setUrlParams] = useSearchParams();

  const open = () => setProjectCreate({projectCreate: true})
  // const close = () => {
  //   console.log('调了close');
    
  //   setProjectCreate({projectCreate: ""})
  //   setEditingProjectId({editingProjectId: ""})
  // }
  const close = () => {setUrlParams({ projectCreate: "", editingProjectId: "" });}
  const startEdit = (id: number) => setEditingProjectId({editingProjectId: id})

  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProject),
    open,
    close,
    startEdit,
    editingProject,
    isLoading
  }
}