import { IBlockData, BlockManager, getParentIdx } from 'easy-email-core';
import { get, cloneDeep } from 'lodash';

export function getContextMergeTags(
  mergeTags: { [key: string]: any },
  context: { [key: string]: any },
  idx: string
) {
  const loop = (
    currentIdx: string,
    combineMergeTags: { [key: string]: any }
  ): { [key: string]: any } => {
    const parentBlockData = get(context, currentIdx) as IBlockData | undefined;
    if (!parentBlockData) return combineMergeTags;
    const parentBlock = BlockManager.getBlockByType(parentBlockData.type);

    //  if is custom block
    if (parentBlock && parentBlock.render) {
      const dataSource = parentBlockData.data?.value?.dataSource;
      if (!dataSource) return combineMergeTags;

      Object.keys(dataSource).forEach((key) => {
        let formatKey: string = dataSource[key];

        const loopFormatKey = (currentLoopKeyIdx: string) => {
          const currentParentIdx = getParentIdx(currentLoopKeyIdx);
          if (currentParentIdx) {
            const currentBlockData = get(
              context,
              currentParentIdx
            ) as IBlockData;

            if (!currentBlockData) return formatKey;
            currentBlockData.data.value.dataSource &&
              Object.keys(currentBlockData.data.value.dataSource).forEach(
                (item) => {
                  formatKey = formatKey.replace(
                    item,
                    currentBlockData.data.value.dataSource[item].replace(
                      /{{([^}}]+)}}/g,
                      '$1'
                    )
                  );
                }
              );

            loopFormatKey(currentParentIdx);
          }
        };
        loopFormatKey(currentIdx);

        const dataSourcePath = formatKey.replace(/{{([^}}]+)}}/g, '$1');
        combineMergeTags = {
          [key]: get(combineMergeTags, dataSourcePath),
          ...combineMergeTags,
        };
      });
    }
    const parentIdx = getParentIdx(currentIdx);
    if (!parentIdx) return combineMergeTags;
    return loop(parentIdx, combineMergeTags);
  };

  return loop(idx, cloneDeep(mergeTags));
}
