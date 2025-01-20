import { useContext } from "react";
import { ThemeContext } from "../app/App";
import { useSelector } from "react-redux";

const Header = () => {

  const tasks = useSelector((state) => Object.values(state.sliceTasks.list)); 
  const pendingTasks = tasks.filter((task) => !task.completed);

  return (
    <p>
      {tasks.length} {tasks.length > 1 ? "tasks" : "task"},{" "}
      {pendingTasks.length} pending task{pendingTasks.length > 1 ? "s" : ""}
    </p>
  );
};

const Field = ({
    id,
    children,
    invalid = false,
    error = "",
    onValueChange = () => {},
    ...props
  }) => {
    return (
      <div className="field">
        <label htmlFor={id}>{children}</label>
        <input
          {...props}
          name={id}
          id={id}
          onChange={(e) => onValueChange(e.target.value)}
        />
        {invalid && <p className="error">{error}</p>}
      </div>
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
  export { Header, Field, Button }