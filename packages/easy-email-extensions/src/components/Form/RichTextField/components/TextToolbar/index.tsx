import React, { useCallback, useEffect, useState } from 'react';
import { Tooltip } from '@arco-design/web-react';
import { Button } from '@arco-design/web-react';
import { ToolItem } from '../ToolItem';
import { Link, LinkParams } from '../Link';
import { FontSizeList } from '../FontSizeList';
import {
  FIXED_CONTAINER_ID,
  getShadowRoot,
  Stack,
  IconFont,
  useEditorProps,
} from 'easy-email-editor';
import { ColorPicker } from '../../../ColorPicker';
import { FontFamily } from '../FontFamily';
import { MergeTags } from './MergeTags';

export interface TextToolbarProps {
  onChange: (content: string) => any;
  container: HTMLElement | null;
}

export function TextToolbar(props: TextToolbarProps) {
  const { container } = props;
  const { mergeTags } = useEditorProps();
  const [selectionRange, setSelectionRange] = useState<Range | null>(null);

  useEffect(() => {
    const onSelectionChange = () => {
      try {
        const range = (getShadowRoot() as any).getSelection().getRangeAt(0);
        if (range) {
          setSelectionRange(range);
        }
      } catch (error) {}
    };

    document.addEventListener('selectionchange', onSelectionChange);

    return () => {
      document.removeEventListener('selectionchange', onSelectionChange);
    };
  }, []);

  const restoreRange = useCallback((range: Range) => {
    const selection = (getShadowRoot() as any).getSelection();
    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.setStart(range.startContainer, range.startOffset);
    newRange.setEnd(range.endContainer, range.endOffset);

    selection.addRange(newRange);
  }, []);

  const execCommand = (cmd: string, val?: any) => {
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

    if (cmd === 'createLink') {
      const linkData = val as LinkParams;
      const target = linkData.blank ? '_blank' : '';
      let link: HTMLAnchorElement;
      if (linkData.linkNode) {
        link = linkData.linkNode;
      } else {
        const uuid = (+new Date()).toString();
        document.execCommand(cmd, false, uuid);

        link = getShadowRoot().querySelector(
          `a[href="${uuid}"`
        )! as HTMLAnchorElement;
      }

      if (target) {
        link.setAttribute('target', target);
      }
      link.style.color = 'inherit';
      link.style.textDecoration = linkData.underline ? 'underline' : 'none';
      link.setAttribute('href', linkData.link);
    } else {
      document.execCommand(cmd, false, val);
    }

    const html = container.innerHTML;
    props.onChange(html);
  };

  const getPopoverMountNode = () =>
    document.getElementById(FIXED_CONTAINER_ID)!;

  return (
    <div id='TextToolbar' style={{ display: 'flex', flexWrap: 'nowrap' }}>
      <Stack vertical spacing='extraTight'>
        <Stack spacing='extraTight'>
          <Tooltip
            color='#fff'
            content={
              <FontFamily onChange={(val) => execCommand('fontName', val)} />
            }
            getPopupContainer={getPopoverMountNode}
          >
            <Button
              size='mini'
              icon={<IconFont iconName='icon-font-family' />}
            />
          </Tooltip>

          <Tooltip
            color='#fff'
            content={
              <FontSizeList onChange={(val) => execCommand('fontSize', val)} />
            }
            getPopupContainer={getPopoverMountNode}
          >
            <Button
              size='mini'
              icon={<IconFont iconName='icon-line-height' />}
            />
          </Tooltip>
          <ToolItem
            onClick={() => execCommand('bold')}
            icon={<IconFont iconName='icon-bold' />}
            title='Bold'
          />
          <ToolItem
            onClick={() => execCommand('italic')}
            icon={<IconFont iconName='icon-italic' />}
            title='Italic'
          />
          <ColorPicker
            label=''
            position='tl'
            onChange={(color) => execCommand('foreColor', color)}
            getPopupContainer={getPopoverMountNode}
            showInput={false}
          >
            <ToolItem
              icon={<IconFont iconName='icon-font-color' />}
              title='Text color'
            />
          </ColorPicker>
          <ColorPicker
            label=''
            showInput={false}
            position='tl'
            onChange={(color) => execCommand('hiliteColor', color)}
            getPopupContainer={getPopoverMountNode}
          >
            <ToolItem
              icon={<IconFont iconName='icon-bg-colors' />}
              title='Background color'
            />
          </ColorPicker>
          <Link
            currentRange={selectionRange}
            onChange={(values) => execCommand('createLink', values)}
            getPopupContainer={getPopoverMountNode}
          />
          {mergeTags && (
            <Tooltip
              color='#fff'
              position='bottom'
              content={
                <MergeTags
                  value=''
                  onChange={(val) => execCommand('insertHTML', val)}
                />
              }
              getPopupContainer={getPopoverMountNode}
            >
              <Button
                size='mini'
                title='Merge tag'
                icon={<IconFont iconName='icon-merge-tags' />}
              />
            </Tooltip>
          )}

          <ToolItem
            onClick={() => execCommand('removeFormat')}
            icon={<IconFont iconName='icon-close' />}
            title='Remove format'
          />
        </Stack>

        <Stack spacing='extraTight'>
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
        </Stack>
      </Stack>
    </div>
  );
}
