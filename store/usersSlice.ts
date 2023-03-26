import { User } from "@/schema/user";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface UsersState {
  sortBy: string;
  startupUsers: User[];
  isMutationPending: boolean;
}

const initialState: UsersState = {
  sortBy: "",
  startupUsers: [],
  isMutationPending: false,
};

const userSlice = createSlice({
  name: "sortBy",
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setStartupUsers: (state, action: PayloadAction<User[]>) => {
      state.startupUsers = action.payload;
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.startupUsers = state.startupUsers.filter(
        (user) => user.id !== action.payload
      );
    },
    setIsMutationPending: (state, action: PayloadAction<boolean>) => {
      state.isMutationPending = action.payload;
    },
  },
});

export const { setSortBy, setStartupUsers, removeUser, setIsMutationPending } =
  userSlice.actions;
export default userSlice.reducer;
