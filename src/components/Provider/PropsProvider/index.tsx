import { IBlockData } from '@/typings';
import React from 'react';

export interface CollectedBlock {
  label: string;
  helpText?: string;
  thumbnail?: string;
  icon?: React.ReactElement;
  data: IBlockData;
  id?: string;
}

export interface BlockGroup {
  title: string;
  blocks: Array<CollectedBlock>;
}

export interface PropsProviderProps {
  extraBlocks?: BlockGroup[];
  fontList?: { value: string; label: string }[];
  onAddCollection?: (payload: CollectedBlock) => void;
  onRemoveCollection?: (payload: { id: string }) => void;
  onUploadImage?: (data: Blob) => Promise<string>;
  interactiveStyle?: {
    hoverColor?: string;
    selectedColor?: string;
    dragoverColor?: string;
    tangentColor?: string;
  };
  autoComplete?: boolean;
}

export const EditorPropsContext = React.createContext<PropsProviderProps>({
  extraBlocks: [],
  fontList: [],
  onAddCollection: undefined,
  onRemoveCollection: undefined,
  onUploadImage: undefined,
  autoComplete: false,
});

export const PropsProvider: React.FC<PropsProviderProps> = (props) => {
  return (
    <EditorPropsContext.Provider value={props}>
      {props.children}
    </EditorPropsContext.Provider>
  );
};
