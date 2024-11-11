import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ReshapeCalculator from "./components/ReshapeCalculator";

function App() {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <ReshapeCalculator />
      </div>
    </>
  );
}

export default App;
