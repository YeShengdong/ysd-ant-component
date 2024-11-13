import type { Meta, StoryObj } from "@storybook/react";
import { UploadFileByTemplate } from "../";
import React, { CSSProperties } from "react";
import { UploadFile } from "antd";

const meta: Meta<typeof UploadFileByTemplate> = {
  title: "Example/UploadFileByTemplate",
  component: UploadFileByTemplate,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof UploadFileByTemplate>;

const UploadFileByTemplateWithHooks = () => {
  const rootStyle: CSSProperties = {
    gap: 12,
    display: 'flex',
  };

  const handleDownloadClick = async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(void 0);
      }, 2000);
    });
  };

  const handleFileDone = async (file: UploadFile) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.info(file);
        resolve(void 0);
      }, 2000);
    });

    return {
      isSuccess: true,
    };
  };

  const mockRequest = async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(void 0);
      }, 2000);
    });

    return '';
  };

  const uploadFileByTemplateProps = {
    action: mockRequest,
    onDownloadClick: handleDownloadClick,
    onDone: handleFileDone,
  };

  return (
    <div style={rootStyle}>
      <UploadFileByTemplate {...uploadFileByTemplateProps} />
      <UploadFileByTemplate {...uploadFileByTemplateProps}>
        <button type="button">自定义按钮</button>
      </UploadFileByTemplate>
    </div>
  );
};

export const Demo: Story = {
  render: () => <UploadFileByTemplateWithHooks />,
};
