import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  tickets: [],
};

export const tickets = createSlice({
  name: 'userTickets',
  initialState,
  reducers: {
    setTickets(
      state: any,
      action: PayloadAction,
    ) {
      state.tickets = action.payload;
    },

  },
});

export const {
  setTickets,
} = tickets.actions;
export default tickets.reducer;
