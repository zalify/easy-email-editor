import { getEditorRoot } from './getEditorRoot';

export const getShadowRoot = () => getEditorRoot()?.shadowRoot as ShadowRoot;