import { CATEGORY_ID, PROVIDE_CATEGORY_ID, PROVIDE_USER_ID, USER_ID } from '@example/constants';
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

      // Provided template
      const data = await article.getArticleList({
        userId: PROVIDE_USER_ID,
        categoryId: PROVIDE_CATEGORY_ID,
        page: 1,
        size: 1000
      });

      // Visitor data
      const data2 = await article.getArticleList({
        userId: USER_ID,
        categoryId: CATEGORY_ID,
        page: 1,
        size: 1000
      });
      const list = [...data.list, ...data2.list];
      list.sort((a, b) => a.updated_at > b.updated_at ? -1 : 1);
      return list;
    }
  }
});
