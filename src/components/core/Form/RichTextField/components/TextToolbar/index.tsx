import React from 'react';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  FontSizeOutlined,
  FontColorsOutlined,
  BgColorsOutlined,
  StopOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  MinusOutlined,
  AlignRightOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { ToolItem } from '../../components/ToolItem';
import { Link, LinkParams } from '../../components/Link';
import { FontSizeList } from '../../components/FontSizeList';
import { getShadowRoot } from '@/utils/findBlockNodeByIdx';
import { Stack } from '@/components/UI/Stack';
import { TextStyle } from '@/components/UI/TextStyle';
import { ColorPicker } from '../../../ColorPicker';
import { FontFamily } from '../FontFamily';
import { useSelectionRange } from '@/hooks/useSelectionRange';
import { FIXED_CONTAINER_ID } from '@/constants';

export interface TextToolbarProps {
  onChange: (content: string) => any;
  container: HTMLElement | null;
}

export function TextToolbar(props: TextToolbarProps) {
  const { container } = props;
  const { selectionRange: currentRange, restoreRange } = useSelectionRange();
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
      <Tooltip
        color='#fff'
        title={<FontFamily onChange={(val) => execCommand('fontName', val)} />}
        getPopupContainer={getPopoverMountNode}
      >
        <Button
          size='small'
          icon={(
            <TextStyle variation='strong'>
              <strong>F</strong>
            </TextStyle>
          )}
        />
      </Tooltip>
      <Tooltip
        color='#fff'
        title={
          <FontSizeList onChange={(val) => execCommand('fontSize', val)} />
        }
        getPopupContainer={getPopoverMountNode}
      >
        <Button size='small' icon={<FontSizeOutlined />} />
      </Tooltip>
      <ToolItem
        onClick={() => execCommand('bold')}
        icon={<BoldOutlined />}
        title='Bold'
      />
      <ToolItem
        onClick={() => execCommand('italic')}
        icon={<ItalicOutlined />}
        title='Italic'
      />
      <ColorPicker
        label=''
        placement='topLeft'
        onChange={(color) => execCommand('foreColor', color)}
        getPopupContainer={getPopoverMountNode}
        showInput={false}
      >
        <ToolItem icon={<FontColorsOutlined />} title='Text color' />
      </ColorPicker>
      <ColorPicker
        label=''
        showInput={false}
        placement='topLeft'
        onChange={(color) => execCommand('hiliteColor', color)}
        getPopupContainer={getPopoverMountNode}
      >
        <ToolItem icon={<BgColorsOutlined />} title='Background color' />
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
      <ToolItem
        onClick={() => execCommand('removeFormat')}
        icon={<CloseOutlined />}
        title='Remove format'
      />

      <ToolItem
        onClick={() => execCommand('justifyLeft')}
        icon={<AlignLeftOutlined />}
        title='Align left'
      />
      <ToolItem
        onClick={() => execCommand('justifyCenter')}
        icon={<AlignCenterOutlined />}
        title='Align center'
      />
      <ToolItem
        onClick={() => execCommand('justifyRight')}
        icon={<AlignRightOutlined />}
        title='Align right'
      />
      <ToolItem
        onClick={() => execCommand('insertOrderedList')}
        icon={<OrderedListOutlined />}
        title='Orderlist'
      />
      <ToolItem
        onClick={() => execCommand('insertUnorderedList')}
        icon={<UnorderedListOutlined />}
        title='Unorderlist'
      />
      <ToolItem
        onClick={() => execCommand('strikeThrough')}
        icon={<StrikethroughOutlined />}
        title='StrikethroughOutlined'
      />
      <ToolItem
        onClick={() => execCommand('underline')}
        icon={<UnderlineOutlined />}
        title='UnderlineOutlined'
      />

      <ToolItem
        onClick={() => execCommand('insertHorizontalRule')}
        icon={<MinusOutlined />}
        title='Line'
      />
    </div>
  );
}
