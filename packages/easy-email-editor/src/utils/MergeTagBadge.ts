export class MergeTagBadge {
  static transform(content: string, id?: string) {
    return decodeURIComponent(content).replace(/{{([\s\S]+?)}}/g, (_, $1) => {
      return `<span class="easy-email-merge-tag" contenteditable="false"${
        id ? ` id=${id}` : ''
      }>${$1}</span>`;
    });
  }

  static revert(content: string, generateMergeTag: (s: string) => string) {
    const container = document.createElement('div');
    container.innerHTML = content;
    container.querySelectorAll('.easy-email-merge-tag').forEach((item) => {
      item.parentNode?.replaceChild(
        document.createTextNode(generateMergeTag(item.innerHTML)),
        item
      );
    });

    return container.textContent;
  }
}
