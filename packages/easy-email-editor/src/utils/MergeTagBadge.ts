import { getShadowRoot } from '@/utils/getShadowRoot';

export class MergeTagBadge {

  static removeAllActiveBadge() {

    getShadowRoot().querySelectorAll('.easy-email-merge-tag').forEach(item => {
      item.classList.remove('easy-email-merge-tag-focus');
    });
  }

  static init() {

    getShadowRoot().addEventListener('click', (e) => {
      this.removeAllActiveBadge();
      const target = e.target;
      if (
        target instanceof HTMLElement &&
        target.classList.contains('easy-email-merge-tag')
      ) {

        target.classList.add('easy-email-merge-tag-focus');

        const next = target.nextSibling;
        const range = document.createRange();
        if (next) {
          range.setStart(next, 0);
          range.collapse(false);
        } else {
          if (!target.parentNode) return;
          range.selectNodeContents(target.parentNode);
          range.collapse(false);
        }
        const selection = (getShadowRoot() as any).getSelection();
        if (!selection) return;
        selection.removeAllRanges();
        selection.addRange(range);

      }
    });
  }

  static transform(content: string) {
    return decodeURIComponent(content).replace(/{{([\s\S]+?)}}/g, (_, $1) => {
      return `<div class="easy-email-merge-tag" contenteditable="false">${$1}</div>`;
    });
  }

  static revert(content: string, generateMergeTag: (s: string) => string) {
    return decodeURIComponent(content).replace(
      /<div\sclass\="easy-email-merge-tag"\scontenteditable="false">(.*?)<\/div>/g,
      (_, $1) => {
        return generateMergeTag($1);
      }
    );
  }
}
