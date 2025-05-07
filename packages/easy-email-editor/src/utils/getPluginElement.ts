import { PLUGINS_CONTAINER_ID } from './../constants';
import { getEditorRoot } from './getEditorRoot';

export const getPluginElement = () =>
  getEditorRoot()?.shadowRoot?.getElementById(PLUGINS_CONTAINER_ID);
