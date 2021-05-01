import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  FontSizeOutlined,
  FontColorsOutlined,
  BgColorsOutlined,
  StopOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  MinusOutlined,
  AlignRightOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { Stack } from '../Stack';
import { Button, Drawer, Tooltip } from 'antd';
import styles from './index.module.scss';
import { ColorPicker } from '../core/Form/ColorPicker';
import { TextStyle } from '../TextStyle';
import { ToolItem } from './components/ToolItem';
import { Link, LinkParams } from './components/Link';
import { FontSizeList } from './components/FontSizeList';
import { Heading } from './components/Heading';

export interface RichTextProps {
  value: string;
  containerStyle: React.CSSProperties;
  onChange: (content: string) => any;
}

export function RichText(props: RichTextProps) {
  const { containerStyle } = props;
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [initialValue, setInitialValue] = useState(props.value);
  const editorRef = useRef<HTMLDivElement>(null);
  const contentEditorRef = useRef<HTMLDivElement | null>(null);
  const [currentRange, setCurrentRangeRange] = useState<
    Range | null | undefined
  >(null);

  const toggleFullScreen = useCallback(() => {
    if (!contentEditorRef.current) return;
    setInitialValue(contentEditorRef.current.innerHTML || '');
    setIsFullScreen((v) => !v);
    contentEditorRef.current.focus();
  }, []);

  useEffect(() => {
    const onSelectionChange = () => {
      const range = document.getSelection()?.getRangeAt(0);
      if (contentEditorRef.current?.contains(range?.commonAncestorContainer!)) {
        setCurrentRangeRange(range);
      }
    };

    document.addEventListener('selectionchange', onSelectionChange);

    return () => {
      document.removeEventListener('selectionchange', onSelectionChange);
    };
  }, [currentRange]);

  useEffect(() => {
    if (!contentEditorRef.current) return;
    contentEditorRef.current.addEventListener('paste', function (e) {
      e.preventDefault();
      var text = e.clipboardData?.getData('text/plain') || '';
      document.execCommand('insertHTML', false, text);
    });
  }, [contentEditorRef]);


  const execCommand = (cmd: string, val?: any) => {
    const container = contentEditorRef.current;
    if (!container) return;

    if (currentRange) {
      let selection = window.getSelection()!;
      const newRange = document.createRange();
      newRange.selectNodeContents(container);
      newRange.setStart(currentRange.startContainer, currentRange.startOffset);
      newRange.setEnd(currentRange.endContainer, currentRange.endOffset);
      selection.removeAllRanges();
      selection.addRange(newRange);

      if (cmd === 'createLink') {
        const linkData = val as LinkParams;
        const target = linkData.blank ? '_blank' : '';
        let link: HTMLAnchorElement;
        if (linkData.linkNode) {
          link = linkData.linkNode;
        } else {
          const uuid = uuidv4();
          document.execCommand(cmd, false, uuid);
          link = document.querySelector(
            `a[href="${uuid}"`
          )! as HTMLAnchorElement;
        }

        if (target) {
          link.setAttribute('target', target);
        }
        link.style.textDecoration = linkData.underline ? 'underline' : 'none';
        link.setAttribute('href', linkData.link);
      } else {
        document.execCommand(cmd, false, val);
      }

      const html = container.innerHTML;
      props.onChange(html);
    }
  };

  const handleInput = (event: any) => {
    if (props.onChange) {
      props.onChange(event.target.innerHTML);
    }
  };

  const content = (
    <div className={styles.contaner} ref={editorRef}>
      <Stack vertical spacing='tight'>
        <Stack spacing='extraTight'>
          <Tooltip
            color='#fff'
            title={
              <FontSizeList onChange={(val) => execCommand('fontSize', val)} />
            }
          >
            <Button size='small' icon={<FontSizeOutlined />} />
          </Tooltip>
          <Tooltip
            color='#fff'
            title={
              <Heading onChange={(val) => execCommand('formatBlock', val)} />
            }
          >
            <Button
              size='small'
              icon={<TextStyle variation='strong'>H</TextStyle>}
            />
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
            onChange={(color) => execCommand('foreColor', color)}
          >
            <ToolItem icon={<FontColorsOutlined />} title='Text color' />
          </ColorPicker>
          <ColorPicker
            label=''
            onChange={(color) => execCommand('hiliteColor', color)}
          >
            <ToolItem icon={<BgColorsOutlined />} title='Background color' />
          </ColorPicker>
          <Link
            key={props.value}
            currentRange={currentRange}
            onChange={(values) => execCommand('createLink', values)}
          />
          <ToolItem
            onClick={() => execCommand('unlink')}
            icon={<StopOutlined />}
            title='Unlink'
          />
          <ToolItem
            onClick={() => execCommand('removeFormat')}
            icon={<CloseOutlined />}
            title='Remove format'
          />
        </Stack>

        <Stack spacing='extraTight'>
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
            onClick={() => execCommand('insertHorizontalRule')}
            icon={<MinusOutlined />}
            title='Line'
          />
          {isFullScreen ? (
            <Button
              size='small'
              onClick={toggleFullScreen}
              icon={<FullscreenExitOutlined />}
              title='Exit fullscreen'
            />
          ) : (
            <Button
              size='small'
              onClick={toggleFullScreen}
              icon={<FullscreenOutlined />}
              title='Fullscreen'
            />
          )}
        </Stack>
        <div
          className={styles.editorWrapper}
          style={{ backgroundColor: containerStyle.backgroundColor }}
        >
          <div
            contentEditable
            ref={contentEditorRef}
            style={{
              ...containerStyle,
              backgroundColor: undefined,
              minHeight: 100,
              maxHeight: 200,
              overflow: 'auto'
            }}
            dangerouslySetInnerHTML={{ __html: initialValue }}
            onInput={handleInput}
          />
        </div>
      </Stack>
    </div>
  );

  return (
    <div key={String(isFullScreen)}>
      {content}
      <Drawer
        width='100vh'
        title='Basic Drawer'
        placement='right'
        closable={false}
        visible={isFullScreen}
        onClose={toggleFullScreen}
      >
        {content}
      </Drawer>
    </div>
  );
}
