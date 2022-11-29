import { PropsProviderProps } from '../components/Provider/PropsProvider';
export declare function useEditorProps<T extends PropsProviderProps>(): T & {
    mergeTagGenerate: NonNullable<PropsProviderProps['mergeTagGenerate']>;
};
