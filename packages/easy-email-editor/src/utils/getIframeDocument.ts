import { getEditorRoot } from './getEditorRoot';

export const getIframeDocument = () => (<HTMLIFrameElement>document.getElementById('VisualEditorEditMode'))?.contentDocument;
