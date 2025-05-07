import services from '@demo/services';
import createSliceState from './common/createSliceState';

export default createSliceState({
  name: 'email',
  initialState: null,
  reducers: {
    set: (state, action) => state,
  },
  effects: {
    send: async (
      state,
      payload: {
        data: Parameters<typeof services.common.sendTestEmail>[0];
        success: () => void;
      }
    ) => {
      await services.common.sendTestEmail(payload.data);
      payload.success();
    },
  },
});
