import { IBlock } from '@core/typings';
import { BlockManager } from '@core/utils';
import React from 'react';

type BlockDataItem = Parameters<IBlock['render']>[0];

export const BlockRenderer = (props: BlockDataItem) => {
  const { data, mode } = props;
  const block = BlockManager.getBlockByType(data.type);
  if (!block) return null;
  return <>{block.render(props)}</>;
};

// const BlockEditRenderer = (props: BlockDataItem) => {
//   const [refEle, setRefEle] = useState<HTMLElement | null>(null);
//   const { data, renderPortal, ...rest } = props;
//   const block = BlockManager.getBlockByType(data.type);

//   const onCallbackBlockNode = (node: HTMLElement) => {

//     if (!node) return;
//     if (node instanceof HTMLElement) {
//       if (node.classList.contains(getNodeTypeClassName(data.type))) {
//         setRefEle(node);
//       } else {
//         const ele = node.querySelector(`.${getNodeTypeClassName(data.type)}`) as HTMLElement;
//         setRefEle(ele);
//       }

//     }

//   };

//   if (!block) return null;
//   const reactBlock = block.render(props);
//   if (!reactBlock) return null;
//   return (
//     <>
//       {
//         createElement(reactBlock.type, {
//           ...reactBlock.props,
//           ref: onCallbackBlockNode,
//         })
//       }
//       {
//         refEle && renderPortal && createPortal(<>{renderPortal({ ...rest, data, refEle })}</>, refEle)
//       }
//     </>
//   );
// };
