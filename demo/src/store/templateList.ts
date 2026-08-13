import { IArticle } from '@demo/services/article';
import createSliceState from './common/createSliceState';

export default createSliceState({
  name: 'templateList',
  initialState: [] as IArticle[],
  reducers: {
    set: (state, action) => state,
  },
  effects: {
    fetch: async state => {
      return [];
    },
  },
});
