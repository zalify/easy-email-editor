import TableOperationMenu from './tableOperationMenu';
import {
  checkEventInBoundingRect,
  setStyle,
  getCurrentTable,
  getElementsBoundary,
  getTdBoundaryIndex,
  getBoundaryRectAndElement,
} from './util';
import { AdvancedTableBlock } from 'easy-email-core';

interface IBorderTool {
  top: Element;
  bottom: Element;
  left: Element;
  right: Element;
}

class TableColumnTool {
  borderTool = {} as IBorderTool;
  dragging = false;
  showBorderTool = false;
  startRect = {} as { width: number; height: number }; // start td rect
  startTdTop = 0; // update when click
  startTdLeft = 0; //  update when click
  endTdTop = 0; // will update by mouse move
  endTdLeft = 0; // will update by mouse move
  width = 0; // selected section width,will update by mouse move
  height = 0; // selected section height, will update by mouse move

  selectedLeftTopCell: Element | undefined = undefined;
  selectedBottomRightCell: Element | undefined = undefined;
  startDom: Element | undefined = undefined;
  endDom: Element | undefined = undefined;
  hoveringTable: ParentNode | null = null;
  root: Element | undefined = undefined;

  tableMenu?: TableOperationMenu;
  changeTableData?: (e: AdvancedTableBlock['data']['value']['tableSource']) => void;
  tableData: AdvancedTableBlock['data']['value']['tableSource'] = [];

  constructor(borderTool: IBorderTool, root: Element) {
    if (!borderTool || !root) {
      return;
    }
    this.borderTool = borderTool;
    this.root = root;

    this.initTool();
  }

  initTool() {
    this.root?.addEventListener('contextmenu', this.handleContextmenu);
    this.root?.addEventListener('mousedown', this.handleMousedown.bind(this));
    document.body.addEventListener('click', this.hideBorder, false);
    document.body.addEventListener('contextmenu', this.hideTableMenu, false);
    document.addEventListener('keydown', this.hideBorderByKeyDown);
  }

  destroy() {
    this.root?.removeEventListener('mousedown', this.handleMousedown.bind(this));
    this.root?.removeEventListener('contextmenu', this.handleContextmenu);
    document.body.removeEventListener('click', this.hideBorder, false);
    document.body.removeEventListener('contextmenu', this.hideTableMenu, false);
    document.removeEventListener('keydown', this.hideBorderByKeyDown);

    this.tableMenu?.destroy();
  }

  hideBorder = (e: any) => {
    if (e.target.id === 'VisualEditorEditMode') {
      return;
    }
    this.visibleBorder(false);
  };

  hideBorderByKeyDown = () => {
    this.visibleBorder(false);
  };

  hideTableMenu = (e?: any) => {
    if (e?.target.id === 'VisualEditorEditMode') {
      return;
    }
    this.tableMenu?.hide();
  };

  visibleBorder = (show = true) => {
    if (this.showBorderTool === show) {
      return;
    }
    if (show) {
      setStyle(this.borderTool.top.parentElement, { display: 'block' });
    } else {
      setStyle(this.borderTool.top.parentElement, { display: 'none' });
    }
    this.showBorderTool = show;
  };

  renderBorder = () => {
    this.visibleBorder(true);
    const result = getBoundaryRectAndElement(
      this.startDom as Element,
      this.endDom as Element,
    );
    if (!result) {
      return;
    }
    const { left, top, width, height } = result.boundary;
    this.selectedLeftTopCell = result.leftTopCell;
    this.selectedBottomRightCell = result.bottomRightCell;

    setStyle(this.borderTool.top, {
      'background-color': 'rgb(65, 68, 77)',
      left: `${left}px`,
      top: `${top}px`,
      width: `${Math.abs(width)}px`,
      height: '2px',
      position: 'absolute',
      'z-index': 10,
    });
    setStyle(this.borderTool.bottom, {
      'background-color': 'rgb(65, 68, 77)',
      left: `${left}px`,
      top: `${top + height}px`,
      width: `${Math.abs(width)}px`,
      height: '2px',
      position: 'absolute',
      'z-index': 10,
    });
    setStyle(this.borderTool.left, {
      'background-color': 'rgb(65, 68, 77)',
      left: `${left}px`,
      top: `${top}px`,
      width: `2px`,
      height: `${Math.abs(height)}px`,
      position: 'absolute',
      'z-index': 10,
    });
    setStyle(this.borderTool.right, {
      'background-color': 'rgb(65, 68, 77)',
      left: `${left + width}px`,
      top: `${top}px`,
      width: `2px`,
      height: `${Math.abs(height)}px`,
      position: 'absolute',
      'z-index': 10,
    });
  };

  handleContextmenu = (event: any) => {
    if (this.showBorderTool) {
      const selectedBoundary = getElementsBoundary(
        this.selectedLeftTopCell as Element,
        this.selectedBottomRightCell as Element,
      );
      if (checkEventInBoundingRect(selectedBoundary, event)) {
        event.preventDefault();
        return;
      }
    }
    this.hideTableMenu();
  };

  handleMousedown(event: any) {
    let target: Element = event.target;
    if (event.button == 0) {
      // left button click
      while (target && target.parentNode) {
        if (
          target.nodeName === 'TD' &&
          target.getAttribute('data-content_editable-type') === 'rich_text'
        ) {
          this.root?.addEventListener('mousemove', this.handleDrag);
          this.root?.addEventListener('mouseup', this.handleMouseup);

          this.dragging = true;
          this.startDom = target;
          this.endDom = target;
          this.hoveringTable = getCurrentTable(target);

          this.renderBorder();
          return;
        }
        target = target.parentNode as Element;
        if (['TR', 'TABLE', 'BODY'].includes(target.nodeName)) {
          this.visibleBorder(false);
          return;
        }
      }
    } else if (event.button == 2) {
      if (this.showBorderTool) {
        const selectedBoundary = getElementsBoundary(
          this.selectedLeftTopCell as Element,
          this.selectedBottomRightCell as Element,
        );
        // check event position, then show table operation menu
        if (checkEventInBoundingRect(selectedBoundary, event)) {
          if (!this.tableMenu) {
            this.tableMenu = new TableOperationMenu();
          }

          this.tableMenu.setTableData(this.tableData as any);
          this.tableMenu.changeTableData = this.changeTableData;

          this.tableMenu.setTableIndexBoundary(
            getTdBoundaryIndex(
              this.selectedLeftTopCell as Element,
              this.selectedBottomRightCell as Element,
            ),
          );
          this.tableMenu.showMenu(event);

          return;
        }
      }
    }
    this.visibleBorder(false);
  }

  handleDrag = (e: any) => {
    e.preventDefault();

    if (this.dragging) {
      let target = e.target;

      while (target && target.parentNode) {
        if (
          target.nodeName === 'TD' &&
          target.getAttribute('data-content_editable-type') === 'rich_text'
        ) {
          const hoveringTable = getCurrentTable(target);
          if (this.endDom === target || this.hoveringTable !== hoveringTable) {
            return;
          }
          this.endDom = target;
          this.renderBorder();
          return;
        }
        target = target.parentNode;
      }
    }
  };

  handleMouseup = (e: any) => {
    e.preventDefault();

    if (this.dragging) {
      this.dragging = false;
      this.root?.removeEventListener('mousemove', this.handleDrag);
      this.root?.removeEventListener('mouseup', this.handleMouseup);
    }
  };
}

export default TableColumnTool;
