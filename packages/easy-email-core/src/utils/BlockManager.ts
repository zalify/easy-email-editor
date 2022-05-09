import { IBlock, IBlockData } from '@core/typings';
import { standardBlocks, advancedBlocks } from '@core/blocks';

export class BlockManager {
  private static blocksMap: Record<string, IBlock> = {
    ...standardBlocks,
    ...advancedBlocks,
  };
  private static autoCompletePath: { [key: string]: Array<string[]> } = {};

  private static setAutoCompletePath() {
    const paths: { [key: string]: Array<string[]> } = {};

    const renderFullPath = (
      type: string,
      pathObj: Array<string[]>,
      prevPaths: string[]
    ): any => {
      const block = this.getBlockByType(type);
      if (!block) {
        throw new Error(`Can you register ${type} block`);
      }
      const currentPaths = [...prevPaths, type];
      if (block.validParentType.length === 0) {
        pathObj.push(currentPaths);
      }
      return block.validParentType.map((item) => {
        return renderFullPath(item, pathObj, currentPaths);
      });
    };

    Object.values(this.blocksMap).forEach((item) => {
      paths[item.type] = [];
      renderFullPath(item.type, paths[item.type], []);
    });
    return paths;
  }

  public static getBlocks(): Array<IBlock> {
    return Object.values(this.blocksMap);
  }

  public static registerBlocks(blocksMap: { [key: string]: IBlock }) {
    this.blocksMap = {
      ...this.blocksMap,
      ...blocksMap,
    };
    this.autoCompletePath = this.setAutoCompletePath();
  }

  public static getBlockByType<T extends IBlockData>(
    type: string
  ): IBlock<T> | undefined {
    return this.blocksMap[type] as IBlock<any> as IBlock<T>;
  }

  public static getBlocksByType(
    types: Array<string>
  ): Array<IBlock | undefined> {
    return types.map((item) => {
      const block = Object.values(this.blocksMap).find((child) => {
        return child.type === item;
      });

      return block;
    });
  }

  public static getAutoCompleteFullPath() {
    if (Object.keys(this.autoCompletePath).length === 0) {
      this.autoCompletePath = this.setAutoCompletePath();
    }
    return this.autoCompletePath;
  }

  static getAutoCompletePath(
    type: string,
    targetType: string
  ): Array<string> | null {
    const block = this.getBlockByType(type);
    if (!block) {
      throw new Error(`Can you register ${type} block`);
    }
    if (block.validParentType.includes(targetType)) {
      return [];
    }
    const paths = this.getAutoCompleteFullPath()[type as any].find((item) =>
      item.filter((_, index) => index !== 0).includes(targetType)
    );

    if (!paths) return null;
    const findIndex = paths.findIndex((item) => item === targetType);
    return paths.slice(1, findIndex);
  }
}
