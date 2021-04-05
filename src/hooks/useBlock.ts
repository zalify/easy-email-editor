import { BlockType, BasicType } from '../constants';
import { cloneDeep, get, set } from 'lodash';
import { IBlockData, RecursivePartial } from '../typings';
import { getBlockByType } from '../components/core/blocks';
import { useCallback } from 'react';
import { message } from 'antd';
import {
  getIndexByIdx,
  getParentIdx,
  getValueByIdx,
} from '@/utils/block';
import { createBlockItem } from '@/utils/createBlockItem';
import { useEditorContext } from './useEditorContext';

export function useBlock() {
  const {
    values,
    setValues,
    getFieldHelpers,
    setFormikState,
    handleChange,
  } = useEditorContext();

  const { focusIdx, hoverIdx } = values;
  const focusBlock = get(values, focusIdx) as IBlockData | null;

  const addBlock = useCallback(
    (params: {
      type: BlockType;
      parentIdx: string;
      positionIndex?: number;
      payload?: RecursivePartial<IBlockData>;
    }) => {
      let { type, parentIdx, positionIndex, payload } = params;

      setFormikState((formState) => {
        let parent = get(formState.values, parentIdx) as IBlockData | null;
        if (!parent) {
          throw new Error('Invalid block');
        }

        let child = createBlockItem(type, payload);

        if (typeof positionIndex === 'undefined') {
          positionIndex = parent.children.length;
        }
        let focusIdx = `${parentIdx}.children.[${positionIndex}]`;
        const block = getBlockByType(type);
        const parentBlock = getBlockByType(parent.type);

        if ([
          BasicType.TEXT,
          BasicType.IMAGE,
          BasicType.SPACER,
          BasicType.DIVIDER,
          BasicType.COLUMN,
          BasicType.GROUP,
          BasicType.BUTTON
        ].includes(block.type)) {

          if (parentBlock.type === BasicType.SECTION) {
            child = createBlockItem(BasicType.COLUMN, {
              children: [child]
            });
            focusIdx += '.children.[0]';
          } else if (parentBlock.type === BasicType.PAGE) {
            child = createBlockItem(BasicType.SECTION, {
              children: [
                createBlockItem(BasicType.COLUMN, {
                  children: [child]
                })
              ]
            });
            focusIdx += '.children.[0].children.[0]';
          }

        }

        console.log('focusIdx', focusIdx);

        if (!parentBlock.validChildrenType.includes(child.type)) {
          message.warning(`${block.name} can not insert to ${parentBlock.name}`);
          return formState;
        }

        parent.children.splice(positionIndex!, 0, child);
        set(formState.values, parentIdx, { ...parent });
        formState.values.focusIdx = focusIdx;

        return { ...formState };
      });
    },
    [setFormikState]
  );

  const copyBlock = useCallback(
    (idx: string) => {
      setFormikState((formState) => {
        const parentIdx = getParentIdx(idx);
        const parent = get(formState.values, getParentIdx(idx) || '');
        if (!parent) {
          throw new Error('未找到插入的父节点');
        }
        const copyBlock = cloneDeep(get(formState.values, idx));

        parent.children.push(copyBlock);
        formState.values.focusIdx = `${parentIdx}.children.[${parent.children.length - 1
          }]`;
        return { ...formState };
      });
    },
    [setFormikState]
  );

  const removeBlock = useCallback(
    (idx: string) => {
      setFormikState((formState) => {
        const block = getValueByIdx(values, idx);
        if (!block) {
          throw new Error('Invalid block');
        }
        const parentIdx = getParentIdx(idx);
        const parent = get(
          formState.values,
          getParentIdx(idx) || ''
        ) as IBlockData | null;
        const blockIndex = getIndexByIdx(idx);
        if (!parentIdx || !parent) {
          if (block.type === BasicType.PAGE) {
            message.warning('Page node can not remove');
            return formState;
          }
          throw new Error('Invalid block');
        }

        parent.children.splice(blockIndex, 1);
        set(values, parentIdx, { ...parent });
        values.focusIdx = parentIdx;
        return { ...formState };
      });
    },
    [setFormikState, values]
  );

  const setValueByIdx = useCallback(
    <T extends any>(idx: string, newVal: IBlockData<T>) => {
      getFieldHelpers(idx).setValue(newVal);
    },
    [getFieldHelpers]
  );

  const moveByIdx = useCallback(
    (sourceIdx: string, destinationIdx: string) => {
      setFormikState((formState) => {
        const sourceIndex = getIndexByIdx(sourceIdx);
        const destinationIndex = getIndexByIdx(destinationIdx);

        const sourceParentIdx = getParentIdx(sourceIdx);
        const destinationParentIdx = getParentIdx(destinationIdx);

        if (!sourceParentIdx || !destinationParentIdx) {
          message.warning('Something error');
          return formState;
        }

        const sourceParent = get(
          formState.values,
          sourceParentIdx
        ) as IBlockData;

        const destinationParent = get(
          formState.values,
          sourceParentIdx
        ) as IBlockData;

        if (destinationIndex >= destinationParent.children.length) {
          return formState;
        }

        const [removed] = sourceParent.children.splice(Number(sourceIndex), 1);
        destinationParent.children.splice(Number(destinationIndex), 0, removed);

        set(formState.values, sourceParentIdx, sourceParent);
        set(formState.values, destinationParentIdx, destinationParent);
        set(formState.values, 'focusIdx', destinationIdx);
        return { ...formState };
      });
    },
    [setFormikState]
  );

  const isExistBlock = useCallback(
    (idx: string) => {
      return Boolean(get(values, idx));
    },
    [values]
  );

  const setFocusIdx = useCallback(
    (idx: string) => {
      setFormikState((formState) => {
        if (formState.values.focusIdx === idx) {
          return formState;
        }
        formState.values.focusIdx = idx;
        return { ...formState };
      });
    },
    [setFormikState]
  );

  const setHoverIdx = useCallback(
    (idx: string) => {
      setFormikState((formState) => {
        if (formState.values.hoverIdx === idx) {
          return formState;
        }
        formState.values.hoverIdx = idx;
        return { ...formState };
      });
    },
    [setFormikState]
  );

  const setFocusBlockValue = useCallback(
    (val) => {
      setFormikState((formState) => {
        if (!focusBlock) return formState;
        focusBlock.data.value = val;
        set(formState, focusIdx, focusBlock);
        return { ...formState };
      });
    },
    [focusBlock, focusIdx, setFormikState]
  );

  return {
    values,
    focusIdx,
    focusBlock,
    hoverIdx,
    setFocusBlockValue,
    setValueByIdx,
    setHoverIdx,
    addBlock,
    copyBlock,
    removeBlock,
    setFocusIdx,
    moveByIdx,
    isExistBlock,
    setFormikState,
    setValues,
    handleChange,
  };
}
