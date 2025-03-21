import type { Meta, StoryObj } from "@storybook/react";
import { DndKitSortable, GridContainer, SortableProps } from "../";
import React, { useMemo, useRef, useState } from "react";
import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { MeasuringStrategy } from "@dnd-kit/core";
import { Button, Select, Space } from "antd";
import { getItemByConfig, getItemsByConfig } from "./utils";
import { DEFAULT_WRAPPER_STYLE, GRID_COLUMN_COUNT } from "./config";
import { generateNewWorkableConfigs } from "./utils";
import { mockAllSectionList } from "./mock";
import { orderBy } from "lodash-es";

const meta: Meta<typeof DndKitSortable> = {
  title: "Example/DndKitSortable",
  component: DndKitSortable,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DndKitSortable>;

const gridColumns = GRID_COLUMN_COUNT;

const defaultSectionList = orderBy(
  mockAllSectionList.filter((opt: any) => opt.isShow),
  ["orderNo"]
);

const DndKitSortableWithHooks = () => {
  const containerRef = useRef<HTMLUListElement>(null);
  const [loading, setLoading] = useState(false);
  const [allSectionList, setAllSectionList] =
    useState<any[]>(mockAllSectionList);
  const [items, setItems] = useState<any[]>(
    getItemsByConfig(defaultSectionList)
  );
  const selectedSectionValues = useMemo(() => {
    return items.map(({ id }) => id);
  }, [items]);

  const dndKitSortableProps: Partial<SortableProps> = useMemo(() => {
    return {
      adjustScale: true,
      gridColumns,
      Container: (props: any) => (
        <GridContainer {...props} ref={containerRef} columns={gridColumns} />
      ),
      strategy: rectSortingStrategy,
      wrapperStyle: () => ({
        width: 140,
        height: 140,
      }),
    };
  }, [gridColumns]);

  const animateLayoutChanges: AnimateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true });

  const handleSaveButtonClick = async () => {
    const newWorkableConfigs = generateNewWorkableConfigs(
      allSectionList,
      items
    );

    setLoading(true);

    setAllSectionList(newWorkableConfigs);

    setLoading(false);
  };

  const handleSectionSelectChange = (values: any[]) => {
    const newItems = items.filter((item) => values.includes(item.id));

    values.forEach((functionCode: string) => {
      const item = newItems.find((item) => item.id === functionCode);

      if (!item) {
        const newSection = allSectionList.find(
          (config: any) => config.functionCode === functionCode
        );

        if (newSection) {
          newItems.push(getItemByConfig(newSection));
        }
      }
    });

    setItems(newItems);
  };

  return (
    <div style={{ padding: "20px 40px" }}>
      <Space>
        <Button
          style={{ display: "none" }}
          loading={loading}
          type="primary"
          onClick={handleSaveButtonClick}
        >
          保存
        </Button>
        <Space>
          <span>已选模块:</span>
          <Select
            style={{ width: 300 }}
            options={allSectionList}
            value={selectedSectionValues}
            fieldNames={{ label: "functionName", value: "functionCode" }}
            onChange={handleSectionSelectChange}
            mode="multiple"
          />
        </Space>
      </Space>
      <DndKitSortable
        {...dndKitSortableProps}
        containerRef={containerRef}
        useDragOverlay={false}
        items={items}
        updateItems={setItems}
        animateLayoutChanges={animateLayoutChanges}
        measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
        removable
        handle
        // isDisabled={() => !isEditable}
        // itemCount={14}
        // getItemStyles={({ id }) => {
        //   if (id === '1') {
        //     return {
        //       fontSize: '2rem',
        //       padding: '36px 40px',
        //     };
        //   }

        //   return {};
        // }}
        wrapperStyle={({ customConfig }) => {
          const { wrapperStyle } = customConfig || {};

          return {
            ...DEFAULT_WRAPPER_STYLE,
            ...wrapperStyle,
          };
        }}
      />
    </div>
  );
};

export const Demo: Story = {
  render: () => <DndKitSortableWithHooks />,
};
