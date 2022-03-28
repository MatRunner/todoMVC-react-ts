import classNames from 'classnames';
import { useState } from 'react';
import { Todo } from '../todos/model';
import TodoTextInput from './todoTextInput';

interface TodoItemProps {
  todo: Todo;
  editTodo: (todo: Todo, text: string) => void;
  deleteTodo: (todo: Todo) => void;
  completeTodo: (todo: Todo) => void;
  key?: any;
}
function TodoItem(props: TodoItemProps) {
  const { deleteTodo, editTodo, completeTodo, todo } = props
  const [editing, setEditing] = useState(false)
  const handleSave = (todo: Todo, text: string) => {
    if (text.length === 0) {
      deleteTodo(todo);
    } else {
      editTodo(todo, text);
    }
    setEditing(false)
  }
  return (
    <li className={classNames({
      completed: todo.completed,
      editing: editing
    })}>
      {editing ?
        <TodoTextInput text={todo.text}
          editing={editing}
          onSave={(text) => handleSave(todo, text)} />
        :
        <div className="view">
          <input className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => completeTodo(todo)} />
          <label onDoubleClick={() => setEditing(true)}>
            {todo.text}
          </label>
          <button className="destroy"
            onClick={() => deleteTodo(todo)} />
        </div>}
    </li>
  )
}

export default TodoItem;
