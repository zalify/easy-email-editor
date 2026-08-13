import { article, IArticle } from '@demo/services/article';
import createSliceState from './common/createSliceState';
import { Message } from '@arco-design/web-react';
import { history } from '@demo/utils/history';
import { IBlockData, BlockManager, BasicType, AdvancedType } from 'easy-email-core';
import { IEmailTemplate } from 'easy-email-editor';
import { getTemplate } from '@demo/config/getTemplate';

export function getAdaptor(data: IArticle): IEmailTemplate {
  const content = JSON.parse(data.content.content) as IBlockData;
  return {
    ...data,
    content,
    subject: data.title,
    subTitle: data.summary,
  };
}

export default createSliceState({
  name: 'template',
  initialState: null as IEmailTemplate | null,
  reducers: {
    set: (state, action) => {
      return action.payload;
    },
  },
  effects: {
    fetchById: async (
      state,
      {
        id,
        userId,
      }: {
        id: number;
        userId: number;
      },
    ) => {
      try {
        let data = await getTemplate(id);
        if (!data) {
          data = await article.getArticle(id, userId);
        }
        return getAdaptor(data);
      } catch (error) {
        history.replace('/');
        throw error;
      }
    },
    fetchDefaultTemplate: async state => {
      return {
        subject: 'Welcome to Easy-email',
        subTitle: 'Nice to meet you!',
        content: BlockManager.getBlockByType(BasicType.PAGE).create({
          children: [BlockManager.getBlockByType(AdvancedType.WRAPPER).create()],
        }),
      } as IEmailTemplate;
    },
    duplicate: async (
      state,
      payload: {
        article: {
          article_id: number;
          user_id: number;
        };
        success: (id: number) => void;
      },
    ) => {
      const source = await article.getArticle(
        payload.article.article_id,
        payload.article.user_id,
      );
      const data = await article.addArticle({
        title: source.title,
        content: source.content.content,
        picture: source.picture,
        summary: source.summary,
      });
      payload.success(data.article_id);
    },
    removeById: async (state, payload: { id: number; success: () => void }) => {
      try {
        await article.deleteArticle(payload.id);
        payload.success();
        Message.success('Removed success.');
      } catch (error: any) {
        if (error?.response?.status === 404) {
          throw {
            message: 'Cannot delete the default template',
          };
        }
      }
    },
  },
});
