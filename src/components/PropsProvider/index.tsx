import { IBlockData } from '@/typings';
import React from 'react';

export interface CollectedBlock {
  label: string;
  helpText?: string;
  icon?: React.ReactElement;
  data: IBlockData;
  id: string;
}

export interface BlockGroup {
  title: string;
  blocks: Array<CollectedBlock>;
}

export interface PropsProviderProps {
  extraBlocks?: BlockGroup[];
  onAddCollection?: (payload: CollectedBlock) => void;
  onRemoveCollection?: (payload: { id: string; }) => void;
  onUploadImage?: (data: Blob) => Promise<string>;
}

export const EditorPropsContext = React.createContext<PropsProviderProps>({
  extraBlocks: [],
  onAddCollection: undefined,
  onRemoveCollection: undefined,
  onUploadImage: undefined
});

export const PropsProvider: React.FC<PropsProviderProps> = (props) => {

  return (
    <EditorPropsContext.Provider value={props}>
      {props.children}
    </EditorPropsContext.Provider>
  );
};