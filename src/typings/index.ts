import { IPage } from '@/components/core/blocks/basic/Page';
import { BlockType } from '@/constants';

export interface IBlock<T extends IBlockData = any> {
  name: string;
  type: BlockType;
  Panel: () => React.ReactNode;
  Editor: (props: any) => React.ReactNode;
  createInstance: (payload: RecursivePartial<T>) => T;
  validChildrenType: BlockType[];
}

export interface IBlockData<T extends any = any, K extends { [key: string]: any; } = any> {
  type: BlockType;
  data: {
    value: T;
    variable?: string;
  };
  attribute: K;
  children: IBlockData[];
}

export interface IEmailTemplate {
  content: IPage;
  subject: string;
  subTitle: string;
}

export interface CreateInstance<T extends any = any> {
  (payload?: RecursivePartial<T>): T;
}

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};
