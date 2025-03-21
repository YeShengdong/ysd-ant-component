import {
  AnimateLayoutChanges,
  NewIndexGetter,
  useSortable,
} from "@dnd-kit/sortable";
import { Item } from "../Item";
import { UniqueIdentifier } from "@dnd-kit/core";
import { SortableProps } from "../../interface";
import React, { ReactNode } from "react";
import { calculateWrapperStyle } from "../../utils";
import { useDomResize } from "../../../../hooks";

interface SortableItemProps {
  animateLayoutChanges?: AnimateLayoutChanges;
  disabled?: boolean;
  getNewIndex?: NewIndexGetter;
  id: UniqueIdentifier;
  index: number;
  handle: boolean;
  useDragOverlay?: boolean;
  onRemove?(id: UniqueIdentifier): void;
  onChange?(newItem: Record<string, unknown>): void;
  style(values: any): React.CSSProperties;
  renderItem?(args: any): React.ReactElement;
  wrapperStyle: SortableProps["wrapperStyle"];
  data: Record<string, unknown>;
  containerRef: React.RefObject<HTMLDivElement>;
  minHeight?: number;
  gridColumns?: number;
}

export function SortableItem({
  disabled,
  animateLayoutChanges,
  getNewIndex,
  handle,
  id,
  index,
  onRemove,
  onChange,
  style,
  renderItem,
  useDragOverlay,
  wrapperStyle,
  containerRef,
  gridColumns,
  data,
  minHeight = 110,
}: SortableItemProps) {
  const {
    active,
    attributes,
    isDragging,
    isSorting,
    listeners,
    overIndex,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    node,
  } = useSortable({
    id,
    animateLayoutChanges,
    disabled,
    getNewIndex,
  });

  useDomResize(node, {
    withTemp: true,
    onResizeEnd: (width: number, height: number) => {
      if (!node.current) {
        return;
      }

      const { wrapperStyle = {}, name }: any = data;

      const newWrapperStyle = calculateWrapperStyle({
        width,
        height,
        minHeight,
        gridColumns,
        containerRef,
        wrapperStyle,
      });
      const { height: sectionHeight } = newWrapperStyle;
      const newContent = (
        <h2 className="dndPlaceholderName">
          {name}-模块高度：{sectionHeight ? `${sectionHeight}px` : "auto"}
        </h2>
      );

      onChange?.({ ...data, content: newContent, wrapperStyle: newWrapperStyle });
      node.current.style.removeProperty("width");
      // node.current.style.removeProperty('height');
    },
  });

  const { content } = data;

  return (
    <Item
      ref={setNodeRef}
      value={content as ReactNode}
      disabled={disabled}
      dragging={isDragging}
      sorting={isSorting}
      handle={handle}
      handleProps={
        handle
          ? {
              ref: setActivatorNodeRef,
            }
          : undefined
      }
      renderItem={renderItem}
      index={index}
      style={style({
        index,
        id,
        isDragging,
        isSorting,
        overIndex,
      })}
      onRemove={onRemove ? () => onRemove(id) : undefined}
      transform={transform}
      transition={transition}
      wrapperStyle={wrapperStyle?.({
        index,
        isDragging,
        active,
        id,
        customConfig: data,
      })}
      listeners={listeners}
      data-index={index}
      data-id={id}
      dragOverlay={!useDragOverlay && isDragging}
      {...attributes}
    />
  );
}
