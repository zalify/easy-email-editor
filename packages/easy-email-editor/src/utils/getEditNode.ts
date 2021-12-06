export function getEditNode(node: HTMLElement): null | HTMLElement {
  if (!node.classList) return null;
  if (node.classList.contains('node-type-text')) {
    return node.querySelector('[contenteditable="true"]') || node.querySelector('div');
  }
  if (node.classList.contains('node-type-button')) {
    return node.querySelector('a') || node.querySelector('p');
  }
  return null;
}

export function getEditContent(node: HTMLElement) {
  if (node.classList.contains('node-type-text')) {
    return getEditNode(node)?.innerHTML || '';
  }
  if (node.classList.contains('node-type-button')) {
    return getEditNode(node)?.innerText || '';
  }
  return '';
}
