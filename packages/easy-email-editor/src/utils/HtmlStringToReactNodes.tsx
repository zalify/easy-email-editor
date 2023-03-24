import { BasicType, getNodeIdxFromClassName, getNodeTypeFromClassName, MERGE_TAG_CLASS_NAME } from 'easy-email-core';
import { camelCase } from 'lodash';
import React from 'react';
import { isTextBlock } from './isTextBlock';
import { MergeTagBadge } from './MergeTagBadge';
import { ContentEditableType, DATA_CONTENT_EDITABLE_IDX, DATA_CONTENT_EDITABLE_TYPE } from '@/constants';
import { isButtonBlock } from './isButtonBlock';
import { getContentEditableIdxFromClassName, getContentEditableTypeFromClassName } from './contenteditable';
import { getContentEditableClassName } from './getContentEditableClassName';
import { isNavbarBlock } from './isNavbarBlock';

const domParser = new DOMParser();

export function getChildSelector(selector: string, index: number) {
  return `${selector}-${index}`;
}

export interface HtmlStringToReactNodesOptions {
  enabledMergeTagsBadge: boolean;
}

export function HtmlStringToReactNodes(
  content: string,
  option: HtmlStringToReactNodesOptions
) {
  let doc = domParser.parseFromString(content, 'text/html'); // The average time is about 1.4 ms
  [...doc.getElementsByTagName('a')].forEach((node) => {
    node.setAttribute('tabIndex', '-1');
  });
  [...doc.querySelectorAll(`.${MERGE_TAG_CLASS_NAME}`)].forEach((child) => {
    const editNode = child.querySelector('div');
    if (editNode) {
      if (option.enabledMergeTagsBadge) {
        editNode.innerHTML = MergeTagBadge.transform(editNode.innerHTML);
      }
    }
  });

  const reactNode = (
    <RenderReactNode selector={'0'} node={doc.documentElement} index={0} />
  );

  return reactNode;
}

const RenderReactNode = React.memo(function ({
  node,
  index,
  selector,
}: {
  node: HTMLElement;
  index: number;
  selector: string;
}): React.ReactElement {
  const attributes: { [key: string]: string; } = {
    'data-selector': selector,
  };
  node.getAttributeNames?.().forEach((att) => {
    if (att) {
      attributes[att] = node.getAttribute(att) || '';
    }
  });

  if (node.nodeType === Node.COMMENT_NODE) return <></>;

  if (node.nodeType === Node.TEXT_NODE) {
    return <>{node.textContent}</>;
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    const tagName = node.tagName.toLowerCase();
    if (tagName === 'meta') return <></>;

    if (tagName === 'style') {
      return createElement(tagName, {
        key: index,
        ...attributes,
        dangerouslySetInnerHTML: { __html: node.textContent },
      });
    }

    const blockType = getNodeTypeFromClassName(node.classList);
    const idx = getNodeIdxFromClassName(node.classList);

    if (blockType) {
      if (idx) {
        makeStandardContentEditable(node, blockType, idx);
      }
      makeBlockNodeContentEditable(node);
    }

    if (attributes['contenteditable'] === 'true') {

      return createElement(tagName, {
        key: performance.now(),
        ...attributes,
        style: getStyle(node.getAttribute('style')),
        dangerouslySetInnerHTML: { __html: node.innerHTML },
      });
    }

    const reactNode = createElement(tagName, {
      key: index,
      ...attributes,
      style: getStyle(node.getAttribute('style')),
      children:
        node.childNodes.length === 0
          ? null
          : [...node.childNodes].map((n, i) => (
            <RenderReactNode
              selector={getChildSelector(selector, i)}
              key={i}
              node={n as any}
              index={i}
            />
          )),
    });

    return <>{reactNode}</>;
  }

  return <></>;
});

function getStyle(styleText: string | null) {
  if (!styleText) return undefined;
  return styleText.split(';').reduceRight((a: any, b: any) => {
    const arr = b.split(/\:(?!\/)/);
    if (arr.length < 2) return a;
    a[camelCase(arr[0])] = arr[1];
    return a;
  }, {});
}

function createElement(
  type: string,
  props?: React.ClassAttributes<Element> & {
    style?: {} | undefined;
    children?: JSX.Element[] | null;
    key: string | number;
    tabIndex?: string;
    class?: string;
    role?: string;
    src?: string;
    dangerouslySetInnerHTML?: any;
  }
) {
  if (props?.class && props.class.includes('email-block')) {
    const blockType = getNodeTypeFromClassName(props.class);
    if (![BasicType.TEXT].includes(blockType as any)) {
      props.role = 'tab';
      props.tabIndex = '0';
    }
    props.key = props.key + props.class;
  }

  return React.createElement(type, props);
}

function makeBlockNodeContentEditable(node: ChildNode) {
  if (!(node instanceof Element)) return;
  const type = getContentEditableTypeFromClassName(node.classList);
  const idx = getContentEditableIdxFromClassName(node.classList);

  if (isTextBlock(type)) {
    const editNode = node.querySelector('div');
    if (editNode) {
      editNode.setAttribute('contentEditable', 'true');
      editNode.setAttribute(DATA_CONTENT_EDITABLE_TYPE, ContentEditableType.RichText);
      editNode.setAttribute(DATA_CONTENT_EDITABLE_IDX, idx);
    }
  } else if (isButtonBlock(type)) {
    const editNode = node.querySelector('a') || node.querySelector('p');
    if (editNode) {
      editNode.setAttribute('contentEditable', 'true');
      editNode.setAttribute(DATA_CONTENT_EDITABLE_TYPE, ContentEditableType.Text);
      editNode.setAttribute(DATA_CONTENT_EDITABLE_IDX, idx);
    }
  } else if (isNavbarBlock(type)) {
    node.setAttribute('contentEditable', 'true');
    node.setAttribute(DATA_CONTENT_EDITABLE_TYPE, ContentEditableType.Text);
    node.setAttribute(DATA_CONTENT_EDITABLE_IDX, idx);

  }

  node.childNodes.forEach(makeBlockNodeContentEditable);

}

function makeStandardContentEditable(node: HTMLElement, blockType: string, idx: string) {
  if (isTextBlock(blockType) || isButtonBlock(blockType)) {
    node.classList.add(...getContentEditableClassName(blockType, `${idx}.data.value.content`));
  }
  if (isNavbarBlock(blockType)) {
    node.querySelectorAll('.mj-link').forEach((anchor, index) => {

      anchor.classList.add(...getContentEditableClassName(blockType, `${idx}.data.value.links.${index}.content`));
    });
  }
}

// Ending tags
// Some of the mjml components are "ending tags". These are mostly the components that will contain text contents, like mj-text or mj-buttons. These components can contain not only text, but also any HTML content, which will be completely unprocessed and left as it is. This means you cannot use other MJML components inside them, but you can use any HTML tag, like <img> or <a>.

// This has a little downside : The content is not modified at all, this means that the text won't be escaped, so if you use characters that are used to define html tags in your text, like < or >, you should use the encoded characters &lt; and &lt;. If you don't, sometimes the browser can be clever enough to understand that you're not really trying to open/close an html tag, and display the unescaped character as normal text, but this may cause problems in some cases. For instance, this will likely cause problems if you use the minify option, mj-html-attributes or an inline mj-style, because these require the html to be re-parsed internally. If you're just using the minify option, and really need to use the < > characters, i.e. for templating language, you can also avoid this problem by wrapping the troublesome content between two <!-- htmlmin:ignore --> tags.

// Here is the list of all ending tags : - mj-accordion-text - mj-accordion-title - mj-button - mj-navbar-link - mj-raw - mj-social-element - mj-text - mj-table