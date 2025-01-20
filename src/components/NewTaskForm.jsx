import React, { useState } from "react";
import { Button } from "./Utils";
import { useDispatch } from "react-redux";
import { created } from "../slices/sliceTasks";

const NewTaskForm = ({ listId }) => {
  const [newTitle, setNewTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTitle.trim() === "") {
      console.log("Title cannot be empty");
      return;
    }
    dispatch(created(newTitle, listId));
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
      <Button type="submit">Add</Button>
    </form>
  );
};

export default NewTaskForm;