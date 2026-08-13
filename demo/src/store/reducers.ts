import { combineReducers } from '@reduxjs/toolkit';

import template from './template';
import templateList from './templateList';
import toast from './common/toast';
import loading from './common/loading';

const rootReducer = combineReducers({
  template: template.reducer,
  templateList: templateList.reducer,
  toast: toast.reducer,
  loading: loading.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
