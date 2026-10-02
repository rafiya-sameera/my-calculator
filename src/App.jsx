
import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("");

  const handleClick = (value) => {
    setDisplay((prev) => prev + value);
  };

  const calculate = () => {
    try {
      if (!/^[0-9+\-*/.() ]+$/.test(display)) {
        setDisplay("Error");
        return;
      }

      const result = Function(
        `"use strict"; return (${display})`
      )();

      setDisplay(
        Number.isFinite(result) ? String(result) : "Error"
      );
    } catch {
      setDisplay("Error");
    }
  };

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "C", "+"
  ];

  return (
    <div className="app">
      <div className="calculator">
        <h1>Calculator ♡</h1>

        <input
          className="display"
          value={display}
          readOnly
          placeholder="0"
        />

        <div className="buttons">
          {buttons.map((button) => (
            <button
              key={button}
              onClick={() =>
                button === "C"
                  ? setDisplay("")
                  : handleClick(button)
              }
            >
              {button}
            </button>
          ))}

          <button className="equal" onClick={calculate}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;