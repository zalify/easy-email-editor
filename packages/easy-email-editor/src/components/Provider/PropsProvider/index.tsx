import { IBlockData, IPage } from 'easy-email-core';
import React, { useMemo } from 'react';
export interface CollectedBlock {
  label: string;
  helpText: string;
  thumbnail: string;
  data: IBlockData;
  id: string;
}

export interface BlockGroup {
  title: string;
  blocks: Array<CollectedBlock>;
}

export interface PropsProviderProps {
  height: string;
  fontList?: { value: string; label: string; }[];
  onAddCollection?: (payload: CollectedBlock) => void;
  onRemoveCollection?: (payload: { id: string; }) => void;
  onUploadImage?: (data: Blob) => Promise<string>;
  interactiveStyle?: {
    hoverColor?: string;
    selectedColor?: string;
    dragoverColor?: string;
    tangentColor?: string;
  };
  autoComplete?: boolean;
  dashed?: boolean;
  mergeTags?: { [key: string]: any; };
  onBeforePreview?: (
    data: IPage,
    mergeTags: PropsProviderProps['mergeTags']
  ) => IPage;
}

export const EditorPropsContext = React.createContext<PropsProviderProps>({
  height: '100vh',
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
