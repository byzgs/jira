import React, { useMemo } from "react"
import { useSearchParams } from "react-router-dom"

// 返回页面url中，指定键的参数值
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams()

  return [

    // keys.reduce((prev: { [p in K]: string }, key: K) => {
    //   return { ...prev, [key]: searchParams.get(key) || '' }    // 为什么要加 || '' --> .get()有可能返回Null
    // }, {} as { [key in K]: string }),     //这么做原因：intVale是什么类型，reduce就会返回什么类型

    // --> 这样会无限循环，因为useEffect里传入的依赖的这个对象，复杂数据类型，总是与上一次传入的不一样，会导致重新渲染
    //     而当 对象 是state时，不会这样无限循环 --> 就像私有门户设计器中的解决方法：state:pageData无法放在useEffect中依赖，新搞一个state:searchParams就行
    // 解决方法 ： useMemo()
    useMemo(
      () => keys.reduce((prev: { [p in K]: string }, key: K) => {
        return { ...prev, [key]: searchParams.get(key) || '' }    // 为什么要加 || '' --> .get()有可能返回Null
      }, {} as { [key in K]: string }),     //这么做原因：intVale是什么类型，reduce就会返回什么类型
      [searchParams,keys]
    ),
    setSearchParams
  ] as const
  // 不加as const 会有类型问题 --> 返回最原始类型 
  // 例子： const a = ['jack',12,{gender:'male'}]
}