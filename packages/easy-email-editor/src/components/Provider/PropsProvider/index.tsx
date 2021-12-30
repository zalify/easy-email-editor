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
  previewInjectData?: Record<string, any>;
  mergeTags?: { [key: string]: any };
  mergeTagGenerate?: (m: string) => string;
  renderMergeTagContent?: (props: {
    onChange: (val: string) => void;
    isSelect: boolean;
    value: string;
  }) => React.ReactNode;
  onBeforePreview?: (
    html: string,
    mergeTags: PropsProviderProps['mergeTags']
  ) => string;
}

export const EditorPropsContext = React.createContext<PropsProviderProps>({
  height: '100vh',
  fontList: [],
  onAddCollection: undefined,
  onRemoveCollection: undefined,
  onUploadImage: undefined,
  autoComplete: false,
  dashed: true,
  mergeTagGenerate: (m) => `{{${m}}}`,
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
