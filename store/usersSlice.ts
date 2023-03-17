import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { User } from "@/types";

export interface UsersState {
  sortBy: string;
  startupUsers: User[];
}

const initialState: UsersState = {
  sortBy: "",
  startupUsers: [],
};

const usersSlice = createSlice({
  name: "sortBy",
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setStartupUser: (state, action: PayloadAction<User[]>) => {
      state.startupUsers = action.payload;
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.startupUsers = state.startupUsers.filter(
        (user) => user.id !== action.payload
      );
    },
  },
});

export const { setSortBy, setStartupUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
