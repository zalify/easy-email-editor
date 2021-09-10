import { IBlockData } from '@/typings';
import React, { useMemo } from 'react';

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
  dashed?: boolean;
}

export const EditorPropsContext = React.createContext<PropsProviderProps>({
  extraBlocks: [],
  fontList: [],
  onAddCollection: undefined,
  onRemoveCollection: undefined,
  onUploadImage: undefined,
  autoComplete: false,
  dashed: true,
});

export const PropsProvider: React.FC<PropsProviderProps> = (props) => {
  const { dashed = true } = props;
  const formatProps = useMemo(() => {
    return {
      ...props,
      dashed,
    };
  }, [props, dashed]);

  return (
    <EditorPropsContext.Provider value={formatProps}>
      {props.children}
    </EditorPropsContext.Provider>
  );
};
