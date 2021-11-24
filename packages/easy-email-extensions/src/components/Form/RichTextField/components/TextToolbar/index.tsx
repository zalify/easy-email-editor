import React from 'react';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  FontSizeOutlined,
  FontColorsOutlined,
  BgColorsOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  MinusOutlined,
  AlignRightOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
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
import { useSelectionRange } from '@extensions/AttributePanel/hooks/useSelectionRange';
import { MergeTags } from './MergeTags';

export interface TextToolbarProps {
  onChange: (content: string) => any;
  container: HTMLElement | null;
}

export function TextToolbar(props: TextToolbarProps) {
  const { container } = props;
  const { selectionRange: currentRange, restoreRange } = useSelectionRange();
  const { mergeTags } = useEditorProps();
  const execCommand = (cmd: string, val?: any) => {
    if (!container) {
      console.error('No container');
      return;
    }
    if (!currentRange) {
      console.error('No currentRange');
      return;
    }
    if (
      !container?.contains(currentRange?.commonAncestorContainer) &&
      container !== currentRange?.commonAncestorContainer
    ) {
      console.error('Not commonAncestorContainer');
      return;
    }

    restoreRange(currentRange);

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

  const getMountNode = () => getShadowRoot().getElementById('TextToolbar')!;
  const getPopoverMountNode = () =>
    document.getElementById(FIXED_CONTAINER_ID)!;

  return (
    <div id='TextToolbar' style={{ display: 'flex', flexWrap: 'nowrap' }}>
      <Stack vertical spacing='extraTight'>
        <Stack spacing='extraTight'>
          <Tooltip
            color='#fff'
            title={
              <FontFamily onChange={(val) => execCommand('fontName', val)} />
            }
            getPopupContainer={getPopoverMountNode}
          >
            <Button
              size='small'
              icon={<IconFont iconName='icon-font-family' />}
            />
          </Tooltip>

          <Tooltip
            color='#fff'
            title={
              <FontSizeList onChange={(val) => execCommand('fontSize', val)} />
            }
            getPopupContainer={getPopoverMountNode}
          >
            <Button
              size='small'
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
            placement='topLeft'
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
            placement='topLeft'
            onChange={(color) => execCommand('hiliteColor', color)}
            getPopupContainer={getPopoverMountNode}
          >
            <ToolItem
              icon={<IconFont iconName='icon-bg-colors' />}
              title='Background color'
            />
          </ColorPicker>
          <Link
            currentRange={currentRange}
            onChange={(values) => execCommand('createLink', values)}
            getPopupContainer={getPopoverMountNode}
          />
          {/* <ToolItem
              onClick={() => execCommand('unlink')}
              icon={<StopOutlined />}
              title='Unlink'
            /> */}
          {/* {mergeTags && (
            <Tooltip
              color='#fff'
              placement='bottom'
              title={
                <MergeTags
                  value=''
                  onChange={(val) => execCommand('insertHTML', val)}
                />
              }
              getPopupContainer={getPopoverMountNode}
            >
              <Button
                size='small'
                title='Merge tag'
                icon={<IconFont iconName='icon-merge-tags' />}
              />
            </Tooltip>
          )} */}

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
