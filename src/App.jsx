import "./App.css";
import {tasks} from "./tasks.jsx";

const Task = ({ title, completed }) => {
  return (
    <li className={completed ? "done" : "todo"}>
      <label>
        <input type="checkbox" defaultChecked={completed} />
        {completed ? "DONE" : "TODO"}
      </label>

      {title}
      {completed && <button>Delete</button>}
      {completed || <button>Edit</button>}
    </li>
  );
};

const TaskList = () => {
  if (tasks.length === 0) {
    return null;
  }

  return (
    <ul>
      {tasks.map((task, i) => (
        <Task key={i} {...task} />
      ))}
    </ul>
  );
};

const Header = () => {
  const pendingTasks = tasks.filter(task => !task.completed);
  if (tasks.length === 0) {
    return "Congratulations! No tasks left.";
  }
  return (
    <>
      {tasks.length} {tasks.length > 1 ? 'tasks' : 'task'}, {pendingTasks.length} pending task{pendingTasks.length > 1 ? 's' : ''}
    </>
  );
};

function App() {
  return (
    <div className="App">
      <Header/>
      <h1>Kanban Workspace</h1>
      <p>Pending tasks:</p>
      <TaskList/>
    </div>
  );
}

export default App;