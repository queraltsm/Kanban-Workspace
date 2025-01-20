import { createSlice, nanoid } from '@reduxjs/toolkit';
import { created, deleted } from './sliceTasks';

const initialState = {
  todo: {
    name: "To Do",
    list: [2, 3]
  },
  doing: {
    name: "In Progress",
    list: [1]
  },
  done: {
    name: "Completed",
    list: []
  }
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    listCreated: {
      reducer(state, action) {
        state[action.payload.id] = {
          name: action.payload.name,
          list: []
        };
      },
      prepare(name) {
        return { payload: { id: nanoid(), name } };
      }
    },
    taskRemoved(state, action) {
      state[action.payload.from_id].list.splice(
        state[action.payload.from_id].list.indexOf(action.payload.task_id),
        1
      );
    },
    taskAdded(state, action) {
      const order = action.payload.order ?? state[action.payload.to_id].list.length;
      state[action.payload.to_id].list.splice(order, 0, action.payload.task_id);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(created, (state, action) => {
        state[action.payload.listId].list.push(action.payload.id) 
      })
      .addCase(deleted, (state, action) => {
        for (let t in state) {
          const index = state[t].list.indexOf(action.payload)
          if (index > -1) {
            state[t].list.splice(index, 1)
          }
        }
      })
  }

});

export const { listCreated, taskRemoved, taskAdded } = boardSlice.actions;
export default boardSlice.reducer;