import { article } from '@example/services/article';
import createSliceState from './common/createSliceState';
import { message } from 'antd';
import { history } from '@example/util/history';
import { IBlockData } from '@/typings';
import { emailToImage } from '@example/util/emailToImage';
import { BlocksMap, IEmailTemplate, BasicType, } from 'easy-email-editor';

export default createSliceState({
  name: 'template',
  initialState: null as Omit<IEmailTemplate, 'hoverIdx' | 'focusIdx'> | null,
  reducers: {
    set: (state, action) => {
      return action.payload;
    },
  },
  effects: {
    fetchById: async (state, id: number) => {
      try {
        const data = await article.getArticle(id);
        const content = JSON.parse(data.content.content) as IBlockData;
        return {
          ...data,
          content,
          subject: data.title,
          subTitle: '',
        };
      } catch (error) {
        history.replace('/');
        throw error;
      }
    },
    fetchDefaultTemplate: async (state) => {
      return {
        subject: 'Welcome to Easy-email',
        subTitle: 'Nice to meet you!',
        content: BlocksMap.findBlockByType(BasicType.PAGE).createInstance({}),
      } as IEmailTemplate;
    },
    create: async (
      state,
      payload: {
        template: IEmailTemplate;
        success: (id: number) => void;
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
      payload.success(data.article_id);
      return { ...data, ...payload.template };
    },
    updateById: async (
      state,
      payload: {
        id: number;
        template: IEmailTemplate;
        success: () => void;
      }
    ) => {
      const picture = await emailToImage(payload.template.content);
      await article.updateArticle(payload.id, {
        ...payload.template,
        picture,
        content: JSON.stringify(payload.template.content),
      });
      payload.success();
    },
    removeById: async (state, payload: { id: number; success: () => void; }) => {
      await article.deleteArticle(payload.id);
      payload.success();
      message.success('Removed success.');
    },
  },
});
