import React from 'react';
import { Popover } from '@arco-design/web-react';
import { ToolItem } from '../ToolItem';
import { Link, LinkParams } from '../Link';
import { FontSizeList } from '../FontSizeList';
import {
  FIXED_CONTAINER_ID,
  getEditNode,
  getShadowRoot,
  IconFont,
  useEditorProps,
  useFocusBlockLayout,
} from 'easy-email-editor';
import { FontFamily } from '../FontFamily';
import styleText from './index.scss?inline';
import { MergeTags } from '../MergeTags';
import { useSelectionRange } from '@extensions/AttributePanel/hooks/useSelectionRange';
import { IconBgColor } from './IconBgColor';
import { IconFontColor } from './IconFontColor';
import { MergeTagBadge } from 'easy-email-editor';
import { BasicTools } from '../BasicTools';

export interface ToolsProps {
  onChange: (content: string) => any;
}

export function Tools(props: ToolsProps) {
  const { mergeTags } = useEditorProps();
  const { focusBlockNode } = useFocusBlockLayout();
  const { selectionRange, restoreRange, setRangeByElement } =
    useSelectionRange();

  const execCommand = (cmd: string, val?: any) => {
    const container = getEditNode(focusBlockNode);
    if (!container) {
      console.error('No container');
      return;
    }
    if (!selectionRange) {
      console.error('No selectionRange');
      return;
    }
    if (
      !container?.contains(selectionRange?.commonAncestorContainer) &&
      container !== selectionRange?.commonAncestorContainer
    ) {
      console.error('Not commonAncestorContainer');
      return;
    }

    restoreRange(selectionRange);
    const uuid = (+new Date()).toString();
    if (cmd === 'createLink') {
      const linkData = val as LinkParams;
      const target = linkData.blank ? '_blank' : '';
      let link: HTMLAnchorElement;
      if (linkData.linkNode) {
        link = linkData.linkNode;
      } else {
        document.execCommand(cmd, false, uuid);

        link = getShadowRoot().querySelector(`a[href="${uuid}"`)!;
      }

      if (target) {
        link.setAttribute('target', target);
      }
      link.style.color = 'inherit';
      link.style.textDecoration = linkData.underline ? 'underline' : 'none';
      link.setAttribute('href', linkData.link);
    } else if (cmd === 'insertHTML') {
      const newContent = MergeTagBadge.transform(val, uuid);
      document.execCommand(cmd, false, newContent);
      const insertMergeTagEle = getShadowRoot().getElementById(uuid);
      if (insertMergeTagEle) {
        insertMergeTagEle.removeAttribute('id');
        if (insertMergeTagEle.nextSibling) {
          setRangeByElement(insertMergeTagEle.nextSibling);
        } else if (
          insertMergeTagEle.parentNode &&
          insertMergeTagEle.parentNode instanceof HTMLElement
        ) {
          // 如果contentedable=false的节点是最后一个节点，则无法选中该节点
          const lastChild = document.createElement('span');
          insertMergeTagEle.parentNode.appendChild(lastChild);
          setRangeByElement(lastChild);
        }
      }
    } else {
      document.execCommand(cmd, false, val);
    }

    const html = container.innerHTML;
    props.onChange(html);
  };

  const getPopoverMountNode = () =>
    document.getElementById(FIXED_CONTAINER_ID)!;

  return (
    <div id='Tools' style={{ display: 'flex', flexWrap: 'nowrap' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <BasicTools />

        {mergeTags && (
          <MergeTags
            execCommand={execCommand}
            getPopupContainer={getPopoverMountNode}
          />
        )}
        <div className='easy-email-extensions-divider' />
        <div className='easy-email-extensions-divider' />
        <Popover
          className='easy-email-extensions-Tools-Popover'
          trigger='click'
          content={
            <>
              <style>{styleText}</style>
              <FontFamily onChange={(val) => execCommand('fontName', val)} />
            </>
          }
          getPopupContainer={getPopoverMountNode}
        >
          <ToolItem
            title='font family'
            icon={<IconFont iconName='icon-font-family' />}
          />
        </Popover>
        <div className='easy-email-extensions-divider' />
        <Popover
          className='easy-email-extensions-Tools-Popover'
          color='#fff'
          trigger='click'
          content={
            <>
              <style>{styleText}</style>
              <FontSizeList onChange={(val) => execCommand('fontSize', val)} />
            </>
          }
          getPopupContainer={getPopoverMountNode}
        >
          <ToolItem
            title='line-height'
            icon={<IconFont iconName='icon-line-height' />}
          />
        </Popover>
        <div className='easy-email-extensions-divider' />
        <ToolItem
          onClick={() => execCommand('bold')}
          icon={<IconFont iconName='icon-bold' />}
          title='Bold'
        />
        <div className='easy-email-extensions-divider' />
        <ToolItem
          onClick={() => execCommand('italic')}
          icon={<IconFont iconName='icon-italic' />}
          title='Italic'
        />
        <div className='easy-email-extensions-divider' />

        <IconFontColor
          selectionRange={selectionRange}
          execCommand={execCommand}
          getPopoverMountNode={getPopoverMountNode}
        />
        <div className='easy-email-extensions-divider' />
        <IconBgColor
          selectionRange={selectionRange}
          execCommand={execCommand}
          getPopoverMountNode={getPopoverMountNode}
        />

        <div className='easy-email-extensions-divider' />
        <Link
          currentRange={selectionRange}
          onChange={(values) => execCommand('createLink', values)}
          getPopupContainer={getPopoverMountNode}
        />
        <div className='easy-email-extensions-divider' />

        <ToolItem
          onClick={() => execCommand('justifyLeft')}
          icon={<IconFont iconName='icon-align-left' />}
          title='Align left'
        />
        <ToolItem
          onClick={() => execCommand('justifyCenter')}
          icon={<IconFont iconName='icon-align-center' />}
          title='Align center'
        />
        <ToolItem
          onClick={() => execCommand('justifyRight')}
          icon={<IconFont iconName='icon-align-right' />}
          title='Align right'
        />
        <div className='easy-email-extensions-divider' />
        <ToolItem
          onClick={() => execCommand('insertOrderedList')}
          icon={<IconFont iconName='icon-list-ol' />}
          title='Orderlist'
        />
        <ToolItem
          onClick={() => execCommand('insertUnorderedList')}
          icon={<IconFont iconName='icon-list-ul' />}
          title='Unorderlist'
        />
        <div className='easy-email-extensions-divider' />
        <ToolItem
          onClick={() => execCommand('strikeThrough')}
          icon={<IconFont iconName='icon-strikethrough' />}
          title='StrikethroughOutlined'
        />
        <ToolItem
          onClick={() => execCommand('underline')}
          icon={<IconFont iconName='icon-underline' />}
          title='UnderlineOutlined'
        />

        <ToolItem
          onClick={() => execCommand('insertHorizontalRule')}
          icon={<IconFont iconName='icon-line' />}
          title='Line'
        />
        <div className='easy-email-extensions-divider' />
        <ToolItem
          onClick={() => execCommand('removeFormat')}
          icon={<IconFont iconName='icon-close' />}
          title='Remove format'
        />
        <div className='easy-email-extensions-divider' />
      </div>
    </div>
  );
}
