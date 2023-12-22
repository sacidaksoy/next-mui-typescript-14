import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DialogProps } from "@/ui/Dialog/Dialog";

type AppState = {
  dialogs: DialogProps[];
};

const initialState: AppState = {
  dialogs: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    enqueueDialog: (
      state,
      action: PayloadAction<Omit<DialogProps, "open">>
    ) => {
      const dialog = {
        open: true,
        ...action.payload,
      } satisfies DialogProps;
      state.dialogs = [...state.dialogs, dialog] as typeof state.dialogs;
    },
    closeDialog: (state) => {
      if (state.dialogs.length !== 0) {
        state.dialogs = state.dialogs.slice(0, -1);
      }
    },
  },
});

export const { closeDialog, enqueueDialog } = appSlice.actions;
export default appSlice.reducer;
