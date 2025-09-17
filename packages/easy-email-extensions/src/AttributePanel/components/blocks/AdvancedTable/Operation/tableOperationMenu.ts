import { getCorrectTableIndexBoundary, getMaxTdCount, setStyle } from './util';
import styleText from './menu.scss?inline';
import { IBoundingPosition, IOperationData } from './type';
import MENU_CONFIG from './tableMenuConfig';
import { getIframeDocument } from 'easy-email-editor';

const MENU_HEIGHT = 305;
const MENU_WIDTH = 200;

export default class TableOperationMenu {
  menuItems = MENU_CONFIG;
  domNode: Element | undefined = undefined;
  styleDom?: HTMLStyleElement;
  visible = false;

  changeTableData?: (e: IOperationData[][]) => void;
  tableData = undefined as unknown as IOperationData[][];
  tableIndexBoundary = undefined as unknown as IBoundingPosition;
  maxTdCount = 0;

  constructor() {
    this.menuInitial();
    this.mount();
  }

  mount() {
    const iframeDocument = getIframeDocument();

    if (this.domNode) {
      iframeDocument?.body.appendChild(this.domNode);
    }
    iframeDocument?.body.addEventListener('click', this.hide.bind(this));
  }

  destroy() {
    this.domNode?.remove();
    const iframeDocument = getIframeDocument();

    if (this.styleDom) {
      iframeDocument?.head.removeChild(this.styleDom);
    }
    iframeDocument?.body.removeEventListener('click', this.hide.bind(this));
  }

  hide() {
    if (!this.visible) {
      return;
    }
    this.visible = false;
    setStyle(this.domNode, {
      display: 'none',
    });
  }

  addRow(insertIndex: number, colCount: number) {
    const newRow = Array.from({ length: colCount }).map(() => ({ content: '-' }) as any);
    this.tableData.splice(insertIndex, 0, newRow);
    this.changeTableData?.(this.tableData);
  }

  setTableData(tableData: IOperationData[][]) {
    this.tableData = tableData || [];
    this.maxTdCount = getMaxTdCount(this.tableData);
  }

  setTableIndexBoundary(tableIndexBoundary: IBoundingPosition) {
    // get correct boundary index and set table-td boundary
    this.tableIndexBoundary = getCorrectTableIndexBoundary(
      tableIndexBoundary,
      this.tableData,
    );
  }

  showMenu({ x, y }: { x: number; y: number }) {
    this.visible = true;

    const maxHeight = getIframeDocument()!.body.clientHeight;
    const maxWidth = getIframeDocument()!.body.clientWidth;
    if (maxWidth - MENU_WIDTH < x) {
      x -= MENU_WIDTH;
    }
    if (maxHeight - MENU_HEIGHT < y) {
      y -= MENU_HEIGHT;
    }
    setStyle(this.domNode, {
      display: 'block',
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      'min-height': '150px',
      width: `${MENU_WIDTH}px`,
      Height: `${MENU_HEIGHT}px`,
    });
  }

  menuInitial() {
    const iframeDocument = getIframeDocument();
    this.styleDom = iframeDocument?.createElement('style');
    if (this.styleDom) {
      this.styleDom.innerText = styleText;
      iframeDocument?.head.appendChild(this.styleDom);
    }

    this.domNode = iframeDocument?.createElement('div');

    if (this.domNode) {
      this.domNode.classList.add('easy-email-table-operation-menu');
      setStyle(this.domNode, { display: 'none' });

      for (let name in this.menuItems) {
        const itemOption = (this.menuItems as any)[name];
        if (itemOption) {
          this.domNode.appendChild(
            itemOption.render
              ? itemOption.render(this)
              : this.menuItemCreator(Object.assign({}, itemOption)),
          );

          if (['insertRowDown', 'deleteRow'].indexOf(name) > -1) {
            this.domNode.appendChild(dividingCreator());
          }
        }
      }
    }

    // create dividing line
    function dividingCreator() {
      const iframeDocument = getIframeDocument();

      const dividing = iframeDocument?.createElement('div');
      dividing?.classList.add('easy-email-table-operation-menu-dividing');

      return dividing as HTMLDivElement;
    }
  }

  menuItemCreator({ text, icon, handler }: any) {
    const iframeDocument = getIframeDocument();

    const node = iframeDocument?.createElement('div');
    node?.classList.add('easy-email-table-operation-menu-item');

    const iconSpan = iframeDocument?.createElement('span');
    iconSpan?.classList.add('easy-email-table-operation-menu-icon');
    if (iconSpan) {
      iconSpan.innerHTML = icon;
    }

    const textSpan = iframeDocument?.createElement('span');
    textSpan?.classList.add('easy-email-table-operation-menu-text');
    if (textSpan) {
      textSpan.innerText = text;
    }

    if (node && iconSpan && textSpan) {
      node.appendChild(iconSpan);
      node.appendChild(textSpan);
      node.addEventListener('click', handler.bind(this), false);
    }
    return node;
  }
}
