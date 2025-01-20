import React from "react";
import Task from "./Task";
import { useSelector } from "react-redux";
import { ThemeContext } from "../app/App";
import NewTaskForm from "../components/NewTaskForm";
import { useContext } from "react";

const TaskList = ({ id: listId }) => {
  const { name, list: tasks } = useSelector(
    (state) => state.sliceBoard[listId]
  );
  const theme = useContext(ThemeContext);

  return (
    <div
      className="list"
      style={{ background: theme.background, color: theme.text }}
    >
      <h2>{name}</h2>
      {tasks.length > 0 && (
        <ul>
          {tasks.map((id) => (
            <Task key={id} id={id} />
          ))}
        </ul>
      )}
      <NewTaskForm listId={listId} />
    </div>
  );
};

export default TaskList;