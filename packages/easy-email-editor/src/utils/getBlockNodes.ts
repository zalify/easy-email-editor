import { getShadowRoot } from './getShadowRoot';

export const getBlockNodes = () =>
  Array.from(getShadowRoot()?.querySelectorAll('.email-block') || []);