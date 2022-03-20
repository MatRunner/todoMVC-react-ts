import

  class App extends React.Component<AppProps> {
    render() {
      const { todos, dispatch } = this.props;

      return (
        <div className="todoapp">
          <Header addTodo={(text: string) => dispatch(addTodo(text))} />
          <MainSection
            todos={todos}
            editTodo={(t, s) => dispatch(editTodo(t, s))}
            deleteTodo={(t: model.Todo) => dispatch(deleteTodo(t))}
            completeTodo={(t: model.Todo) => dispatch(completeTodo(t))}
            clearCompleted={() => dispatch(clearCompleted())}
            completeAll={() => dispatch(completeAll())} />
        </div>
      );
    }
  }

const mapStateToProps = state => ({
  todos: state.todos
});

export default connect(mapStateToProps)(App);
