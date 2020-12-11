import React, { useState } from "react";
import TodoPage from "./components/TodoPage";
import NewTaskPage from "./components/NewTaskPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("TODO");

  let page;
  switch (currentPage) {
    case "NEW":
      page = <NewTaskPage onTodo={() => setCurrentPage("TODO")} />;
      break;
    case "TODO":
    default:
      page = <TodoPage onNew={() => setCurrentPage("NEW")} />;
  }

  return page;
}
