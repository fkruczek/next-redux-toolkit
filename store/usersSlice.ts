import { SortBy, User } from "@/schema/user";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type UsersState = {
  sortBy: SortBy;
  startupUsers: User[];
  isMutationPending: boolean;
  isRemoveConfirmDialogOpen: boolean;
};

const initialState: UsersState = {
  sortBy: "id",
  startupUsers: [],
  isMutationPending: false,
  isRemoveConfirmDialogOpen: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
    setStartupUsers: (state, action: PayloadAction<User[]>) => {
      state.startupUsers = action.payload;
    },
    removeUser: (state, action: PayloadAction<string>) => {
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
