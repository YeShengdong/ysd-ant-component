import { useEffect, useRef, useState } from 'react';

interface OptionsProps {
  borderWidth?: number;
  onResizeEnd?: (width: number, height: number) => void;
  withTemp?: boolean;
}

export const useDomResize = (domRef: any = null, options: OptionsProps) => {
  const { borderWidth = 5, onResizeEnd, withTemp = false } = options;
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const [startHeight, setStartHeight] = useState(0);
  let tempDom = useRef<HTMLElement | null>(null);

  const checkIsInResizeBorder = (e: MouseEvent, rect: any) => {
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    return (
      // offsetX < borderWidth ||
      offsetX > rect.width - borderWidth ||
      // offsetY < borderWidth ||
      offsetY > rect.height - borderWidth
    );
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (domRef?.current) {
      const rect = domRef.current.getBoundingClientRect();
      // 判断点击位置是否在边框区域
      const isInResizeBorder = checkIsInResizeBorder(e, rect);

      if (isInResizeBorder) {
        const { clientX, clientY, pageY } = e;

        setIsResizing(true);
        setStartX(clientX);
        setStartY(clientY);
        setStartWidth(domRef.current.offsetWidth);
        setStartHeight(domRef.current.offsetHeight);

        // 创建临时 DOM 元素
        if (withTemp) {
          const temp = document.createElement('div');
          temp.style.position = 'absolute';
          temp.style.width = `${domRef.current.offsetWidth}px`;
          temp.style.height = `${domRef.current.offsetHeight}px`;
          temp.style.left = `${rect.left}px`;
          temp.style.top = `${pageY - clientY + rect.top}px`;
          temp.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
          temp.style.borderRadius = '4px';
          document.body.appendChild(temp);
          tempDom.current = temp;
        }
      }
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    const currentDom = tempDom?.current || domRef?.current;

    if (!currentDom) {
      return;
    }

    const rect = currentDom.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const isInResizeBorder = checkIsInResizeBorder(e, rect);
    let cursorType = 'default';

    if (isInResizeBorder) {
      // 根据不同的边框区域设置不同的鼠标指针样式
      if (offsetX < borderWidth && offsetY < borderWidth) {
        cursorType = 'nwse-resize';
      } else if (offsetX > rect.width - borderWidth && offsetY < borderWidth) {
        cursorType = 'nesw-resize';
      } else if (offsetX < borderWidth && offsetY > rect.height - borderWidth) {
        cursorType = 'nesw-resize';
      } else if (offsetX > rect.width - borderWidth && offsetY > rect.height - borderWidth) {
        cursorType = 'nwse-resize';
      } else if (offsetX < borderWidth) {
        cursorType = 'ew-resize';
      } else if (offsetX > rect.width - borderWidth) {
        cursorType = 'ew-resize';
      } else if (offsetY < borderWidth) {
        cursorType = 'ns-resize';
      } else if (offsetY > rect.height - borderWidth) {
        cursorType = 'ns-resize';
      }
    }

    currentDom.style.cursor = cursorType;

    if (isResizing) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      currentDom.style.width = `${startWidth + dx}px`;
      currentDom.style.height = `${startHeight + dy}px`;
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    setIsResizing(false);

    if (isResizing && domRef?.current) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const newDomWidth = startWidth + dx;
      const newDomHeight = startHeight + dy;

      onResizeEnd?.(newDomWidth, newDomHeight);

      // 移除临时 DOM 元素
      if (tempDom.current) {
        document.body.removeChild(tempDom.current);
        tempDom.current = null;
      }
    }
  };

  useEffect(() => {
    if (domRef?.current) {
      domRef.current.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        domRef.current?.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [domRef, isResizing, startX, startY, startWidth, startHeight]);
};
