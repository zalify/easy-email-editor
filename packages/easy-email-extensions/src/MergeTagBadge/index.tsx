import { useEditorContext, useEditorProps } from '@';
import { getShadowRoot } from '@/utils';
import { Input, Modal } from '@arco-design/web-react';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import stylesText from './MergeTagBadge.scss?inline';

const removeAllActiveBadge = () => {
  getShadowRoot()
    .querySelectorAll('.easy-email-merge-tag')
    .forEach((item) => {
      item.classList.remove('easy-email-merge-tag-focus');
    });

  const popoverNode = getShadowRoot().querySelectorAll(
    '.easy-email-merge-tag-popover'
  );
  if (popoverNode) {
  }
};

export default function MergeTagBadge() {
  const { initialized } = useEditorContext();
  const { onChangeMergeTag, mergeTags } = useEditorProps();
  const [text, setText] = useState('');

  const root = initialized && getShadowRoot();
  const [target, setTarget] = React.useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!root) return;

    const onClickMergeTag: EventListenerOrEventListenerObject = (e) => {
      removeAllActiveBadge();
      const target = e.target;
      if (
        target instanceof HTMLElement &&
        target.classList.contains('easy-email-merge-tag')
      ) {
        target.classList.add('easy-email-merge-tag-focus');
        const namePath = target.innerText;
        setText(get(mergeTags, namePath, ''));
        setTarget(target);
      }
    };

    root.addEventListener('click', onClickMergeTag);
    return () => {
      root.removeEventListener('click', onClickMergeTag);
    };
  }, [mergeTags, root]);

  const onClose = () => {
    if (!target) return;
    const next = target.nextSibling;
    setTimeout(() => {
      const range = document.createRange();
      if (next) {
        range.setStart(next, 0);
        range.collapse(false);
      } else {
        if (!target.parentNode) return;
        range.selectNodeContents(target.parentNode);
        range.collapse(false);
      }
      const selection = (root as any).getSelection();
      if (!selection) return;
      selection.removeAllRanges();
      selection.addRange(range);
    }, 100);

    setTarget(null);
  };

  const onSave = () => {
    if (!target) return;
    onChangeMergeTag?.(target.innerText, text);
    onClose();
  };

  return (
    <>
      {root && createPortal(<style>{stylesText}</style>, root as any)}
      {
        <Modal
          escToExit
          title='Default value'
          visible={Boolean(target && onChangeMergeTag)}
          okText='Save'
          onCancel={onClose}
          onOk={onSave}
        >
          <div>
            <p>
              If a personalized text value isn't available, then a default value
              is shown.
            </p>
            <Input
              value={text}
              showWordLimit
              maxLength={40}
              onChange={setText}
            />
          </div>
        </Modal>
      }
    </>
  );
}
