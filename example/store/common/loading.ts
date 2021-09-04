import { createSlice } from '@reduxjs/toolkit';

export interface LoadingState {
  [key: string]: boolean;
}

export default createSlice({
  name: 'loading',
  initialState: {} as LoadingState,
  reducers: {
    startLoading: (state, action: { payload: string; }) => {
      state[action.payload] = true;
    },
    endLoading: (state, action: { payload: string; }) => {
      state[action.payload] = false;
    },
  }
});