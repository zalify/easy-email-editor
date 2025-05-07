const transform = (text: string, id?: string) => {
  return text.replace(/{{([\s\S]+?)}}/g, (_, $1) => {
    const input = document.createElement('input');
    input.className = 'easy-email-merge-tag';
    input.value = $1;
    input.type = 'button';
    if (id) {
      input.id = id;
    }

    return input.outerHTML;
  });
};
export class MergeTagBadge {
  static transform(content: string, id?: string) {
    const loop = (node: ChildNode) => {
      if (node instanceof HTMLElement) {
        if (node.textContent === node.innerHTML) {
          node.innerHTML = transform(node.innerHTML, id);
        } else {
          [...node.childNodes].forEach(loop);
        }
      } else {
        if (node.nodeType === 3 && node.textContent) {
          const div = document.createElement('div');
          div.innerHTML = transform(node.textContent, id);
          node.replaceWith(...div.childNodes);
        }
      }

    };
    const container = document.createElement('div');
    container.innerHTML = content;

    [...container.childNodes].forEach(loop);
    return container.innerHTML;
  }

  static revert(content: string, generateMergeTag: (s: string) => string) {
    const container = document.createElement('div');
    container.innerHTML = content;
    container.querySelectorAll('.easy-email-merge-tag').forEach((item: any) => {
      item.parentNode?.replaceChild(
        document.createTextNode(generateMergeTag(item.value)),
        item
      );
    });

    return container.innerHTML;
  }
}
