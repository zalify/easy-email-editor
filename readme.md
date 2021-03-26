## 声明

> 主要的面向对象是开发者。

> 解决的场景是 定义好一套组件好，可以通过拖拽生成页面，达到快速开发的效果

## 项目演示地址
- [https://h5.maocanhua.cn/](https://h5.maocanhua.cn/)
- 手机扫码预览效果

  <div>
    <img src="https://assets.maocanhua.cn/Fnl2iogm4UY_YRsDjZKBdNTIutGx" width="200" style="width:200px">
    <img src="https://assets.maocanhua.cn/FmTik5Ha55ax21-b6jOLhwj6LP_I" width="200" style="width:200px">
  </div>


## 部分截图
 - ![图片1](https://assets.maocanhua.cn/FrsE2_5Dksv3YtOWdaiqv-bZcBaR)
 - ![图片1](https://assets.maocanhua.cn/Fnxhu6BPrkHYLFJgWQEJg1MmPCXv)
 - ![图片1](https://assets.maocanhua.cn/FvpQ6deo5tp946YBX3QMT3aOiSeZ)


## 项目结构
核心功能均在src目录，example目录只是作为一个使用示例

### 结构

![图片1](https://assets.maocanhua.cn/Fg5xzyOg1N0fwWaHNj5Z33CZkDHE)

```ts
data === Array<Page>

export type IPage = IBlockData<{
  title: string;
}>;

export const Page: IBlock<IPage> = {
  name: '页面',
  type: BasicType.PAGE,
  Editor,
  Renderer,
  Panel,
  createInstance,
  validChildrenType: []
};

export interface IBlockData<T extends any = any> {
  style: Partial<React.CSSProperties>;
  type: BlockType;
  data: {
    value: T;
    link?: string;
    action?: string;
    variable?: string;
  };
  children: IBlockData<any>[];
}

```

