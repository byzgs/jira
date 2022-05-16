import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "utils";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null
}

const defaultConfig = {
  throwOnError: false
}

//帮助判断mountedRef.current
const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef()

  return useCallback((...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0), [dispatch, mountedRef])
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, initialConfig }
  // const [state, setState] = useState<State<D>>({
  //   ...defaultInitialState,
  //   ...initialState
  // })

  //用 usereducer改造

  const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }), {
    ...defaultInitialState,
    ...initialState
  })
  
  //判断组件挂载状态：避免出现promise没有返回时，组件就被卸载，从而报错
  // const mountedRef = useMountedRef()
  const safeDispatch = useSafeDispatch(dispatch)

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: 'success',
        error: null
      }), [safeDispatch]
  )

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        data: null,
        stat: 'error'
      }), [safeDispatch]
  )
  //想用useState保存函数时，不能直接写一个函数，会被当做惰性初始state
  const [retry, setRetry] = useState(() => () => { })


  //run 用来触发异步请求
  const run = useCallback((promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
    if (!promise || !promise.then) {
      throw new Error('请传入 Promise 类型数据')
    }

    //因为惰性初始state 所以要加一层
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig)
      }
    })
    //用惰性setState 这样不依赖state 就避免了重复渲染问题
    // dispatch(prevState => ({ ...prevState, stat: 'loading' }))
    safeDispatch({ stat: 'loading' })
    return promise
      .then(data => {
        // if (mountedRef.current)
        setData(data)
        return data
      })
      .catch(error => {
        //catch会消化异常，如果不主动抛出，外面接收不到异常
        setError(error)
        if (config.throwOnError) return Promise.reject(error)
        return error
      })
  }, [config.throwOnError, setData, setError, safeDispatch])

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    //retry 被调用时，重新跑一遍run，让state刷新一遍
    retry,
    ...state
  }
} 