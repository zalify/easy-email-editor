import { USER } from '@demo/constants';
import { article, IArticle } from '@demo/services/article';
import { UserStorage } from '@demo/utils/user-storage';
import createSliceState from './common/createSliceState';

export default createSliceState({
  name: 'templateList',
  initialState: [] as IArticle[],
  reducers: {
    set: (state, action) => state,
  },
  effects: {
    fetch: async (state) => {
      let provideUserData: IArticle[] = [];
      // if (USER.provideUserId && USER.provideCategoryId) {
      //   // Provided template
      //   const data = await article.getArticleList({
      //     userId: USER.provideUserId,
      //     categoryId: USER.provideCategoryId,
      //     page: 1,
      //     size: 1000,
      //   });
      //   provideUserData = data.list;
      // }

      // user data
      const data2 = await article.getArticleList({
        userId: (await UserStorage.getAccount()).user_id,
        categoryId: USER.categoryId,
        page: 1,
        size: 1000,
      });
      const list = [...provideUserData, ...data2.list];
      list.sort((a, b) => (a.updated_at > b.updated_at ? -1 : 1));
      return list;
    },
  },
});
