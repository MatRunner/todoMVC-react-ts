import { useState } from 'react';
import { Todo } from '../todos/model';
import TodoItem from './todoItem';
import Footer from './footer';
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE
} from '../todos/todoFilters';
// ts只做静态检查，导入的值判断不出类型，我目前想到的只能是这么声明一下
const show_all: string = SHOW_ALL
const show_completed: string = SHOW_COMPLETED
const show_active: string = SHOW_ACTIVE
const TODO_FILTERS = {
  [show_all]: () => true,
  [show_completed]: (todo: Todo) => !todo.completed,
  [show_active]: (todo: Todo) => todo.completed
};

interface MainSectionProps {
  todos: Todo[];
  clearCompleted: () => void;
  completeAll: () => void;
  editTodo: (todo: Todo, text: string) => void;
  completeTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
};

function MainSection(props: MainSectionProps) {
  const { todos, clearCompleted, completeAll, editTodo, completeTodo, deleteTodo } = props
  const [filter, setFilter] = useState<string>(SHOW_ALL)
  const filteredTodos = todos.filter(TODO_FILTERS[filter]);
  const completedCount = todos.reduce((count: number, todo): number =>
    todo.completed ? count + 1 : count,
    0
  );
  const handleClearCompleted = () => {
    const atLeastOneCompleted = todos.some(todo => todo.completed);
    if (atLeastOneCompleted) {
      clearCompleted();
    }
  }
  const renderToggleAll = (completedCount: number) => {
    if (todos.length > 0) {
      return (
        <input className="toggle-all"
          type="checkbox"
          checked={completedCount === todos.length}
          onChange={() => completeAll()} />
      );
    }
  }
  const renderFooter = (completedCount: number) => {
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Footer completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={handleClearCompleted}
          onShow={filter => setFilter(filter)} />
      );
    }
  }
  return (
    <section className="main">
      {renderToggleAll(completedCount)}
      <ul className="todo-list">
        {filteredTodos.map(todo =>
          <TodoItem
            key={todo.id}
            todo={todo}
            editTodo={editTodo}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo} />
        )}
      </ul>
      {renderFooter(completedCount)}
    </section>
  )
}


export default MainSection;
