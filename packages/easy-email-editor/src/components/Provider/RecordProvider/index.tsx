import { IEmailTemplate } from '@/typings';
import { useForm, useFormState } from 'react-final-form';
import { cloneDeep, isEqual } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRefState } from '@/hooks/useRefState';

const MAX_RECORD_SIZE = 50;

export type RecordStatus = 'add' | 'redo' | 'undo' | undefined;

export const RecordContext = React.createContext<{
  records: Array<IEmailTemplate>;
  redo: () => void;
  undo: () => void;
  reset: () => void;
  redoable: boolean;
  undoable: boolean;
}>({
  records: [],
  redo: () => {},
  undo: () => {},
  reset: () => {},
  redoable: false,
  undoable: false,
});

export const RecordProvider: React.FC<{ children?: React.ReactNode }> = props => {
  const formState = useFormState<IEmailTemplate>();
  const [data, setData] = useState<Array<IEmailTemplate>>([]);
  const [index, setIndex] = useState(-1);
  const indexRef = useRefState(index);

  const statusRef = useRef<RecordStatus>(undefined);
  const currentData = useRef<IEmailTemplate>();

  if (index >= 0 && data.length > 0) {
    currentData.current = data[index];
  }

  const form = useForm();

  const value = useMemo(() => {
    return {
      records: data,
      redo: () => {
        const nextIndex = Math.min(MAX_RECORD_SIZE - 1, index + 1, data.length - 1);
        statusRef.current = 'redo';
        setIndex(nextIndex);
        form.reset(data[nextIndex]);
      },
      undo: () => {
        const prevIndex = Math.max(0, index - 1);
        statusRef.current = 'undo';
        setIndex(prevIndex);
        form.reset(data[prevIndex]);
      },
      reset: () => {
        form.reset();
      },
      undoable: index > 0,
      redoable: index < data.length - 1,
    };
  }, [data, form, index]);

  useEffect(() => {
    if (statusRef.current === 'redo' || statusRef.current === 'undo') {
      statusRef.current = undefined;
      return;
    }
    const currentItem = currentData.current;

    const isChanged = !(
      currentItem &&
      isEqual(formState.values.content, currentItem.content) &&
      formState.values.subTitle === currentItem.subTitle &&
      formState.values.subTitle === currentItem.subTitle
    );

    if (isChanged) {
      currentData.current = formState.values;
      statusRef.current = 'add';
      setData(oldData => {
        const list = oldData.slice(0, indexRef.current + 1);

        const newData = [...list, cloneDeep(formState.values)].slice(-MAX_RECORD_SIZE);

        return newData;
      });
      setIndex(Math.min(indexRef.current + 1, MAX_RECORD_SIZE - 1));
    }
  }, [formState, indexRef]);

  return <RecordContext.Provider value={value}>{props.children}</RecordContext.Provider>;
};
