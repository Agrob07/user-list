import React from "react";
import { useRoutes } from "react-router-dom";

import "./App.css";

import { router } from "./routes/router";

function App() {
  const element = useRoutes(router);
  return <div className="App">{element}</div>;
}

export default App;
