import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DialogState = {
  isOpen: boolean;
  username: string;
  userId: string;
  isLoading: boolean;
};

const initialState: DialogState = {
  isOpen: false,
  username: "",
  userId: "",
  isLoading: false,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openDialog: (
      state,
      action: PayloadAction<{ username: string; userId: string }>
    ) => {
      state.isOpen = true;
      state.username = action.payload.username;
      state.userId = action.payload.userId;
    },
    closeDialog: (state) => {
      state.isOpen = false;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { openDialog, closeDialog, setIsLoading } = dialogSlice.actions;
export default dialogSlice.reducer;
