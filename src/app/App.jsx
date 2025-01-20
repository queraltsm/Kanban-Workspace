import React, { useState, createContext, useEffect } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { SignupForm } from "../components/SignupForm";
import { Button } from "../components/Utils";
import { Header } from "../components/Utils";
import Board from "../components/Board";

export const ThemeContext = createContext();

const themes = {
  light: {
    text: "#3c3b3d",
    background: "#eff1f5",
    background2: "#ccd0da",
  },
  dark: {
    text: "#cdd6f4",
    background: "#1e1e2e",
    background2: "#313244",
  },
};

function App() {
  const [theme, setTheme] = useState("light");
  const tasks = useSelector((state) => state.sliceTasks.tasks);

  useEffect(() => {
    document.body.style.background = themes[theme].background;
    document.body.style.color = themes[theme].text;
  }, [theme]);

  return (
    <ThemeContext.Provider value={themes[theme]}>
      <div>
        <h1>Kanban Workspace</h1>
        <details>
          <summary>Create account</summary>
          <SignupForm />
        </details>
        <Header tasks={tasks} />
        <Board />
        {theme === "light" ? (
          <Button onClick={() => setTheme("dark")}>Activate dark theme</Button>
        ) : (
          <Button onClick={() => setTheme("light")}>
            Activate light theme
          </Button>
        )}
      </div>
    </ThemeContext.Provider>
  );
}

export default App;