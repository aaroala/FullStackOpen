import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    console.log("hey")
    setValue('')}

  const field = {
    inputItems: {
    type: type,
    value: value,
    onChange: onChange
    },
    reset: reset
  }

  return field
}

// moduulissa voi olla monta nimettyä eksportia
export const useReset = (props) => {

  const onClick = (event) => {
    props.reset1()
    props.reset2()
    props.reset3()


    // content.setValue('')
    // author.setValue('')
    // info.setValue('')
  }

  const reset = {
    test1: {
    type: "button",
    onClick: onClick
    }
  }

  return reset
  // ...
}