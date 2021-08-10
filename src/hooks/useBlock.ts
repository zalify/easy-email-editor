import { EditorPropsContext } from '@/components/Provider/PropsProvider';
import { BlockType, BasicType } from '../constants';
import { cloneDeep, debounce, get, set } from 'lodash';
import { IBlockData, IEmailTemplate } from '../typings';
import { useCallback, useContext } from 'react';
import { message } from 'antd';
import {
  findBlockByType,
  getIndexByIdx,
  getParentByIdx,
  getParentIdx,
  getValueByIdx,
} from '@/utils/block';
import { createBlockItem } from '@/utils/createBlockItem';
import { useEditorContext } from './useEditorContext';
import { RecordContext } from '@/components/Provider/RecordProvider';
import { useFocusIdx } from './useFocusIdx';

export function useBlock() {
  const { values, getState, change, batch } = useEditorContext();

  const { focusIdx, setFocusIdx } = useFocusIdx();

  const { autoComplete } = useContext(EditorPropsContext);

  const focusBlock = get(values, focusIdx) as IBlockData | null;

  const {
    redo,
    undo,
    redoable,
    undoable,
    reset,
    status: recordStatus,
  } = useContext(RecordContext);

  const addBlock = useCallback(
    (params: {
      type: BlockType;
      parentIdx: string;
      positionIndex?: number;
      payload?: any;
      canReplace?: boolean;
    }) => {
      let { type, parentIdx, positionIndex, payload } = params;
      let nextFocusIdx = focusIdx;
      const values = cloneDeep(getState().values) as IEmailTemplate;
      const parent = get(values, parentIdx) as IBlockData | null;
      if (!parent) {
        message.warning('Invalid block');
        return;
      }

      let child = createBlockItem(type, payload);

      if (typeof positionIndex === 'undefined') {
        positionIndex = parent.children.length;
      }
      nextFocusIdx = `${parentIdx}.children.[${positionIndex}]`;
      const block = findBlockByType(type);
      const parentBlock = findBlockByType(parent.type);

      if (autoComplete) {
        if ([BasicType.COLUMN, BasicType.GROUP].includes(block.type)) {
          if (parentBlock.type === BasicType.PAGE) {
            child = createBlockItem(BasicType.WRAPPER, {
              children: [
                createBlockItem(BasicType.SECTION, {
                  children: [child],
                }),
              ],
            });
            nextFocusIdx += '.children.[0].children.[0]';
          } else if (parentBlock.type === BasicType.WRAPPER) {
            child = createBlockItem(BasicType.SECTION, {
              children: [child],
            });
            nextFocusIdx += '.children.[0]';
          }
        } else if (
          [
            BasicType.TEXT,
            BasicType.IMAGE,
            BasicType.SPACER,
            BasicType.DIVIDER,

            BasicType.BUTTON,
            BasicType.ACCORDION,
            BasicType.CAROUSEL,
            BasicType.NAVBAR,
            BasicType.SOCIAL,
          ].includes(block.type)
        ) {
          if (
            parentBlock.type === BasicType.SECTION ||
            parentBlock.type === BasicType.GROUP
          ) {
            child = createBlockItem(BasicType.COLUMN, {
              children: [child],
            });
            nextFocusIdx += '.children.[0]';
          } else if (parentBlock.type === BasicType.WRAPPER) {
            child = createBlockItem(BasicType.SECTION, {
              children: [
                createBlockItem(BasicType.COLUMN, {
                  children: [child],
                }),
              ],
            });
            nextFocusIdx += '.children.[0].children.[0]';
          } else if (parentBlock.type === BasicType.PAGE) {
            child = createBlockItem(BasicType.SECTION, {
              children: [
                createBlockItem(BasicType.COLUMN, {
                  children: [child],
                }),
              ],
            });
            nextFocusIdx += '.children.[0].children.[0]';
          }
        }
      }

      // Replace
      if (params.canReplace) {
        const parentIndex = getIndexByIdx(parentIdx);
        const upParent = getParentByIdx(values, parentIdx);
        if (upParent) {
          upParent.children.splice(parentIndex, 1, child);

          return change(getParentIdx(parentIdx)!, { ...upParent });
        }
      }

      const fixedBlock = findBlockByType(child.type);
      if (!fixedBlock.validParentType.includes(parent.type)) {
        message.warning(
          `${block.type} cannot be used inside ${
            parentBlock.type
          }, only inside: ${block.validParentType.join(', ')}`
        );
        return;
      }

      parent.children.splice(positionIndex, 0, child);
      batch(() => {
        change(parentIdx, { ...parent }); // listeners not notified
        change('content', {
          ...values.content,
        });
      });
      setFocusIdx(nextFocusIdx);
    },
    [autoComplete, batch, change, focusIdx, getState, setFocusIdx]
  );

  const moveBlock = useCallback(
    (params: {
      sourceIdx: string;
      destinationIdx: string;
      positionIndex: number;
    }) => {
      let { sourceIdx, destinationIdx, positionIndex } = params;
      if (sourceIdx === destinationIdx) return null;
      let nextFocusIdx = focusIdx;
      const values = cloneDeep(getState().values) as IEmailTemplate;
      const source = getValueByIdx(values, sourceIdx)!;
      const sourceParentIdx = getParentIdx(sourceIdx);
      if (!sourceParentIdx) return;
      const sourceParent = getValueByIdx(values, sourceParentIdx)!;
      const destinationParent = getValueByIdx(values, destinationIdx)!;

      const sourceBlock = findBlockByType(source.type);
      if (!sourceBlock.validParentType.includes(destinationParent.type)) {
        const parentBlock = findBlockByType(destinationParent.type);
        message.warning(
          `${sourceBlock.name} cannot be used inside ${
            parentBlock.name
          }, only inside: ${sourceBlock.validParentType.join(', ')}`
        );
        return;
      }

      if (sourceParent === destinationParent) {
        const sourceIndex = getIndexByIdx(sourceIdx);
        if (sourceIndex < positionIndex) {
          positionIndex -= 1;
        }
        const [removed] = sourceParent.children.splice(sourceIndex, 1);
        destinationParent.children.splice(positionIndex, 0, removed);
      } else {
        sourceParent.children = sourceParent.children.filter(
          (item) => item !== source
        );
        destinationParent.children.splice(positionIndex, 0, source);
        batch(() => {
          change(sourceParentIdx, { ...sourceParent });
          change(destinationIdx, { ...destinationParent });
        });
      }

      nextFocusIdx = destinationIdx + `.children.[${positionIndex}]`;
      setFocusIdx(nextFocusIdx);
    },
    [batch, change, focusIdx, getState, setFocusIdx]
  );

  const copyBlock = useCallback(
    (idx: string) => {
      let nextFocusIdx = focusIdx;
      const values = cloneDeep(getState().values) as IEmailTemplate;

      const parentIdx = getParentIdx(idx);
      if (!parentIdx) return;
      const parent = get(values, getParentIdx(idx) || '') as IBlockData | null;
      if (!parent) {
        message.warning('Invalid block');
        return;
      }
      const copyBlock = cloneDeep(get(values, idx));
      const index = getIndexByIdx(idx) + 1;

      parent.children.splice(index, 0, copyBlock);
      change(parentIdx, { ...parent });
      nextFocusIdx = `${parentIdx}.children.[${index}]`;

      setFocusIdx(nextFocusIdx);
    },
    [change, focusIdx, getState, setFocusIdx]
  );

  const removeBlock = useCallback(
    (idx: string) => {
      let nextFocusIdx = focusIdx;
      const values = cloneDeep(getState().values) as IEmailTemplate;

      const block = getValueByIdx(values, idx);
      if (!block) {
        message.warning('Invalid block');
        return;
      }
      const parentIdx = getParentIdx(idx);
      const parent = get(values, getParentIdx(idx) || '') as IBlockData | null;
      const blockIndex = getIndexByIdx(idx);
      if (!parentIdx || !parent) {
        if (block.type === BasicType.PAGE) {
          message.warning('Page node can not remove');
          return;
        }
        message.warning('Invalid block');
        return;
      }

      parent.children.splice(blockIndex, 1);
      change(parentIdx, { ...parent });
      nextFocusIdx = parentIdx;
      setFocusIdx(nextFocusIdx);
    },
    [change, focusIdx, getState, setFocusIdx]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setValueByIdx = useCallback(
    debounce(<T extends any>(idx: string, newVal: T) => {
      change(idx, newVal);
    }),
    [change]
  );

  const moveByIdx = useCallback(
    (sourceIdx: string, destinationIdx: string) => {
      let nextFocusIdx = focusIdx;
      const values = cloneDeep(getState().values) as IEmailTemplate;
      const sourceIndex = getIndexByIdx(sourceIdx);
      const destinationIndex = getIndexByIdx(destinationIdx);

      const sourceParentIdx = getParentIdx(sourceIdx);
      const destinationParentIdx = getParentIdx(destinationIdx);

      if (!sourceParentIdx || !destinationParentIdx) {
        message.warning('Something error');
        return;
      }

      const sourceParent = get(values, sourceParentIdx) as IBlockData;

      const destinationParent = get(values, sourceParentIdx) as IBlockData;

      if (destinationIndex >= destinationParent.children.length) {
        return;
      }

      const [removed] = sourceParent.children.splice(Number(sourceIndex), 1);
      destinationParent.children.splice(Number(destinationIndex), 0, removed);

      batch(() => {
        change(sourceParentIdx, sourceParent);
        change(destinationParentIdx, destinationParent);
      });

      nextFocusIdx = destinationIdx;
      setFocusIdx(nextFocusIdx);
    },
    [batch, change, focusIdx, getState, setFocusIdx]
  );

  const isExistBlock = useCallback(
    (idx: string) => {
      return Boolean(get(values, idx));
    },
    [values]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setFocusBlock = useCallback(
    debounce((val) => {
      change(focusIdx, val);
    }),
    [focusBlock, focusIdx, change]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setFocusBlockValue = useCallback(
    debounce((val) => {
      if (!focusBlock) return;
      focusBlock.data.value = val;
      change(focusIdx, focusBlock);
    }),
    [focusBlock, focusIdx]
  );

  return {
    values,
    focusBlock,
    setFocusBlock,
    setFocusBlockValue,
    setValueByIdx,
    addBlock,
    moveBlock,
    copyBlock,
    removeBlock,
    moveByIdx,
    isExistBlock,
    redo,
    undo,
    reset,
    redoable,
    undoable,
    recordStatus,
  };
}
