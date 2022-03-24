import styled from "@emotion/styled";

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