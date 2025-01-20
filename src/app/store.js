import { configureStore } from "@reduxjs/toolkit";
import sliceTasks from "../slices/sliceTasks";
import sliceBoard from "../slices/sliceBoard";

export const store = configureStore({
  reducer: { sliceTasks, sliceBoard }
})