import { Select } from "antd";
import React from "react";
import { Raw } from "types";

// 透传props
type SelectProps = React.ComponentProps<typeof Select>

//Omit的原因： 继承时，这几条本就有的不继承，不然冲突
interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
  value?: Raw | null | undefined,
  onChange?: (value?: number) => void,
  defaultOptionName?: string,
  options?: { name: string, id: number }[]
}

/*
  value 可传入多种类型的值
  onChange 只会回调 number | undefined 类型
  当isNaN(Number(value)) === true 时，代表选择默认类型
  当选择默认类型时，onChange 回调 undefined

*/

export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restprops } = props

  return (
    <>
      <Select
        value={options?.length ? toNumber(value) : 0}
        onChange={value => onChange?.(toNumber(value) || undefined)}
        {...restprops}
      >
        {
          defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
        }
        {
          options?.map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)
        }
      </Select>
    </>
  )
}

const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)