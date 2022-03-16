import React from "react";

import { useArray, useMount } from "utils"

export const TsReactTest = () => {
  const persons: { name: string; age: number; }[] = [
    { name: "jack", age: 25 },
    { name: "zhanggenshuo", age: 23 },
  ];

  const { value, clear, removeIndex, add } = useArray(persons)
  useMount(() => {
    // console.log(value.notExist);

    // add({ name: "david" });

    // removeIndex("123");

  })
  return (
    <div>
      <button onClick={() => add({ name: "john", age: 24 })}>add john</button>
      <button onClick={() => removeIndex(0)}>remove 0</button>
      <button onClick={() => clear()}>clear</button>

      {
        value.map((person: { name: string; age: number }, index: number) => (
          <div style={{ marginBottom: '30px', marginTop: '50px' }}>
            <span style={{ color: 'red' }}>{index}</span>
            <span>{person.name}</span>
            <span>{person.age}</span>
          </div>
        ))
      }
    </div>
  )
}