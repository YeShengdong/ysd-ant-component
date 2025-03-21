import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import {
  Announcements,
  closestCenter,
  DragOverlay,
  DndContext,
  DropAnimation,
  KeyboardSensor,
  MouseSensor,
  ScreenReaderInstructions,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable';

import { Item } from './components/Item';
// import { List } from './components/List';
import { Wrapper } from './components/Wrapper';
import { SortableItem } from './components/SortableItem';
import { SortableProps } from './interface';

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

const screenReaderInstructions: ScreenReaderInstructions = {
  draggable: `
    To pick up a sortable item, press the space bar.
    While sorting, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `,
};

export const DndKitSortable = ({
  activationConstraint,
  animateLayoutChanges,
  adjustScale = false,
  containerRef,
  Container,
  gridColumns,
  collisionDetection = closestCenter,
  coordinateGetter = sortableKeyboardCoordinates,
  dropAnimation = dropAnimationConfig,
  getItemStyles = () => ({}),
  getNewIndex,
  handle = false,
  // itemCount = 16,
  items,
  isDisabled = () => false,
  measuring,
  modifiers,
  removable,
  renderItem,
  reorderItems = arrayMove,
  strategy = rectSortingStrategy,
  style,
  useDragOverlay = true,
  wrapperStyle = () => ({}),
  updateItems,
}: SortableProps) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint,
    }),
    useSensor(TouchSensor, {
      activationConstraint,
    }),
    useSensor(KeyboardSensor, {
      // Disable smooth scrolling in Cypress automated tests
      scrollBehavior: 'Cypress' in window ? 'auto' : undefined,
      coordinateGetter,
    })
  );
  const isFirstAnnouncement = useRef(true);
  const getIndex = (id: UniqueIdentifier) => items.findIndex((item) => item.id === id);
  const getPosition = (id: UniqueIdentifier) => getIndex(id) + 1;
  const activeIndex = activeId !== null ? getIndex(activeId) : -1;

  // const updateItems = <T extends Record<string, unknown>>(newItems: T[] | ((prevItems: T[]) => T[])) => {
  //   setItems(newItems as any);
  // };

  const handleRemove = removable
    ? (id: UniqueIdentifier) => updateItems((items) => items.filter((item) => item.id !== id))
    : undefined;
  const announcements: Announcements = {
    onDragStart({ active: { id } }) {
      return `Picked up sortable item ${String(id)}. Sortable item ${id} is in position ${getPosition(id)} of ${
        items.length
      }`;
    },
    onDragOver({ active, over }) {
      // In this specific use-case, the picked up item's `id` is always the same as the first `over` id.
      // The first `onDragOver` event therefore doesn't need to be announced, because it is called
      // immediately after the `onDragStart` announcement and is redundant.
      if (isFirstAnnouncement.current === true) {
        isFirstAnnouncement.current = false;
        return;
      }

      if (over) {
        return `Sortable item ${active.id} was moved into position ${getPosition(over.id)} of ${items.length}`;
      }

      return;
    },
    onDragEnd({ active, over }) {
      if (over) {
        return `Sortable item ${active.id} was dropped at position ${getPosition(over.id)} of ${items.length}`;
      }

      return;
    },
    onDragCancel({ active: { id } }) {
      return `Sorting was cancelled. Sortable item ${id} was dropped and returned to position ${getPosition(id)} of ${
        items.length
      }.`;
    },
  };

  useEffect(() => {
    if (activeId === null) {
      isFirstAnnouncement.current = true;
    }
  }, [activeId]);

  const handleItemChange = (newItem: any) => {
    const { id } = newItem;
    const newItems = items.map((item) => {
      if (item.id === id) {
        return newItem;
      }
      return item;
    });

    updateItems(newItems);
  };

  return (
    <DndContext
      accessibility={{
        announcements,
        screenReaderInstructions,
      }}
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={({ active }) => {
        if (!active) {
          return;
        }

        setActiveId(active.id);
      }}
      onDragEnd={({ over }) => {
        setActiveId(null);

        if (over) {
          const overIndex = getIndex(over.id);
          if (activeIndex !== overIndex) {
            updateItems((items) => reorderItems(items, activeIndex, overIndex));
          }
        }
      }}
      onDragCancel={() => setActiveId(null)}
      measuring={measuring}
      modifiers={modifiers}
    >
      <Wrapper style={style} center>
        <SortableContext items={items} strategy={strategy}>
          <Container>
            {items.map((item, index) => {
              const { id } = item;

              return (
                <SortableItem
                  key={id}
                  id={id}
                  data={item}
                  handle={handle}
                  index={index}
                  style={getItemStyles}
                  wrapperStyle={wrapperStyle}
                  disabled={isDisabled(id)}
                  renderItem={renderItem}
                  onRemove={handleRemove}
                  animateLayoutChanges={animateLayoutChanges}
                  useDragOverlay={useDragOverlay}
                  getNewIndex={getNewIndex}
                  onChange={handleItemChange}
                  containerRef={containerRef}
                  gridColumns={gridColumns}
                />
              );
            })}
          </Container>
        </SortableContext>
      </Wrapper>
      {useDragOverlay
        ? createPortal(
            <DragOverlay adjustScale={adjustScale} dropAnimation={dropAnimation}>
              {activeId !== null ? (
                <Item
                  value={items[activeIndex]?.content}
                  handle={handle}
                  renderItem={renderItem}
                  wrapperStyle={wrapperStyle({
                    active: { id: activeId },
                    index: activeIndex,
                    isDragging: true,
                    id: items[activeIndex].id,
                    customConfig: items,
                  })}
                  style={getItemStyles({
                    id: items[activeIndex].id,
                    index: activeIndex,
                    isSorting: activeId !== null,
                    isDragging: true,
                    overIndex: -1,
                    isDragOverlay: true,
                    customConfig: items,
                  })}
                  dragOverlay
                />
              ) : null}
            </DragOverlay>,
            document.body
          )
        : null}
    </DndContext>
  );
};
