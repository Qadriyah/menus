import { createSlice } from "@reduxjs/toolkit";

export interface DrawerState {
  open: boolean;
}

const initialState = {
  open: true,
} as DrawerState;

const namespace = "drawer";

const drawerSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    toggleDrawer(state) {
      state.open = !state.open;
    },
    openDrawer(state) {
      state.open = true;
    },
    closeDrawer(state) {
      state.open = false;
    },
  },
});

export const { openDrawer, closeDrawer, toggleDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
