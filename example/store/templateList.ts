import { article, IArticle } from '@example/services/article';
import createSliceState from './common/createSliceState';

export default createSliceState({
  name: 'templateList',
  initialState: [] as IArticle[],
  reducers: {
    set: (state, action) => state,
  },
  effects: {
    fetch: async (state) => {
      const data = await article.getArticleList(1, 1000);
      return data.list;
    }
  }
});
