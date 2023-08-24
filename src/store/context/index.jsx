import React, { createContext, useContext, ReactNode, useReducer } from "react";
import * as store from "../reducer";

// Create a context
export const TodoListContext = createContext({
  state: store.initialState,
  dispatch: () => undefined,
});

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(store.reducer, store.initialState);

  const value = {
    todoList: state.todoList,
    addTodoItem: (todoItemLabel) => {
      dispatch({ type: "delete-task", todoItemLabel });
    },
  };

  return (
    <TodoListContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoListContext.Provider>
  );
};

export default ContextProvider;
