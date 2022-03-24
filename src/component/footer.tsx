import classNames from 'classnames';

import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE
} from '../todos/todoFilters';

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
};
// 只能写字面量不能写引用变量？
type Filter = 'show_all' | 'show_completed' | 'show_active'

interface FooterProps {
  completedCount: number;
  activeCount: number;
  filter: string;
  onClearCompleted: () => void;
  onShow: (filter: string) => void;
}

function Footer(props: FooterProps) {

  const renderTodoCount = () => {
    const { activeCount } = props;
    const itemWord = activeCount === 1 ? 'item' : 'items';
    return (
      <span className="todo-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }

  const renderFilterLink = (filter: Filter) => {
    // 此处对filter的限制暂时没有想到更好的写法
    const title = FILTER_TITLES[filter];
    const { filter: selectedFilter, onShow } = props;

    return (
      <a className={classNames({ selected: filter === selectedFilter })}
        style={{ cursor: 'pointer' }}
        onClick={() => onShow(filter)}>
        {title}
      </a>
    );
  }

  const renderClearButton = () => {
    const { completedCount, onClearCompleted } = props;
    if (completedCount > 0) {
      return (
        <button className="clear-completed"
          onClick={() => onClearCompleted()} >
          Clear completed
        </button>
      );
    }
  }

  return (
    <footer className="footer">
      {renderTodoCount()}
      <ul className="filters">
        {([SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED] as Filter[]).map((filter) =>
          <li key={filter}>
            {renderFilterLink(filter)}
          </li>
        )}
      </ul>
      {renderClearButton()}
    </footer>
  );
}

export default Footer;
