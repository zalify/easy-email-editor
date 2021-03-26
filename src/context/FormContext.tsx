import { IForm } from '@/components/core/blocks/form/Form';
import React from 'react';

export const FormContext = React.createContext<IForm['data']['value']>({ uid: '', name: '' });

export interface FormProvierProps {
  children: React.ReactNode;
  value: IForm['data']['value'];
}

export function FormProvier(props: FormProvierProps) {
  return (
    <FormContext.Provider value={props.value}>
      {props.children}
    </FormContext.Provider>
  );
}