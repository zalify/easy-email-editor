import { BlocksMap } from 'easy-email-editor';
import { ProductRecommendation } from './ProductRecommendation';
import { Example } from './ProductRecommendation/Example';

BlocksMap.registerBlocks({ ProductRecommendation: ProductRecommendation });

export const customBlocks = {
  title: 'Custom',
  name: 'Custom',
  blocks: [
    {
      title: ProductRecommendation.name,
      description: 'An custom block',
      ExampleComponent: Example
    },
  ]
};