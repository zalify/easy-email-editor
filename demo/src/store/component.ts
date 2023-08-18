import { IArticle } from '@demo/services/article';
import createSliceState from './common/createSliceState';
import { IBlockData } from 'easy-email-core';
import { IEmailTemplate } from 'easy-email-editor';
import { component, IComponent } from '@demo/services/component';

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
  name: 'component',
  initialState: null as IComponent[] | null,
  reducers: {
    set: (state, action) => {
      return action.payload;
    },
  },
  effects: {
    fetch: async (state, { categoryId }) => {
      const data = await component.getComponentList({
        categoryId,
      });

      return data;
    },
    update: async (state, { id, data }) => {
      const res = await component.updateTemplate(id, {
        ...data,
        userId: '1234'
      });
    }
  },
});
