import { IPage } from '@/components/core/blocks/basic/Page';
import { BlockType } from '@/constants';

export interface IBlock<T extends IBlockData = IBlockData> {
  name: string;
  type: BlockType | string;
  Panel: () => React.ReactNode;
  createInstance: (payload?: RecursivePartial<T>) => T;
  validParentType: BlockType[];
  transform?: (data: IBlockData, idx?: string) => IBlockData;
}

export interface IBlockData<
  K extends { [key: string]: any; } = any,
  T extends any = any
  > {
  type: BlockType;
  data: {
    value: T;
    hidden?: boolean;
    shadow?: boolean; // Child nodes cannot be selected
  };
  attributes: K;
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
  [P in keyof T]?:
  T[P] extends (infer U)[] ? RecursivePartial<U>[] :
  T[P] extends object ? RecursivePartial<T[P]> :
  T[P];
};