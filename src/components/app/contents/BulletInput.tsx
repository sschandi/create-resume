import React, { useState, useRef, FocusEvent, ChangeEvent, KeyboardEvent, useEffect } from 'react'

const BULLET = '• '

const BulletInput = ({ value, placeholder, onChange }) => {
  const [inputValue, setInputValue] = useState('')
  const [cursorPosition, setCursorPosition] = useState(null)
  const input = useRef(null)

  // Initial setup from props
  useEffect(() => {
    const string = `${BULLET}${value.join(`\n${BULLET}`)}`
    setInputValue(string)
  }, [])

  // Resize input on init and on add/delete
  useEffect(() => {
    if (input.current) {
      input.current.style.height = 'inherit'
      input.current.style.height = `${input.current.scrollHeight}px`
    }
  }, [inputValue])
  
  // Move cursor position to correct location after inputValue state is updated
  useEffect(() => {
    if (input.current) {
      input.current.selectionStart = cursorPosition
      input.current.selectionEnd = cursorPosition
    }
  },[cursorPosition])

  // Fire change event on inputValue updates
  useEffect(() => {
    const array = inputValue.slice(2).split(`\n${BULLET}`)
    onChange(array)
  }, [inputValue])

  const focusEvent = (e: FocusEvent<HTMLTextAreaElement>) => {
    if (inputValue === '') {
      setInputValue(BULLET)
    }
  }
  const blurEvent = (e: any) => {
    if (inputValue === BULLET) {
      setInputValue('')
    }
  }
  const changeEvent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    if (e.target.value.length <= 1) {
      setInputValue(BULLET)
      return
    }
    setInputValue(e.target.value)
  }
  const keyEvent = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      // This exists, maybe incorrect Type (not sure what else to use though)
      // @ts-ignore
      const start = e.target.selectionStart
      setInputValue(`${inputValue.slice(0, start)}${BULLET}${inputValue.slice(start)}`)
      setCursorPosition(start + 2)
    }
    if (e.key === 'Backspace') {
      const erasePoints = inputValue.slice(-1)
      if (erasePoints === '•') {
        setInputValue(inputValue.slice(0, inputValue.length - 2))
      }
    }
  }

  return (
    <div className="input">
      <label>{placeholder}</label>
      <textarea
        ref={input}
        value={inputValue}
        placeholder={placeholder}
        onFocus={focusEvent}
        onBlur={blurEvent}
        onChange={changeEvent}
        onKeyUp={keyEvent}
      />
    </div>
  )
}

export default BulletInput
