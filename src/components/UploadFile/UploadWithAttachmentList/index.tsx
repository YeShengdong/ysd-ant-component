import { UploadOutlined } from '@ant-design/icons';
import { Button, Modal, Typography, Upload } from 'antd';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import { get } from 'lodash-es';
import React, { useEffect, useMemo, useState } from 'react';
import {
  alertErrorMessage,
  downloadFile,
  fisMessage,
  getPrefixCls,
  isSuccessResponse,
} from '../../../utils';
import { AttachmentList, AttachmentListItem } from '../../AttachmentList';
import { defaultAllAccept } from '../config';
import {
  checkFileSizeLimit,
  getAcceptDisplayText,
  getAcceptMessage,
  showFileSizeLimitMessage,
} from '../utils';
import './index.less';
import { UploadWithAttachmentListProps } from './interface';

const { Text } = Typography;
const COMPONENT_CLASS = 'upload-attachment';

export const UploadWithAttachmentList = ({
  value,
  readonly = false,
  isDeleteAble = true,
  isDownloadAble = true,
  isPreviewAble = true,
  uploadConfig = {},
  buttonConfig = {},
  maxUploadSize = 20,
  onChange,
  onAttachmentListChange,
  queryAttachmentListService,
  downloadAttachmentService,
  deleteAttachmentService,
  createPreviewUrlFn,
}: UploadWithAttachmentListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [attachmentList, setAttachmentList] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const { children: buttonChildren = '点击上传' } = buttonConfig;
  const { data: uploadDataConfig = {}, accept } = uploadConfig;
  const prefixCls = getPrefixCls(COMPONENT_CLASS);
  const maxUploadSizeWithUnit = `${maxUploadSize}MB`;
  const tips = useMemo(() => {
    const acceptString = accept
      ? getAcceptDisplayText(accept)
      : `${getAcceptDisplayText(defaultAllAccept)}...`;

    return `只能上传${acceptString}文件，且不超过${maxUploadSizeWithUnit}`;
  }, [accept, maxUploadSizeWithUnit]);

  const clearAttachmentList = () => {
    setAttachmentList([]);
  };

  const refreshList = () => {
    setRefreshFlag(!refreshFlag);
  };

  useEffect(() => {
    if (!isModalOpen || !value) {
      clearAttachmentList();

      return;
    }

    let abortController: AbortController | null = null;

    const updateAttachmentList = async () => {
      setIsLoading(true);

      const params = {
        queryModel: { queryAttachmentId: value },
      };

      try {
        abortController = new AbortController();

        const res = await queryAttachmentListService(params, {
          signal: abortController.signal,
        });

        if (!isSuccessResponse(res)) {
          throw new Error(res.message);
        }

        const { data, total } = res.data;

        setAttachmentList(data);
        onAttachmentListChange?.({ total });
      } catch (error) {
        alertErrorMessage(error);
      } finally {
        setIsLoading(false);
      }
    };

    updateAttachmentList();

    return () => {
      abortController?.abort();
    };
  }, [isModalOpen, value, refreshFlag]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    clearAttachmentList();
  };

  const handleButtonClick = () => {
    showModal();
  };

  const handleDownload = (row: AttachmentListItem) => {
    setIsLoading(true);

    const { id } = row;

    downloadAttachmentService({
      id,
      attachmentId: value,
    })
      .then((res) => {
        if (!isSuccessResponse(res)) {
          throw new Error(res.message);
        }

        const { fileData, fileName } = res.data || {};

        if (fileData) {
          downloadFile(fileData, fileName);
        }
      })
      .catch((error) => {
        alertErrorMessage(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDelete = (row: AttachmentListItem) => {
    setIsLoading(true);

    const { id } = row;
    const ids = [id ?? 0];

    deleteAttachmentService({ ids })
      .then((res) => {
        if (!isSuccessResponse(res)) {
          throw new Error(res.message);
        }

        refreshList();
      })
      .catch((error) => {
        alertErrorMessage(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleBeforeUpload = (file: RcFile) => {
    let result = true;
    const { name, size } = file;
    const splitName = name.split('.');
    const fileExtension = splitName[splitName.length - 1];

    if (!checkFileSizeLimit(size, maxUploadSize)) {
      result = false;

      showFileSizeLimitMessage(maxUploadSizeWithUnit);
    } else if (accept && !accept.includes(fileExtension)) {
      result = false;

      const acceptMessage = getAcceptMessage(accept);

      fisMessage.error(`文件类型只支持${acceptMessage}!`);
    }

    if (!result) {
      return Upload.LIST_IGNORE;
    }

    return result;
  };

  const handleUploadChange = (info: UploadChangeParam) => {
    const { file } = info;
    const { status } = file;

    if (status === 'uploading' && !isUploading) {
      setIsUploading(true);

      return;
    }

    if (status === 'done') {
      const res = file.response;
      const { message, data } = res;

      if (isSuccessResponse(res)) {
        fisMessage.success('上传成功！');

        const attachmentId = get(data, '0.attachmentId', 0);

        onChange?.(attachmentId);
        refreshList();
      } else {
        fisMessage.error(message || '上传失败！');
      }

      setIsUploading(false);
    } else if (status === 'error') {
      fisMessage.error('上传失败！');
      setIsUploading(false);
    }
  };

  return (
    <>
      <Button
        icon={<UploadOutlined />}
        {...buttonConfig}
        onClick={handleButtonClick}
      >
        {buttonChildren}
      </Button>
      <Modal
        title="附件列表"
        open={isModalOpen}
        width={1000}
        onCancel={handleCancel}
        destroyOnClose
        footer={null}
      >
        {!readonly && (
          <div className={`${prefixCls}-button-wrap`}>
            <Upload
              name="file"
              beforeUpload={handleBeforeUpload}
              onChange={handleUploadChange}
              showUploadList={false}
              data={{
                attachmentId: value || 0,
                title: '',
                ...uploadDataConfig,
              }}
              accept={accept}
              {...uploadConfig}
            >
              <Button
                icon={<UploadOutlined />}
                type="primary"
                loading={isUploading}
              >
                点击上传
              </Button>
            </Upload>
            {tips ? (
              <Text type="secondary" className={`${prefixCls}-tips`}>
                {tips}
              </Text>
            ) : null}
          </div>
        )}
        <AttachmentList
          data={attachmentList}
          loading={isLoading}
          readonly={readonly}
          isDeleteAble={isDeleteAble}
          isDownloadAble={isDownloadAble}
          isPreviewAble={isPreviewAble}
          onDownload={handleDownload}
          onDelete={handleDelete}
          createPreviewUrlFn={createPreviewUrlFn}
        />
      </Modal>
    </>
  );
};
