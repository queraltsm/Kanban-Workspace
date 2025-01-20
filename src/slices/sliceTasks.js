import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  list: {
    1: {
      id: 1,
      title: "Learn React components",
      completed: true,
    },
    2: {
      id: 2,
      title: "Complete the module 1 exercises",
      completed: true,
    },
    3: {
      id: 3,
      title: "Take the self-assessment",
      completed: false,
    },
  },
};

const sliceTasks = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    deleted(state, action) {
      delete state.list[action.payload];
    },
    modified(state, action) {
      state.list[action.payload.id].title = action.payload.title;
    },
    created: {
      prepare(title, listId) {
        return { payload: { id: nanoid(), title, listId } };
      },
      reducer(state, action) {
        state.list[action.payload.id] = {
          title: action.payload.title,
        };
      },
    },
  },
});

export const { created, deleted, toggled, modified, allCompleted } =
  sliceTasks.actions;

export const duplicatedTask = (taskId) => (dispatch, getState) => {
  const title = getState().sliceTasks.list[taskId].title;
  const board = getState().sliceBoard;
  const listId = Object.keys(board).find((k) => board[k].list.includes(taskId));
  dispatch(created(title, listId));
};

export default sliceTasks.reducer;