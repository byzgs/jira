import { useEffect, useRef, useState } from "react"

export const isFalsy = (value: unknown) => value === 0 ? false : !value
export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

export const cleanObject = (object: { [key :string] : unknown}) => {
  //在一个函数里，改变传入的对象本身是不好的
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    const value = result[key]
    if (isVoid(value)) {
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // 依赖项里如果加了callback会无限循环
  }, [])
}

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    //每次value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    //每次在上一个useEffect处理完后再运行
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}

export const useArray = <T>(initialArray: T[]) => {
  const [value,setValue] = useState(initialArray)
  return {
    value,
    setValue,
    add: (item: T)=> setValue([...value,item]),
    clear: ()=> setValue([]),
    removeIndex: (index: number)=> {
      const copy = [...value]
      copy.splice(index,1)
      setValue(copy)
    }
  }
}

export const useDocumentTitle = (title:string,keepOnUnmount:boolean = true) => {
  const oldTitle = useRef(document.title).current
  //页面加载时：oldTitle
  //页面加载后：新title

  useEffect(() => {
    document.title = title
  },[title])

  useEffect(() => {
    return () => {
      if(!keepOnUnmount) {
        document.title = oldTitle
      }
    }
  },[keepOnUnmount,oldTitle])
}

//重置路由
export const resetRoute = () => window.location.href = window.location.origin

//返回组件的挂在状态： 如果还没挂载/已经卸载，返回false 否则返回true
export const useMountedRef = () => {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  })

  return mountedRef
}