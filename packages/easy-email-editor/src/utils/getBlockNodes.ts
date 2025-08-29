import { getIframeDocument } from './getIframeDocument';

export const getBlockNodes = () =>
  Array.from(getIframeDocument()?.querySelectorAll('.email-block') || []);
