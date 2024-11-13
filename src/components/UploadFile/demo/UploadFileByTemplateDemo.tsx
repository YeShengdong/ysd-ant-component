import { UploadFile } from 'antd';
import { UploadFileByTemplate } from 'founderintl-fis-components';
import React, { CSSProperties } from 'react';

export default () => {
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
