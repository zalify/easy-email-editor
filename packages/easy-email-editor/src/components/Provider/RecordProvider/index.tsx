import { IEmailTemplate } from '@/typings';
import { useForm, useFormState } from 'react-final-form';
import { cloneDeep, isEqual } from 'lodash';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRefState } from '@/hooks/useRefState';

const MAX_RECORD_SIZE = 50;
const RECORD_DEBOUNCE_TIME = 30;

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
  const dataRef = useRef<Array<IEmailTemplate>>(data);

  const statusRef = useRef<RecordStatus>(undefined);
  const currentData = useRef<IEmailTemplate>();
  const pendingValuesRef = useRef<IEmailTemplate | null>(null);
  const pendingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (index >= 0 && data.length > 0) {
    currentData.current = data[index];
  }

  const form = useForm();

  const addRecord = useCallback((values: IEmailTemplate) => {
    const currentItem = currentData.current;

    const isChanged = !(
      currentItem &&
      isEqual(values.content, currentItem.content) &&
      values.subTitle === currentItem.subTitle &&
      values.subTitle === currentItem.subTitle
    );

    if (!isChanged) return null;

    const nextRecord = cloneDeep(values);
    currentData.current = nextRecord;
    statusRef.current = 'add';

    const list = dataRef.current.slice(0, indexRef.current + 1);
    const newData = [...list, nextRecord].slice(-MAX_RECORD_SIZE);
    const nextIndex = Math.min(indexRef.current + 1, MAX_RECORD_SIZE - 1);

    dataRef.current = newData;
    setData(newData);
    setIndex(nextIndex);
    return {
      records: newData,
      index: nextIndex,
    };
  }, [indexRef]);

  const flushPendingRecord = useCallback(() => {
    if (pendingTimerRef.current) {
      clearTimeout(pendingTimerRef.current);
      pendingTimerRef.current = null;
    }

    if (!pendingValuesRef.current) return null;

    const pendingValues = pendingValuesRef.current;
    pendingValuesRef.current = null;
    return addRecord(pendingValues);
  }, [addRecord]);

  const value = useMemo(() => {
    return {
      records: data,
      redo: () => {
        const snapshot = flushPendingRecord();
        const records = snapshot?.records || dataRef.current;
        const currentIndex = snapshot?.index ?? indexRef.current;
        const nextIndex = Math.min(MAX_RECORD_SIZE - 1, currentIndex + 1, records.length - 1);
        statusRef.current = 'redo';
        setIndex(nextIndex);
        form.reset(records[nextIndex]);
      },
      undo: () => {
        const snapshot = flushPendingRecord();
        const records = snapshot?.records || dataRef.current;
        const currentIndex = snapshot?.index ?? indexRef.current;
        const prevIndex = Math.max(0, currentIndex - 1);
        statusRef.current = 'undo';
        setIndex(prevIndex);
        form.reset(records[prevIndex]);
      },
      reset: () => {
        form.reset();
      },
      undoable: index > 0,
      redoable: index < data.length - 1,
    };
  }, [data, flushPendingRecord, form, index, indexRef]);

  useEffect(() => {
    if (statusRef.current === 'redo' || statusRef.current === 'undo') {
      statusRef.current = undefined;
      return;
    }

    pendingValuesRef.current = formState.values;

    if (pendingTimerRef.current) {
      clearTimeout(pendingTimerRef.current);
    }

    pendingTimerRef.current = setTimeout(() => {
      flushPendingRecord();
    }, RECORD_DEBOUNCE_TIME);

    return () => {
      if (pendingTimerRef.current) {
        clearTimeout(pendingTimerRef.current);
      }
    };
  }, [flushPendingRecord, formState.values]);

  return <RecordContext.Provider value={value}>{props.children}</RecordContext.Provider>;
};
