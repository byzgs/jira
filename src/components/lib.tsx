import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";

//自定义的Row组件
export const CustomizedRow = styled.div<{
  gap?: number | boolean,
  between?: boolean,
  marginBottom?: number | boolean
}>`
display: flex;
align-items: center;
justify-content: ${props => props.between ? 'space-between' : undefined};
margin-bottom: ${props => typeof props.marginBottom === 'number' ? props.marginBottom + 'rem' : (props.marginBottom ? '2rem' : undefined)};
> * {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : (props.gap ? '2rem' : undefined)};
}
`

// 自定义的整个页面组件
const FullPage = styled.div`
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`
export const FullPageLoading = () => <FullPage>
  <Spin size="large" />
</FullPage>

export const FullPageError = ({ error }: { error: Error | null }) => <FullPage>
  <DevTools />
  <ErrorBox error={error} />
</FullPage>

// 自定义无内边距Button
export const ButtonNoPadding = styled(Button)`
  padding: 0;
`

//类型守卫
//: value is Error表示 如果value?.message为true，则判断value是Error类型
const isError = (value: any): value is Error => value?.message

export const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    return <Typography.Text type="danger">{error.message}</Typography.Text>
  }
  return null
}

// 自定义页面3.2rem内边距的Container
export const ScreenContainer = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`