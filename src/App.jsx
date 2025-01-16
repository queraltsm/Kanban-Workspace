import React, { useState, createContext, useContext, useEffect } from "react";
import "./App.css";
import { SignupForm } from "./SignupForm";

const ThemeContext = createContext();

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

const Task = ({ id, title, completed, deleteTask, toggleCompleted }) => {
  return (
    <li className="my-task-list">
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => toggleCompleted(id)}
        />
      </label>
      &nbsp;
      {title} &nbsp;
      {completed && (
        <button className="delete" onClick={() => deleteTask(id)}>
          🗑 Delete
        </button>
      )}
      {!completed && <button className="edit">✏ Edit</button>}
    </li>
  );
};

const TaskList = ({ tasks, deleteTask, toggleCompleted }) => {
  if (tasks.length === 0) {
    return null;
  }
  return (
    <ul>
      {tasks.map((task, i) => (
        <Task
          key={i}
          {...task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
        />
      ))}
    </ul>
  );
};

const Header = ({ tasks }) => {
  const pendingTasks = tasks.filter((task) => !task.completed)

  if (pendingTasks.length === 0) {
    return <p>Congratulations! No tasks left.</p>;
  }
  return (
    <p>
      {tasks.length} {tasks.length > 1 ? "tasks" : "task"},{" "}
      {pendingTasks.length} pending task{pendingTasks.length > 1 ? "s" : ""}
    </p>
  );
};

const NewTaskForm = ({ addTask }) => {
  const [newTitle, setNewTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTitle.trim() === "") {
      console.log("Title cannot be empty");
      return;
    }
    addTask(newTitle);
    setNewTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="New task"
        value={newTitle}
        onChange={(event) => setNewTitle(event.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

const Button = (props) => {
  const theme = useContext(ThemeContext);
  return (
    <button
      style={{
        background: theme.background2,
        color: theme.text,
      }}
      {...props}
    ></button>
  );
};

const addTask = (tasks, setTasks, title) => {
  const newId =
    tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
  const newTask = { id: newId, title, completed: false };
  setTasks([...tasks, newTask]);
};

function App() {
  const [theme, setTheme] = useState("light");
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Learn React components",
      completed: false,
    },
    {
      id: 2,
      title: "Complete the Module 1 exercises",
      completed: true,
    },
    {
      id: 3,
      title: "Complete the self-assessment",
      completed: false,
    },
  ]);

  const [showSignupForm, setShowSignupForm] = useState(false);

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleCompleted = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const viewSignupForm = () => {
    setShowSignupForm(true);
  };

  const closeSignupForm = () => {
    setShowSignupForm(false);
  };

  useEffect(() => {
    document.body.style.background = themes[theme].background;
    document.body.style.color = themes[theme].text;
  }, [theme]);

  return (
    <ThemeContext.Provider value={themes[theme]}>
      <div>
        <h1>Kanban Workspace</h1>
        {showSignupForm || (
          <>
            <Header tasks={tasks} />
            <TaskList
              tasks={tasks}
              deleteTask={deleteTask}
              toggleCompleted={toggleCompleted}
            />
            <NewTaskForm addTask={(title) => addTask(tasks, setTasks, title)} />
            {theme === "light" ? (
              <Button onClick={() => setTheme("dark")}>
                Activate dark theme
              </Button>
            ) : (
              <Button onClick={() => setTheme("light")}>
                Activate light theme
              </Button>
            )}
            &nbsp;
            <Button onClick={viewSignupForm}>Create account</Button>
          </>
        )}
        {showSignupForm && <SignupForm closeForm={closeSignupForm} />}
      </div>
    </ThemeContext.Provider>
  );
}

export default App;