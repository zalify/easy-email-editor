import { getSiblingIdx } from './../utils/block';
import { scrollFocusBlockIntoView } from '@/utils/scrollFocusBlockIntoView';
import { EditorPropsContext } from '@/components/Provider/PropsProvider';
import { BlockType, BasicType } from '../constants';
import { cloneDeep, debounce, get } from 'lodash';
import { IBlockData, IEmailTemplate } from '../typings';
import { useCallback, useContext } from 'react';
import { message } from 'antd';
import {
  findBlockByType,
  getIndexByIdx,
  getPageIdx,
  getParentByIdx,
  getParentIdx,
  getValueByIdx,
} from '@/utils/block';
import { createBlockItem } from '@/utils/createBlockItem';
import { useEditorContext } from './useEditorContext';
import { RecordContext } from '@/components/Provider/RecordProvider';
import { useFocusIdx } from './useFocusIdx';
import { BlocksMap } from '@/components/core/blocks';

export function useBlock() {
  const { values, getState, change, batch } = useEditorContext();

  const { focusIdx, setFocusIdx } = useFocusIdx();

  const { autoComplete } = useContext(EditorPropsContext);

  const focusBlock = get(values, focusIdx) as IBlockData | null;

  const { redo, undo, redoable, undoable, reset } = useContext(RecordContext);

  const addBlock = useCallback(
    (params: {
      type: BlockType;
      parentIdx: string;
      positionIndex?: number;
      payload?: any;
      canReplace?: boolean;
    }) => {
      const start = console.time();

      let { type, parentIdx, positionIndex, payload } = params;
      let nextFocusIdx: string;
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
        const autoCompletePaths = BlocksMap.getAutoCompletePath(
          type,
          parent.type
        );
        if (autoCompletePaths) {
          autoCompletePaths.forEach((item) => {
            child = createBlockItem(item, {
              children: [child],
            });
            nextFocusIdx += '.children.[0]';
          });
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
      console.timeLog();
      change(parentIdx, parent); // listeners not notified
      setFocusIdx(nextFocusIdx);
      scrollFocusBlockIntoView({
        idx: nextFocusIdx,
        inShadowDom: true,
      });
      console.timeEnd();
    },
    [autoComplete, change, getState, setFocusIdx]
  );

  const moveBlock = useCallback(
    (sourceIdx: string, destinationIdx: string) => {
      if (sourceIdx === destinationIdx) return null;

      let nextFocusIdx: string;

      const values = cloneDeep(getState().values) as IEmailTemplate;
      const source = getValueByIdx(values, sourceIdx)!;
      const sourceParentIdx = getParentIdx(sourceIdx);
      const destinationParentIdx = getParentIdx(destinationIdx);
      if (!sourceParentIdx || !destinationParentIdx) return;
      const sourceParent = getValueByIdx(values, sourceParentIdx)!;
      const destinationParent = getValueByIdx(values, destinationParentIdx)!;

      const sourceIndex = getIndexByIdx(sourceIdx);
      let [removed] = sourceParent.children.splice(sourceIndex, 1);
      if (autoComplete) {
        const autoCompletePaths = BlocksMap.getAutoCompletePath(
          source.type,
          destinationParent.type
        );
        if (autoCompletePaths) {
          autoCompletePaths.forEach((item) => {
            removed = createBlockItem(item, {
              children: [removed],
            });
            nextFocusIdx += '.children.[0]';
          });
        } else {
          message.warning('Something when wrong');
        }
      }

      const positionIndex = getIndexByIdx(destinationIdx);
      if (sourceParent === destinationParent) {
        destinationParent.children.splice(positionIndex, 0, removed);

        nextFocusIdx =
          destinationParentIdx +
          `.children.[${destinationParent.children.findIndex(
            (item) => item === removed
          )}]`;
      } else {
        destinationParent.children.splice(positionIndex, 0, removed);
        nextFocusIdx = destinationIdx;
      }

      change(getPageIdx(), { ...values.content });

      setTimeout(() => {
        setFocusIdx(nextFocusIdx);
      }, 50);

      scrollFocusBlockIntoView({
        idx: nextFocusIdx,
        inShadowDom: true,
      });
    },
    [autoComplete, change, getState, setFocusIdx]
  );

  const copyBlock = useCallback(
    (idx: string) => {
      let nextFocusIdx: string;
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
      change(parentIdx, parent);
      nextFocusIdx = `${parentIdx}.children.[${index}]`;

      setFocusIdx(nextFocusIdx);
    },
    [change, getState, setFocusIdx]
  );

  const removeBlock = useCallback(
    (idx: string) => {
      let nextFocusIdx: string;
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
      if (blockIndex !== parent.children.length - 1) {
        nextFocusIdx = idx;
      } else {
        nextFocusIdx = parentIdx;
      }

      parent.children.splice(blockIndex, 1);
      change(parentIdx, parent);
      setFocusIdx(nextFocusIdx);
    },
    [change, getState, setFocusIdx]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setValueByIdx = useCallback(
    debounce(<T extends IBlockData>(idx: string, newVal: T) => {
      change(idx, {
        ...newVal,
      });
    }),
    [change]
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
    change,
    focusBlock,
    setFocusBlock,
    setFocusBlockValue,
    setValueByIdx,
    addBlock,
    moveBlock,
    copyBlock,
    removeBlock,
    isExistBlock,
    redo,
    undo,
    reset,
    redoable,
    undoable,
  };
}
