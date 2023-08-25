import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import ContextProvider from "./store/context";

// Create a React root using ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application inside the root
root.render(
  // Wrap the App component with the ContextProvider
  <ContextProvider>
    <App />
  </ContextProvider>
);
