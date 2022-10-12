import React from "react";
import { useRoutes } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import { router } from "./routes/router";



function App() {
  const element = useRoutes(router);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App w-screen md:w-auto h-full">{element}</div>
    </DndProvider>
  );
}

export default App;
