import { IState, Todo } from "./model"

const initialState: IState = [<Todo>{
  text: 'Use Redux with TypeScript',
  completed: false,
  id: 0
}]
export const reducer = (state, action) => {
  switch (action.type) {
    case "toggle_button":
      return {
        ...state,
        active: !state.active
      }

    default:
      return state
  }
}

export const initialState = {
  active: false
}