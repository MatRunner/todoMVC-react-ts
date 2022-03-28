import TodoTextInput from './todoTextInput';

interface HeaderProps {
  addTodo: (text: string) => any;
};

function Header(props: HeaderProps) {
  const { addTodo } = props
  const handleSave = (text: string) => {
    if (text.length !== 0) {
      addTodo(text);
    }
  }
  return (
    <header className="header">
      <h1>todos</h1>
      <TodoTextInput
        newTodo
        onSave={handleSave}
        placeholder="What needs to be done?" />
    </header>
  );
}
export default Header;
