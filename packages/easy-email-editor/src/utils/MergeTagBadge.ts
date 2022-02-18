import { getShadowRoot } from '@/utils/getShadowRoot';

export class MergeTagBadge {
  static init() {
    getShadowRoot().addEventListener('click', (e) => {
      const target = e.target;
      if (
        target instanceof HTMLElement &&
        target.classList.contains('easy-email-merge-tag')
      ) {
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
      return `<input class='easy-email-merge-tag' disabled value='${$1}' />`;
    });
  }

  static revert(content: string, generateMergeTag: (s: string) => string) {
    return decodeURIComponent(content).replace(
      /<input\sclass\="easy-email-merge-tag"\sdisabled=""\svalue="(.*)?"[\/]{0,1}>/g,
      (_, $1) => {
        return generateMergeTag($1);
      }
    );
  }
}
