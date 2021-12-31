import { BlockGroup, CollectedBlock } from 'easy-email-editor';
import createSliceState from './common/createSliceState';

export const COLLECTION_KEY = 'COLLECTION_KEY';

const defaultData = [
  {
    title: 'Collection',
    name: 'Collection',
    blocks: [] as {
      title: string;
      description?: React.ReactNode;
      ExampleComponent: () => JSX.Element;
    }[],
  },
];

const extraBlocksData = JSON.parse(
  localStorage.getItem(COLLECTION_KEY) || JSON.stringify(defaultData)
);

export default createSliceState({
  name: 'extraBlocks',
  initialState: extraBlocksData as BlockGroup[],
  reducers: {
    set: (state, action) => state,
    add: (state, action: { payload: CollectedBlock }) => {
      state[0].blocks.push(action.payload);
      localStorage.setItem(COLLECTION_KEY, JSON.stringify(state));
      return state;
    },
    remove(state, action: { payload: { id: string } }) {
      state[0].blocks = state[0].blocks.filter(
        (item) => item.id !== action.payload.id
      );
      return state;
    },
  },
  effects: {},
});
