import {
  useEditorContext,
  useEditorProps,
  getShadowRoot,
  getBlockNodeByChildEle,
  IconFont,
  useRefState,
  getEditorRoot,
} from 'easy-email-editor';
import { get } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import stylesText from './MergeTagBadge.scss?inline';
import { classnames } from '@extensions/utils/classnames';
import { useSelectionRange } from '@extensions/AttributePanel/hooks/useSelectionRange';

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

export function MergeTagBadgePrompt() {
  const { initialized } = useEditorContext();
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const { onChangeMergeTag, mergeTags } = useEditorProps();
  const [text, setText] = useState('');
  const { setRangeByElement } = useSelectionRange();

  const root = initialized && getShadowRoot();
  const [target, setTarget] = React.useState<HTMLElement | null>(null);
  const targetRef = useRefState(target);

  const textContainer = getBlockNodeByChildEle(target);

  const focusMergeTag = useCallback((ele: HTMLElement) => {
    if (!ele) return;

    setRangeByElement(ele);
  }, [setRangeByElement]);

  useEffect(() => {

    const onBlur = (ev: MouseEvent) => {
      if (ev.target === getEditorRoot()) {
        return;
      }
      setTarget(null);
    };
    window.addEventListener('click', onBlur);
    return () => {
      window.removeEventListener('click', onBlur);
    };
  }, [targetRef, popoverRef]);

  const onClose = useCallback(() => {
    let ele = targetRef.current;

    setTimeout(() => {
      if (!ele) return;
      focusMergeTag(ele);
    }, 100);

    setTarget(null);
  }, [focusMergeTag, targetRef]);

  useEffect(() => {
    if (!root) return;
    const onClick: EventListenerOrEventListenerObject = (e) => {
      removeAllActiveBadge();
      const target = e.target;
      if (
        target instanceof HTMLInputElement &&
        target.classList.contains('easy-email-merge-tag')
      ) {
        target.classList.add('easy-email-merge-tag-focus');
        const namePath = target.value;
        if (!onChangeMergeTag) {
          focusMergeTag(target);
          return;
        }
        setText(get(mergeTags, namePath, ''));
        setTarget(target);

      } else {
        if (popoverRef.current?.contains(e.target as any)) return;
        setTarget(null);

      }
    };

    root.addEventListener('click', onClick);
    return () => {
      root.removeEventListener('click', onClick);
    };
  }, [focusMergeTag, mergeTags, onChangeMergeTag, root]);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((ev) => {
    setText(ev.target.value);
  }, []);

  const onSave = useCallback(() => {
    if (!(target instanceof HTMLInputElement)) return;
    onChangeMergeTag?.(target.value, text);
    onClose();
  }, [onChangeMergeTag, onClose, target, text]);

  const onClick: React.MouseEventHandler<HTMLDivElement> = useCallback((ev) => {
    ev.stopPropagation();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {

      if (e.code?.toLocaleLowerCase() === 'escape') {
        onClose();
      }

    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose, onSave]);

  return (
    <>

      {root && createPortal(<style>{stylesText}</style>, root as any)}
      {textContainer && createPortal(
        <div ref={popoverRef} onClick={onClick} className={classnames('easy-email-merge-tag-popover')}>
          <div className='easy-email-merge-tag-popover-container'>
            <h3>
              <span>{t('Default value')}</span>
              <IconFont style={{ color: 'rgb(92, 95, 98)' }} iconName='icon-close' onClick={onClose} />
            </h3>
            <div className={'easy-email-merge-tag-popover-desc'}>
              <p>
                {t('If a personalized text value isn\"t available, then a default value is shown.')}
              </p>
              <div className='easy-email-merge-tag-popover-desc-label'>
                <input autoFocus value={text} onChange={onChange} type="text" autoComplete='off' maxLength={40} />
                <div className='easy-email-merge-tag-popover-desc-label-count'>
                  {text.length}/40
                </div>
              </div>
              <div className='easy-email-merge-tag-popover-desc-label-button'>
                <button onClick={onSave}>{t('Save')}</button>
              </div>
            </div>
          </div>

        </div>, textContainer)}
    </>
  );
}
