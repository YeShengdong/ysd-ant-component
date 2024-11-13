import type { Meta, StoryObj } from "@storybook/react";
import { LabelSelect } from "../";
import React, { useState } from "react";
import { restCode } from "../../../constants";

const meta: Meta<typeof LabelSelect> = {
  title: "Example/LabelSelect",
  component: LabelSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof LabelSelect>;

const LabelSelectWithHooks = () => {
  const [value, setValue] = useState<number | any>(3);

  const getLabelListService = (): any => {
    return Promise.resolve({
      code: restCode.success,
      data: [
        {
          id: 1,
          labelName: "模拟标签1",
          labelColour: "gold",
          labelBelongModule: "1",
        },
        {
          id: 2,
          labelName: "模拟标签2",
          labelColour: "green",
          labelBelongModule: "1",
        },
        {
          id: 3,
          labelName: "模拟标签3",
          labelColour: "cyan",
          labelBelongModule: "1",
        },
      ],
      message: null,
    });
  };

  const removeLabelService = (): any => {
    return Promise.resolve({
      code: restCode.success,
      data: "",
      message: null,
    });
  };

  const getLabelColorListService = (): any => {
    return Promise.resolve({
      code: restCode.success,
      data: [
        {
          id: 1,
          labelColour: "magenta",
        },
        {
          id: 2,
          labelColour: "red",
        },
        {
          id: 3,
          labelColour: "volcano",
        },
        {
          id: 4,
          labelColour: "orange",
        },
        {
          id: 5,
          labelColour: "gold",
        },
        {
          id: 6,
          labelColour: "lime",
        },
        {
          id: 7,
          labelColour: "green",
        },
        {
          id: 8,
          labelColour: "cyan",
        },
        {
          id: 9,
          labelColour: "blue",
        },
        {
          id: 10,
          labelColour: "geekblue",
        },
        {
          id: 11,
          labelColour: "purple",
        },
      ],
      message: null,
    });
  };

  const saveLabelService = (): any => {
    return Promise.resolve({
      code: restCode.success,
      data: "",
      message: null,
    });
  };

  const handleChange = (value: any) => {
    setValue(value);
  };

  return (
    <div style={{ width: 300 }}>
      <LabelSelect
        moduleType={1}
        getLabelListService={getLabelListService}
        removeLabelService={removeLabelService}
        getLabelColorListService={getLabelColorListService}
        saveLabelService={saveLabelService}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export const Demo: Story = {
  render: () => <LabelSelectWithHooks />,
};
