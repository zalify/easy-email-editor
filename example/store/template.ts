import { article, IArticle } from '@example/services/article';
import createSliceState from './common/createSliceState';
import { message } from 'antd';
import { history } from '@example/util/history';
import { IBlockData } from 'easy-email-editor';
import { emailToImage } from '@example/util/emailToImage';
import { BlocksMap, IEmailTemplate } from 'easy-email-editor';

export function getAdaptor(data: IArticle): IEmailTemplate {
  const content = JSON.parse(data.content.content) as IBlockData;
  return {
    ...data,
    content,
    subject: data.title,
    subTitle: '',
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
    fetchById: async (state, { id, userId }: {
      id: number,
      userId: number;
    }) => {
      try {
        const data = await article.getArticle(id, userId);
        return getAdaptor(data);
      } catch (error) {
        history.replace('/');
        throw error;
      }
    },
    fetchDefaultTemplate: async (state) => {
      return {
        subject: 'Welcome to Easy-email',
        subTitle: 'Nice to meet you!',
        content: BlocksMap.getBlock('Page').createInstance({}),
      } as IEmailTemplate;
    },
    create: async (
      state,
      payload: {
        template: IEmailTemplate;
        success: (id: number, data: IEmailTemplate) => void;
      }
    ) => {
      const picture = await emailToImage(payload.template.content);
      const data = await article.addArticle({
        ...payload.template,
        picture,
        summary: payload.template.subTitle,
        title: payload.template.subject,
        content: JSON.stringify(payload.template.content),
      });
      payload.success(data.article_id, getAdaptor(data));
      return { ...data, ...payload.template };
    },
    duplicate: async (
      state,
      payload: {
        article: {
          article_id: number;
          user_id: number;
        };
        success: (id: number) => void;
      }
    ) => {
      const source = await article.getArticle(payload.article.article_id, payload.article.user_id);
      const data = await article.addArticle({
        title: source.title,
        content: source.content.content,
        picture: source.picture,
        summary: source.summary,
      });
      payload.success(data.article_id);
    },
    updateById: async (
      state,
      payload: {
        id: number;
        template: IEmailTemplate;
        success: (templateId: number) => void;
      }
    ) => {
      try {
        const picture = await emailToImage(payload.template.content);
        await article.updateArticle(payload.id, {
          ...payload.template,
          picture,
          content: JSON.stringify(payload.template.content),
        });
        payload.success(payload.id);
      } catch (error) {
        if (error?.response?.status === 404) {
          throw {
            message: 'Cannot change the default template'
          };
        }
      }
    },
    removeById: async (state, payload: { id: number; success: () => void; }) => {
      try {
        await article.deleteArticle(payload.id);
        payload.success();
        message.success('Removed success.');
      } catch (error) {
        if (error?.response?.status === 404) {
          throw {
            message: 'Cannot delete the default template'
          };
        }
      }
    },
  },
});
