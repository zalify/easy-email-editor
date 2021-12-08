import { IBlockData } from 'easy-email-core';

export interface BlockMarketCategory {
  name: string;
  title: string;
  blocks: {
    type: string;
    title: string;
    description?: React.ReactNode;
    thumbnail?: string;
    payload?: IBlockData;
    component: () => JSX.Element | null;
  }[];
}

export class BlockMarketManager {
  private static category: BlockMarketCategory[] = [];
  private static subscriptHandles: Array<(category: BlockMarketCategory[]) => void> = [];

  public static subscribe(fn: (category: BlockMarketCategory[]) => void) {
    return this.subscriptHandles.push(fn);
  }

  public static unsubscribe(fn: (category: BlockMarketCategory[]) => void) {
    return this.subscriptHandles = this.subscriptHandles.filter(item => item === fn);
  }

  public static notify() {
    this.subscriptHandles.forEach(fn => fn(this.category));
  }

  public static getCategory(name: string) {
    return this.category.find((item) => item.name === name);
  }

  public static getCategories() {
    return this.category;
  }

  public static addCategories(list: BlockMarketCategory[]) {
    list.forEach(item => {
      const index = this.category.findIndex((c) => c.name === item.name);
      if (index !== -1) {
        this.category.splice(index, 1);
      }

      this.category.push(item);
    });
    this.notify();
  }

  public static addCategory(
    name: string,
    title: string,
    blocks: {
      type: string;
      title: string;
      description?: React.ReactNode;
      component: () => JSX.Element | null;
    }[]
  ) {
    const index = this.category.findIndex((item) => item.name === name);
    if (index !== -1) {
      this.category.splice(index, 1);
    }

    this.category.push({
      name,
      title,
      blocks,
    });

    this.notify();
  }

  public static removeCategories(list: BlockMarketCategory[]) {
    list.forEach(item => {
      this.category = this.category.filter((c) => c.name !== item.name);
    });
    this.notify();
  }

  public static removeCategory(name: string) {
    this.category = this.category.filter((item) => item.name !== name);
    this.notify();
  }
}
