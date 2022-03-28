import { useState, ChangeEvent, KeyboardEvent, FocusEvent } from 'react'
import classNames from 'classnames'

interface TodoTextInputProps {
  onSave: (text: string) => void;
  text?: string;
  placeholder?: string,
  editing?: boolean;
  newTodo?: boolean;
}
function TodoTextInput(props: TodoTextInputProps) {
  const { text: initText, editing, newTodo, placeholder, onSave } = props
  const [text, setText] = useState(initText || '')
  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (!newTodo) {
      onSave(e.target.value)
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // react有内置的事件对象类型，这个得查
    setText(e.target.value)
  }
  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    // const text = e.target.value.trim() 会报错，说EventTarget上没有value属性
    // const text = e.currentTarget.value.trim() 这个也、可以通过检查
    const text = (e.target as HTMLInputElement).value.trim() // 这个也可以通过检查
    if (e.code === 'Enter') {
      onSave(text);
      if (newTodo) {
        setText('');
      }
    }
  }
  return (
    <input className={
      classNames({
        edit: editing,
        'new-todo': newTodo
      })}
      type="text"
      placeholder={placeholder}
      autoFocus={true}
      value={text}
      onBlur={onBlur}
      onChange={handleChange}
      onKeyDown={handleSubmit} />
  );
}


export default TodoTextInput;
