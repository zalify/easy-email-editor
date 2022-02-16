import { IPage } from '@core/blocks';
import { ReactElement } from 'react';

export interface IBlock<T extends IBlockData = IBlockData> {
  name: string;
  type: string;
  create: (payload?: RecursivePartial<T>) => T;
  validParentType: string[];
  render?: (
    data: T,
    idx: string | null,
    mode: 'testing' | 'production',
    context?: IPage,
    dataSource?: { [key: string]: any; }
  ) => IBlockData | ReactElement | null;
}

export interface IBlockData<
  K extends { [key: string]: any; } = any,
  T extends { [key: string]: any; } = any
  > {
  title?: string;
  type: string;
  data: {
    value: T;
    hidden?: boolean | string;
  };
  attributes: K & { 'css-class'?: string; };
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
