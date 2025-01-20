import { Button } from "./Utils";
import TaskList from "./TasksList";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { listCreated } from "../slices/sliceBoard";

const Board = () => {
    const lists = useSelector(state => Object.keys(state.sliceBoard))
    const [newList, setNewList] = useState("");
    const dispatch = useDispatch();
    
    const createList = (event) => {
      event.preventDefault();
      dispatch(listCreated(newList));
      setNewList("");
    };
  
    return (
      <div className="board">
        <div className="list">
          <form onSubmit={createList}>
            <input
              type="text"
              placeholder="New list"
              value={newList}
              onChange={e => setNewList(e.target.value)}
            />
            <p><Button type="submit">Create list</Button></p>
          </form>
        </div>
        {lists.map(id => <TaskList key={id} id={id} />)}
      </div>
    );
  };
  
  export default Board;