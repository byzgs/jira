import { useMemo } from "react"
import { useUrlQueryParam } from "utils/url"

export const useProjectsSearchParams = () => {
  const [param,setParam] = useUrlQueryParam(['name','personId'])
  //从url得到的param都是string类型
  return [
    useMemo(() => ({...param,personId: Number(param.personId) || undefined}), [param]),
    setParam
  ] as const
}