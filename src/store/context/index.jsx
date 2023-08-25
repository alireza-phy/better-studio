import React, { createContext, useReducer } from "react";
import * as store from "../reducer";

// Create a context
export const TodoListContext = createContext({
  state: store.initialState,
  dispatch: () => undefined,
});

// Create a ContextProvider component
const ContextProvider = ({ children }) => {
  // Use the useReducer hook to manage state with reducer
  const [state, dispatch] = useReducer(store.reducer, store.initialState);

  // Wrap the children with the TodoListContext.Provider
  return (
    <TodoListContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoListContext.Provider>
  );
};

export default ContextProvider;
