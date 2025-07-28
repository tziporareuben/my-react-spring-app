
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MessageState {
  type: 'success' | 'error' | 'info' | null;
  text: string | null;
}

const initialState: MessageState = {
  type: null,
  text: null,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<{ type: 'success' | 'error' | 'info'; text: string }>) => {
      state.type = action.payload.type;
      state.text = action.payload.text;
    },
    clearMessage: (state) => {
      state.type = null;
      state.text = null;
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;
