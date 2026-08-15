// app.jsx
import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Manager from "./components/manager";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Manager />
    </>
  );
}

export default App;
