import createSliceState from './common/createSliceState';
import { component, ITemplate } from '@demo/services/component';

export default createSliceState({
  name: 'templateList',
  initialState: [] as ITemplate[],
  reducers: {
    set: (state, action) => state,
  },
  effects: {
    fetch: async (state) => {
      const data = await component.getTemplateList();

      return data;
    },
  },
});
