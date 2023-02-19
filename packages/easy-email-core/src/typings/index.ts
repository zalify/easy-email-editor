import { IPage } from '@core/blocks';

export interface IBlock<T extends IBlockData = IBlockData> {
  name: string;
  type: string;
  create: (payload?: RecursivePartial<T>) => T;
  validParentType: string[];
  render: (params: {
    data: T;
    idx?: string | null;
    mode: 'testing' | 'production';
    context?: IPage;
    dataSource?: { [key: string]: any };
    children?: React.ReactNode;
    keepClassName?: boolean;
    renderPortal?: (
      props: Omit<Parameters<IBlock<T>['render']>[0], 'renderPortal'> & {
        refEle: HTMLElement;
      }
    ) => React.ReactNode;
  }) => React.ReactNode;
}

export interface IBlockData<
  Attr extends Record<string, string> = any,
  Data extends { [key: string]: any } = any
> {
  title?: string;
  type: string;
  data: {
    value: Data;
    hidden?: boolean | string;
  };
  attributes: Attr & { 'css-class'?: string };
  children: IBlockData[];
}

export interface create<T extends any = any> {
  (payload?: RecursivePartial<T>): T;
}

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};
