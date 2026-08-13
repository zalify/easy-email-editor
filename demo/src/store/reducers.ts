import { combineReducers } from '@reduxjs/toolkit';

import toast from './common/toast';
import loading from './common/loading';

const rootReducer = combineReducers({
  toast: toast.reducer,
  loading: loading.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
