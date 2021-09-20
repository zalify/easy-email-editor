export type BlockType = BasicType;

// 基础组件
export enum BasicType {
  PAGE = 'page',
  SECTION = 'section',
  COLUMN = 'column',
  GROUP = 'group',
  TEXT = 'text',
  IMAGE = 'image',
  DIVIDER = 'divider',
  SPACER = 'spacer',
  BUTTON = 'button',
  WRAPPER = 'wrapper',
  RAW = 'raw',
  ACCORDION = 'accordion',
  ACCORDION_ELEMENT = 'accordion-element',
  ACCORDION_TITLE = 'accordion-title',
  ACCORDION_TEXT = 'accordion-text',
  HERO = 'hero',
  CAROUSEL = 'carousel',
  NAVBAR = 'navbar',
  SOCIAL = 'social',
  // TODO
  TABLE = 'table',
}

export const DRAG_HOVER_CLASSNAME = 'block-dragover';
export const BLOCK_SELECTED_CLASSNAME = 'block-selected';
export const BLOCK_HOVER_CLASSNAME = 'block-hover';
export const BLOCK_HIDDEN_CLASSNAME = 'block-hidden';

// spacial dom id
export const FIXED_CONTAINER_ID = 'FIXED_CONTAINER_ID';

export const styleZIndex = {
  SELECT_INDEX: 1,
  HOVER_INDEX: 1,
  DRAG_INDEX: 1,

  SELECT_BLOCK_TOOLTIP: 1,
  HOVER_BLOCK_TOOLTIP: 1,
  DRAG_BLOCK_TOOLTIP: 1,

  SELECT_BLOCK_CHILD: 2,
  HOVER_BLOCK_CHILD: 2,
  DRAG_BLOCK_CHILD: 2,
};