import React, { ReactNode } from "react";

//错误边界的实现，一定要用class组件来实现；
//定义了两个中任意一个: 1. static getDerivedStateFromError() 2.componentDidCatch() 

//React.Component 两个范型： P 、S
//P --> props 包含两个: 1.children 2. fallbackRender --> 备用渲染方案
type FallbackRender = (props: { error: Error | null }) => React.ReactElement
//S --> state 这里是error

// export default class ErrorBoundary extends React.Component<{children: ReactNode, fallbackRender:FallbackRender}, { error: Error | null }> {
// children: ReactNode 这里有统一写法：
export default class ErrorBoundary extends React.Component<React.PropsWithChildren<{ fallbackRender: FallbackRender }>, { error: Error | null }> {
  state = {error : null}

  //当边界的子组件，发生了渲染错误，会接收到error并调用此方法
  static getDerivedStateFromError(error : Error) {
    return {error}
  }

  render() {
    const {error} = this.state
    const {fallbackRender,children} = this.props
    if(error) {
      return fallbackRender({error})
    }
    return children
  }
}
