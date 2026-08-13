import { DATA_CONTENT_EDITABLE_IDX } from 'easy-email-editor';
import { IBoundaryRect, IBoundingPosition, IOperationData } from './type';
import { AdvancedTableBlock } from 'easy-email-core';

const getEditorElementClientRect = (target: any) => {
  let left = target.offsetLeft;
  let top = target.offsetTop;
  const width = target.clientWidth;
  const height = target.clientHeight;
  let parentNode = target.offsetParent;
  while (parentNode && parentNode.offsetParent) {
    if (parentNode.classList.contains('shadow-container')) {
      return { left, top, height, width };
    }
    left += parentNode.offsetLeft;
    top += parentNode.offsetTop;

    parentNode = parentNode.offsetParent;
  }
  return { left, top, height, width };
};

const getBoundaryFromRects = (startRect: any, endRect: any) => {
  let left = Math.min(
    startRect.left,
    endRect.left,
    startRect.left + startRect.width,
    endRect.left + endRect.width,
  );

  let right = Math.max(
    startRect.left,
    endRect.left,
    startRect.left + startRect.width,
    endRect.left + endRect.width,
  );

  let top = Math.min(
    startRect.top,
    endRect.top,
    startRect.top + startRect.height,
    endRect.top + endRect.height,
  );

  let bottom = Math.max(
    startRect.top,
    endRect.top,
    startRect.top + startRect.height,
    endRect.top + endRect.height,
  );

  let width = right - left;
  let height = bottom - top;

  return { top, bottom, left, right, width, height };
};

const ERROR_LIMIT = 2;

const getCorrectBoundary = (el: Element, currentBoundary: IBoundaryRect) => {
  const tableEl = el.parentElement?.parentElement?.parentElement;
  if (!tableEl) {
    return null;
  }
  let leftTopCell = el;
  let bottomRightCell = el;
  let leftTopRect = getEditorElementClientRect(el);
  let bottomRightRect = leftTopRect;

  const tableCells = tableEl.querySelectorAll('td');
  const tableCellRects = [] as any[];
  tableCells.forEach(tableCell => {
    // TODO: reduce  calculation: cache table rect, use table rect diff all td rect boundary
    const { left, top, height, width } = getEditorElementClientRect(tableCell);
    tableCellRects.push({ left, top, height, width });
    let isIntersected =
      ((left + ERROR_LIMIT >= currentBoundary.left &&
        left + ERROR_LIMIT <= currentBoundary.right) ||
        (left - ERROR_LIMIT + width >= currentBoundary.left &&
          left - ERROR_LIMIT + width <= currentBoundary.right)) &&
      ((top + ERROR_LIMIT >= currentBoundary.top &&
        top + ERROR_LIMIT <= currentBoundary.bottom) ||
        (top - ERROR_LIMIT + height >= currentBoundary.top &&
          top - ERROR_LIMIT + height <= currentBoundary.bottom));
    if (isIntersected) {
      currentBoundary = getBoundaryFromRects(currentBoundary, {
        left,
        top,
        height,
        width,
      });
    }
  });

  tableCells.forEach((tableCell, index) => {
    const { left, top, height, width } = tableCellRects[index];
    let isIntersected =
      ((left + ERROR_LIMIT >= currentBoundary.left &&
        left + ERROR_LIMIT <= currentBoundary.right) ||
        (left - ERROR_LIMIT + width >= currentBoundary.left &&
          left - ERROR_LIMIT + width <= currentBoundary.right)) &&
      ((top + ERROR_LIMIT >= currentBoundary.top &&
        top + ERROR_LIMIT <= currentBoundary.bottom) ||
        (top - ERROR_LIMIT + height >= currentBoundary.top &&
          top - ERROR_LIMIT + height <= currentBoundary.bottom));
    if (!isIntersected) {
      return;
    }

    if (top <= leftTopRect.top && left <= leftTopRect.left) {
      leftTopRect = tableCellRects[index];
      leftTopCell = tableCell;
    }
    if (
      top === leftTopRect.top + ERROR_LIMIT ||
      (top === leftTopRect.top && left <= leftTopRect.left)
    ) {
      leftTopRect = tableCellRects[index];
      leftTopCell = tableCell;
    }
    if (
      top + height > bottomRightRect.top + bottomRightRect.height + ERROR_LIMIT ||
      (top + height === bottomRightRect.top + bottomRightRect.height &&
        left + width >= bottomRightRect.left + bottomRightRect.width)
    ) {
      bottomRightRect = tableCellRects[index];
      bottomRightCell = tableCell;
    }
  });

  return { leftTopCell, bottomRightCell, boundary: currentBoundary };
};

// get selected boundary and correct let-top-dom, right-bottom-dom
export const getBoundaryRectAndElement = (el1: Element, el2: Element) => {
  const rect1 = getEditorElementClientRect(el1);
  const rect2 = getEditorElementClientRect(el2);

  const boundary = getBoundaryFromRects(rect1, rect2);

  return getCorrectBoundary(el1, boundary);
};

export function setStyle(domNode: any, rules: any) {
  if (typeof rules === 'object') {
    for (let prop in rules) {
      domNode.style[prop] = rules[prop];
    }
  }
}

export const getCurrentTable = (target: Element) => {
  let parentNode = target.parentNode;
  while (parentNode) {
    if (parentNode.nodeName === 'TABLE') {
      return parentNode;
    }
    parentNode = parentNode.parentNode;
  }
  return parentNode;
};

export const getElementsBoundary = (el1: Element, el2: Element): IBoundingPosition => {
  const rect1 = el1.getBoundingClientRect();
  const rect2 = el2.getBoundingClientRect();

  const left = Math.min(rect1.left, rect2.left);
  const right = Math.max(rect1.right, rect2.right);
  const bottom = Math.max(rect1.bottom, rect2.bottom);
  const top = Math.min(rect1.top, rect2.top);

  return { left, top, right, bottom };
};

export const checkEventInBoundingRect = (
  rect: IBoundingPosition,
  { x, y }: { x: number; y: number },
) => {
  return x >= rect.left && x <= rect.right && y <= rect.bottom && y >= rect.top;
};

export const getCellAttr = (el: Element, attrName: string) => {
  const value = el.getAttribute(attrName);

  return Number(value || 0);
};

const getCellIndex = (cellElement: Element) => {
  let idxName = cellElement.getAttribute(DATA_CONTENT_EDITABLE_IDX) as string;
  idxName = idxName.split('data.value.tableSource.')[1].split('.content')[0];

  return idxName.split('.').map(e => Number(e));
};

export const getTdBoundaryIndex = (leftTopCell: Element, bottomRightCell: Element) => {
  const idx1 = getCellIndex(leftTopCell);
  const idx2 = getCellIndex(bottomRightCell);

  const top = idx1[0];
  const left = idx1[1];
  const right = idx2[1];
  const bottom = idx2[0];

  return { left, top, right, bottom };
};

export const getCorrectTableIndexBoundary = (
  tableIndexBoundary: IBoundingPosition,
  tableData: IOperationData[][],
) => {
  let { left, right, top, bottom } = tableIndexBoundary;
  // set top, bottom index
  tableData.forEach((tr, trIndex) => {
    tr.forEach(td => {
      td.top = trIndex;
      td.bottom = trIndex + (td.rowSpan || 1) - 1;
    });
  });
  // set right ,left index
  const maxTdCount = getMaxTdCount(tableData);
  const mergedCells = [] as [number, number][]; // [trIndex, tdIndex]
  Array.from({ length: maxTdCount }).forEach((_, tdIndex) => {
    tableData.forEach((tr, trIndex) => {
      const mergedCell = mergedCells.find(e => e[0] === trIndex && e[1] === tdIndex);
      if (mergedCell) {
        return;
      }
      const mergedTds = mergedCells.filter(e => e[0] === trIndex && e[1] < tdIndex);
      const _tdIndex = tdIndex - mergedTds.length;
      const td = tr[_tdIndex];
      if (!td) {
        console.log('error case, should fix this error.');
        return;
      }
      const rowSpan = td.rowSpan || 1;
      const colSpan = td.colSpan || 1;
      td.left = tdIndex;
      td.right = tdIndex + colSpan - 1;

      if (rowSpan > 1 || colSpan > 1) {
        Array.from({ length: rowSpan }).forEach((_, rowSpanIndex) => {
          Array.from({ length: colSpan }).forEach((_, colSpanIndex) => {
            if (rowSpanIndex === 0 && colSpanIndex === 0) {
              return;
            }
            mergedCells.push([trIndex + rowSpanIndex, tdIndex + colSpanIndex]);
          });
        });
      }
    });
  });

  tableIndexBoundary.left = tableData?.[top]?.[left]?.left || 0;
  tableIndexBoundary.right = tableData?.[bottom]?.[right]?.right || 0;
  tableIndexBoundary.bottom = tableData?.[bottom]?.[right]?.bottom || 0;
  tableIndexBoundary.top = tableData?.[top]?.[left]?.top || 0;

  return tableIndexBoundary;
};

export const getMaxTdCount = (
  tableData: AdvancedTableBlock['data']['value']['tableSource'],
) => {
  let tdCount = 1;
  tableData.forEach(tr => {
    let _tdCount = tr.reduce((count, td) => count + (td.colSpan || 1), 0);
    if (_tdCount > tdCount) {
      tdCount = _tdCount;
    }
  });
  return tdCount;
};
