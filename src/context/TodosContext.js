import { createContext, useContext, useReducer } from "react";

var TodosStateContext = createContext();
var TodosDispatchContext = createContext();

function todosReducer(state, action) {
  switch (action.type) {
    case "SET_TODO_LISTS":
      localStorage.setItem('todos', JSON.stringify([...state.todos, action.payload]))
      return { ...state, todos: [...state.todos, action.payload] };

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const todoList = JSON.parse(localStorage.getItem('todos'))
const initialState = {
  todos: todoList ? todoList : []
}

function TodosProvider({ children }) {
  var [state, dispatch] = useReducer(todosReducer, initialState);
  return (
    <TodosStateContext.Provider value={state}>
      <TodosDispatchContext.Provider value={dispatch}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosStateContext.Provider>
  );
}

function useTodosState() {
  var context = useContext(TodosStateContext);
  if (context === undefined) {
    throw new Error("useTodosState must be used within a TodosProvider");
  }
  return context;
}

function useTodosDispatch() {
  var context = useContext(TodosDispatchContext);
  if (context === undefined) {
    throw new Error("useTodosDispatch must be used within a TodosProvider");
  }
  return context;
}

export { TodosProvider, useTodosState, useTodosDispatch, setTodoLists };

// ###########################################################
function setTodoLists(dispatch, todo) {
  dispatch({
    type: "SET_TODO_LISTS",
    payload: todo
  });
}