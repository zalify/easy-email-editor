export class MergeTagBadge {
  static transform(content: string, id?: string) {
    const data = content.replace(/{{([\s\S]+?)}}/g, (_, $1) => {
      const input = document.createElement('input');
      input.className = 'easy-email-merge-tag';
      input.value = $1;
      input.type = 'button';
      if (id) {
        input.id = id;
      }

      return input.outerHTML;
    });
    return data;
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
