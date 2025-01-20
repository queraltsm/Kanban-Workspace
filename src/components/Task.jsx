import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleted, duplicatedTask, modified } from "../slices/sliceTasks";
import { Button } from "./Utils";

const Task = ({ id }) => {
  const dispatch = useDispatch()
  const task = useSelector((state) => state.sliceTasks.list[id]);

  if (!task) {
    return null;
  }
  
  const { title } = task;
  
  return (
    <li className="my-task-list">
      <input type="text" value = {title} onChange={(event) => dispatch(modified({id, title: event.target.value}))} />
      &nbsp;
      <Button className="duplicate" onClick={() => dispatch(duplicatedTask(id))}>
          D
        </Button>
        &nbsp;
        <Button className="delete" onClick={() => dispatch(deleted(id))}>
          🗑
        </Button>
    </li>
  );
};

export default Task;