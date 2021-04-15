import { article } from '@example/services/article';
import createSliceState from './common/createSliceState';
import { message } from 'antd';
import { history } from '@example/util/history';
import { IBlockData } from '@/typings';
import { EditorProps } from '@/components/EmailEditorProvider';
import { BasicType } from '@/constants';

export default createSliceState({
  name: 'template',
  initialState: null as EditorProps | null,
  reducers: {
    set: (state, action) => state,
  },
  effects: {
    fetchById: async (state, id: number) => {
      try {
        const data = await article.getArticle(id);
        const content = JSON.parse(data.content.content) as IBlockData;
        return {
          ...data,
          content,
          focusIdx: 'content',
          hoverIdx: '',
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
        content: {
          type: BasicType.PAGE,
          data: {
            value: {},
          },
          attributes: {},
          children: [],
        },
        focusIdx: 'content',
        hoverIdx: '',
      } as EditorProps;
    },
    create: async (
      state,
      payload: { template: EditorProps; success: (id: number) => void }
    ) => {
      const data = await article.addArticle({
        ...payload.template,
        summary: payload.template.subTitle,
        title: payload.template.subject,
        content: JSON.stringify(payload.template.content),
        picture: 'https://assets.maocanhua.cn/FvewK7kTxBH8Zv4Br3sDIP3z7EtP',
      });
      payload.success(data.article_id);
      return { ...data, ...payload.template };
    },
    updateById: async (
      state,
      payload: { id: number; template: EditorProps; success: () => void }
    ) => {
      await article.updateArticle(payload.id, {
        ...payload.template,
        content: JSON.stringify(payload.template.content),
      });
      payload.success();
    },
    removeById: async (state, payload: { id: number; success: () => void }) => {
      await article.deleteArticle(payload.id);
      payload.success();
      message.success('Removed success.');
    },
  },
});
