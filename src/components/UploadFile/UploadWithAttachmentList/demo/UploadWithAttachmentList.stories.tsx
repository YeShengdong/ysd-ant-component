import type { Meta, StoryObj } from "@storybook/react";
import { UploadWithAttachmentList } from "../";
import React, { CSSProperties } from "react";
import { downloadAttachmentApiData, queryAttachmentListApiData } from "./mockData";
// import previewImage from '../../../../assets/preview-image.jpg';

const meta: Meta<typeof UploadWithAttachmentList> = {
  title: "Example/UploadWithAttachmentList",
  component: UploadWithAttachmentList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof UploadWithAttachmentList>;

const UploadWithAttachmentListWithHooks = () => {
  const attachmentId = 1;

  const rootStyle: CSSProperties = {
    gap: 12,
    display: 'flex',
  };

  const delAttachment = async () => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(void 0);
      }, 1000);
    });
  };

  const downloadAttachment = async () => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(downloadAttachmentApiData);
      }, 1000);
    });
  };

  const queryAttachmentList = async () => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(queryAttachmentListApiData);
      }, 1000);
    });
  };

  const createPreviewUrl = (row: any) => {
    console.log('[row]', row);

    return '/preview-image.jpg';
  };

  const attachmentUploadConfig: any = {
    queryAttachmentListService: queryAttachmentList,
    downloadAttachmentService: downloadAttachment,
    deleteAttachmentService: delAttachment,
    createPreviewUrlFn: createPreviewUrl,
    uploadConfig: {
      // headers: { Token: `${token}` },
      // action: UPLOAD_FILE_ACTION,
      // accept: defaultExcelAccept
    },
    buttonConfig: {
      type: 'link',
      icon: null,
      style: {
        padding: 0,
      },
      children: '附件列表(4)',
    },
    maxUploadSize: 30,
  };

  return (
    <div style={rootStyle}>
      <UploadWithAttachmentList
        {...attachmentUploadConfig}
        value={attachmentId}
        // readonly={true}
        // isDeleteAble={false}
        // isDownloadAble={false}
        // isPreviewAble={false}
      />
    </div>
  );
};

export const Demo: Story = {
  render: () => <UploadWithAttachmentListWithHooks />,
};
