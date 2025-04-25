import React, { useCallback } from 'react';
import { ToolItem } from '../ToolItem';
import { Link, LinkParams } from '../Link';
import {
  AvailableTools,
  IconFont,
  MergeTagBadge,
  useEditorProps,
  useFocusBlockLayout,
} from 'easy-email-editor';
import { FontFamily } from '../FontFamily';
import { MergeTags } from '../MergeTags';
import { useSelectionRange } from '@extensions/AttributePanel/hooks/useSelectionRange';
import { IconBgColor } from './IconBgColor';
import { IconFontColor } from './IconFontColor';
import { BasicTools } from '../BasicTools';
import { Unlink } from '../Unlink';
import { StrikeThrough } from '../StrikeThrough';
import { Underline } from '../Underline';
import { Italic } from '../Italic';
import { Bold } from '../Bold';
import { FontSize } from '../FontSize';
import { RICH_TEXT_TOOL_BAR } from '@extensions/constants';
import { getIframeDocument } from '@extensions/utils/getIframeDocument';

export interface ToolsProps {
  onChange: (content: string) => any;
}

export function Tools(props: ToolsProps) {
  const { mergeTags, enabledMergeTagsBadge, toolbar } = useEditorProps();
  const { focusBlockNode } = useFocusBlockLayout();
  const { selectionRange, restoreRange, setRangeByElement } = useSelectionRange();

  const execCommand = useCallback(
    (cmd: string, val?: any) => {
      if (!selectionRange) {
        console.error(t('No selectionRange'));
        return;
      }
      if (!focusBlockNode?.contains(selectionRange?.commonAncestorContainer)) {
        console.error(t('Not commonAncestorContainer'));
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
          getIframeDocument()?.execCommand(cmd, false, uuid);

          link = getIframeDocument()?.body?.querySelector(`a[href="${uuid}"`)!;
        }

        if (target) {
          link.setAttribute('target', target);
        }
        link.style.color = 'inherit';
        link.style.textDecoration = linkData.underline ? 'underline' : 'none';
        link.setAttribute('href', linkData.link.trim());
      } else if (cmd === 'insertHTML') {
        let newContent = val;
        if (enabledMergeTagsBadge) {
          newContent = MergeTagBadge.transform(val, uuid);
        }

        getIframeDocument()?.execCommand(cmd, false, newContent);
        const insertMergeTagEle = getIframeDocument()?.getElementById(uuid);
        if (insertMergeTagEle) {
          insertMergeTagEle.focus();
          setRangeByElement(insertMergeTagEle);
        }
      } else {
        getIframeDocument()?.execCommand(cmd, false, val);
      }

      const contenteditableElement = getIframeDocument()?.activeElement;
      if (contenteditableElement?.getAttribute('contenteditable') === 'true') {
        const html = getIframeDocument()?.activeElement?.innerHTML || '';
        props.onChange(html);
      }
    },
    [
      enabledMergeTagsBadge,
      focusBlockNode,
      props,
      restoreRange,
      selectionRange,
      setRangeByElement,
    ],
  );

  const execCommandWithRange = useCallback(
    (cmd: string, val?: any) => {
      getIframeDocument()?.execCommand(cmd, false, val);
      const contenteditableElement = getIframeDocument()?.getSelection()?.focusNode as HTMLElement | null;
      if (contenteditableElement?.getAttribute && contenteditableElement?.getAttribute('contenteditable') === 'true') {
        const html = contenteditableElement.innerHTML ?? '';
        props.onChange(html);
      }
    },
    [props.onChange],
  );

  const getPopoverMountNode = () => getIframeDocument()?.getElementById(RICH_TEXT_TOOL_BAR)!;

  const enabledTools = toolbar?.tools ?? [
    AvailableTools.MergeTags,
    AvailableTools.FontFamily,
    AvailableTools.FontSize,
    AvailableTools.Bold,
    AvailableTools.Italic,
    AvailableTools.StrikeThrough,
    AvailableTools.Underline,
    AvailableTools.IconFontColor,
    AvailableTools.IconBgColor,
    AvailableTools.Link,
    AvailableTools.Justify,
    AvailableTools.Lists,
    AvailableTools.HorizontalRule,
    AvailableTools.RemoveFormat,
  ];

  const tools = enabledTools.flatMap(tool => {
    switch (tool) {
      case AvailableTools.MergeTags:
        if (!mergeTags) return [];
        return [
          <MergeTags
            key={tool}
            execCommand={execCommand}
            getPopupContainer={getPopoverMountNode}
          />,
        ];
      case AvailableTools.FontFamily:
        return [
          <FontFamily
            key={tool}
            execCommand={execCommand}
            getPopupContainer={getPopoverMountNode}
          />,
        ];
      case AvailableTools.FontSize:
        return [
          <FontSize
            key={tool}
            execCommand={execCommand}
            getPopupContainer={getPopoverMountNode}
          />,
        ];
      case AvailableTools.Bold:
        return [
          <Bold
            key={tool}
            currentRange={selectionRange}
            onChange={() => execCommandWithRange('bold')}
          />,
        ];
      case AvailableTools.Italic:
        return [
          <Italic
            key={tool}
            currentRange={selectionRange}
            onChange={() => execCommandWithRange('italic')}
          />,
        ];
      case AvailableTools.StrikeThrough:
        return [
          <StrikeThrough
            key={tool}
            currentRange={selectionRange}
            onChange={() => execCommandWithRange('strikeThrough')}
          />,
        ];
      case AvailableTools.Underline:
        return [
          <Underline
            key={tool}
            currentRange={selectionRange}
            onChange={() => execCommandWithRange('underline')}
          />,
        ];
      case AvailableTools.IconFontColor:
        return [
          <IconFontColor
            key={tool}
            selectionRange={selectionRange}
            execCommand={execCommand}
            getPopoverMountNode={getPopoverMountNode}
          />,
        ];
      case AvailableTools.IconBgColor:
        return [
          <IconBgColor
            key={tool}
            selectionRange={selectionRange}
            execCommand={execCommand}
            getPopoverMountNode={getPopoverMountNode}
          />,
        ];
      case AvailableTools.Link:
        return [
          <Link
            key={`${tool}-link`}
            currentRange={selectionRange}
            onChange={values => execCommand('createLink', values)}
            getPopupContainer={getPopoverMountNode}
          />,
          <Unlink
            key={`${tool}-unlink`}
            currentRange={selectionRange}
            onChange={() => execCommand('')}
          />,
        ];
      case 'justify':
        return [
          <ToolItem
            key={`${tool}-justify-left`}
            onClick={() => execCommand('justifyLeft')}
            icon={<IconFont iconName="icon-align-left" />}
            title={t('Align left')}
          />,
          <ToolItem
            key={`${tool}-justify-center`}
            onClick={() => execCommand('justifyCenter')}
            icon={<IconFont iconName="icon-align-center" />}
            title={t('Align center')}
          />,
          <ToolItem
            key={`${tool}-justify-right`}
            onClick={() => execCommand('justifyRight')}
            icon={<IconFont iconName="icon-align-right" />}
            title={t('Align right')}
          />,
        ];
      case AvailableTools.Lists:
        return [
          <ToolItem
            key={`${tool}-ordered-list`}
            onClick={() => execCommand('insertOrderedList')}
            icon={<IconFont iconName="icon-list-ol" />}
            title={t('Orderlist')}
          />,
          <ToolItem
            key={`${tool}-unordered-list`}
            onClick={() => execCommand('insertUnorderedList')}
            icon={<IconFont iconName="icon-list-ul" />}
            title={t('Unorderlist')}
          />,
        ];
      case AvailableTools.HorizontalRule:
        return [
          <ToolItem
            key={tool}
            onClick={() => execCommand('insertHorizontalRule')}
            icon={<IconFont iconName="icon-line" />}
            title={t('Line')}
          />,
        ];
      case AvailableTools.RemoveFormat:
        return [
          <ToolItem
            key={tool}
            onClick={() => execCommandWithRange('removeFormat')}
            icon={<IconFont iconName="icon-close" />}
            title={t('Remove format')}
          />,
        ];
      default:
        console.error('Not existing tool', tool);
        throw new Error(`Not existing tool ${tool}`);
    }
  });

  return (
    <div
      id={RICH_TEXT_TOOL_BAR}
      style={{ display: 'flex', flexWrap: 'nowrap' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <BasicTools />
        {tools.flatMap((tool, index) => [
          tool,
          <div
            className="easy-email-extensions-divider"
            key={`divider-${index}`}
          />,
        ])}
      </div>
      {toolbar?.suffix?.(execCommand)}
    </div>
  );
}
