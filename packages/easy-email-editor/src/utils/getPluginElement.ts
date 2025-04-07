import { PLUGINS_CONTAINER_ID } from './../constants';
import { getIframeDocument } from '@/utils/getIframeDocument';

export const getPluginElement = () =>
  getIframeDocument()?.getElementById(PLUGINS_CONTAINER_ID);
