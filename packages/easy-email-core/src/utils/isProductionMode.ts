import { IBlockData } from '@core/typings';

export interface JsonToMjmlOptionProduction {
  idx?: string | null; // current idx, default page idx
  data: IBlockData;
  context?: IBlockData;
  mode: 'production';
  keepClassName?: boolean;
  dataSource?: { [key: string]: any };
  beautify?: boolean;
}

export interface JsonToMjmlOptionDev {
  data: IBlockData;
  idx: string | null; // current idx
  context?: IBlockData;
  dataSource?: { [key: string]: any };
  mode: 'testing';
  beautify?: boolean;
}

export type JsonToMjmlOption = JsonToMjmlOptionDev | JsonToMjmlOptionProduction;

export const isProductionMode = (
  option: JsonToMjmlOption
): option is JsonToMjmlOptionProduction => option.mode === 'production';
