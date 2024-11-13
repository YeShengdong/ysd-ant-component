import type { Meta, StoryObj } from "@storybook/react";
import { ApproveStepList } from "../";
import React, { CSSProperties, useState } from "react";
import { ApproveStepListData } from "../interface";

const meta: Meta<typeof ApproveStepList> = {
  title: "Example/ApproveStepList",
  component: ApproveStepList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ApproveStepList>;

const ApproveStepListWithHooks = () => {
  const [isExpand, setIsExpand] = useState(false);

  const data: ApproveStepListData = [
    {
      taskId: "e9da7a72-0393-11ef-bfc7-e88088b5cf97",
      endTime: "2024-04-26 14:12:10",
      taskName: "申请人",
      assigneeName: "姚琳",
      comment: "退回意见",
      durationDesc: "小于1分钟",
      action: "return",
      actionName: "退回",
    },
    {
      taskId: "eb263460-0393-11ef-bfc7-e88088b5cf97",
      endTime: null,
      taskName: "MBP",
      assigneeName: "朱向晖（新址主管）",
      comment: null,
      durationDesc: "",
    },
    {
      taskId: null,
      endTime: null,
      taskName: "厂商",
      assigneeName: "上海亦与智能",
      comment: null,
      durationDesc: "",
    },
  ];

  const containerStyle: CSSProperties = {};

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        padding: 20,
        display: "flex",
        gap: 20,
      }}
    >
      <div style={containerStyle}>
        <ApproveStepList data={data} loading={true} />
      </div>
      <div style={containerStyle}>
        <ApproveStepList data={data} />
      </div>
      <div style={containerStyle}>
        <div style={{ height: 250 }}>
          <ApproveStepList data={data} />
        </div>
      </div>
      <div style={containerStyle}>
        <div>
          <ApproveStepList />
        </div>
      </div>
      <div style={containerStyle}>
        <ApproveStepList
          data={data}
          isExpand={isExpand}
          onExpandClick={(value) => {
            setIsExpand(value);
          }}
        />
      </div>
    </div>
  );
};

export const Demo: Story = {
  render: () => <ApproveStepListWithHooks />,
};
