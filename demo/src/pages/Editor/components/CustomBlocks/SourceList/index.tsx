import {
  BasicType,
  BlockManager,
  ISection,
  IGroup,
  IColumn,
} from 'easy-email-core';
import { CustomBlocksType } from '../constants';
import { generateListBlock } from './generateListBlock';

const wrapperBlock = BlockManager.getBlockByType<ISection>(BasicType.WRAPPER);
const sectionBlock = BlockManager.getBlockByType<ISection>(BasicType.SECTION);
const groupBlock = BlockManager.getBlockByType<IGroup>(BasicType.GROUP);
const columnBlock = BlockManager.getBlockByType<IColumn>(BasicType.COLUMN);

const ListWrapper = generateListBlock({
  name: 'List Wrapper',
  type: CustomBlocksType.LIST_WRAPPER,
  validParentType: [BasicType.PAGE],
  dataSourceTag: '$LIST_WRAPPER',
});
wrapperBlock.validParentType.push(CustomBlocksType.LIST_WRAPPER);

////////////////////////

const ListSection = generateListBlock({
  name: 'List Section',
  type: CustomBlocksType.LIST_SECTION,
  validParentType: [BasicType.WRAPPER],
  dataSourceTag: '$LIST_SECTION',
});
sectionBlock.validParentType.push(CustomBlocksType.LIST_SECTION);

////////////////////////

const ListGroup = generateListBlock({
  name: 'List Group',
  type: CustomBlocksType.LIST_GROUP,
  validParentType: [BasicType.SECTION],
  dataSourceTag: '$LIST_GROUP',
});
groupBlock.validParentType.push(CustomBlocksType.LIST_GROUP);
////////////////////////

const ListColumn = generateListBlock({
  name: 'List Column',
  type: CustomBlocksType.LIST_COLUMN,
  validParentType: [BasicType.GROUP, BasicType.SECTION],
  dataSourceTag: '$LIST_COLUMN',
});

columnBlock.validParentType.push(CustomBlocksType.LIST_COLUMN);

////////////////////////

export { ListWrapper, ListSection, ListGroup, ListColumn };
