import {
  Active,
  CollisionDetection,
  DropAnimation,
  KeyboardCoordinateGetter,
  Modifiers,
  MeasuringConfiguration,
  PointerActivationConstraint,
  UniqueIdentifier,
} from '@dnd-kit/core';
import { arrayMove, SortingStrategy, AnimateLayoutChanges, NewIndexGetter } from '@dnd-kit/sortable';
import React from 'react';

export interface SortableItem {
  id: UniqueIdentifier;
  content: React.ReactNode;
  [key: string]: unknown;
}

export interface SortableProps {
  activationConstraint?: PointerActivationConstraint;
  animateLayoutChanges?: AnimateLayoutChanges;
  adjustScale?: boolean;
  collisionDetection?: CollisionDetection;
  coordinateGetter?: KeyboardCoordinateGetter;
  Container: any;
  gridColumns?: number;
  containerRef: React.RefObject<any>;
  dropAnimation?: DropAnimation | null;
  getNewIndex?: NewIndexGetter;
  handle?: boolean;
  itemCount?: number;
  items: SortableItem[];
  updateItems: <T extends SortableItem>(items: T[] | ((prevItems: T[]) => T[])) => void;
  measuring?: MeasuringConfiguration;
  modifiers?: Modifiers;
  renderItem?: any;
  removable?: boolean;
  reorderItems?: typeof arrayMove;
  strategy?: SortingStrategy;
  style?: React.CSSProperties;
  useDragOverlay?: boolean;
  getItemStyles?(args: {
    id: UniqueIdentifier;
    index: number;
    isSorting: boolean;
    isDragOverlay: boolean;
    overIndex: number;
    isDragging: boolean;
    customConfig: Record<string, any>;
  }): React.CSSProperties;
  wrapperStyle?(args: {
    active: Pick<Active, 'id'> | null;
    index: number;
    isDragging: boolean;
    id: UniqueIdentifier;
    customConfig: Record<string, any>;
  }): React.CSSProperties;
  isDisabled?(id: UniqueIdentifier): boolean;
}
