import { Button, Popconfirm, Space, Table } from 'antd';
import React from 'react';
import { DATE_TIME_FORMAT } from '../../constants';
import { createDateRender, createTooltipRender } from '../../utils';
import { ImagePreviewButton } from '../ImagePreviewButton';
import { AttachmentListItem, AttachmentListProps } from './interface';

export * from './interface';

export const AttachmentList = ({
  data,
  loading = false,
  readonly = false,
  isDeleteAble = true,
  isDownloadAble = true,
  isPreviewAble = true,
  onDownload,
  onDelete,
  createPreviewUrlFn,
}: AttachmentListProps) => {
  const columns: any = [
    {
      title: '类型',
      dataIndex: 'fileType',
      width: 30,
    },
    {
      title: '文件名',
      dataIndex: 'fileName',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: createTooltipRender(),
    },
    {
      title: '上传时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      width: 80,
      render: createDateRender({ format: DATE_TIME_FORMAT }),
    },
    {
      title: '操作人',
      dataIndex: 'creatorName',
      width: 50,
    },
    {
      title: '操作',
      dataIndex: 'id',
      width: 60,
      align: 'center',
      render: (_: string, row: AttachmentListItem) => {
        const { fileName } = row;
        const previewUrl = createPreviewUrlFn?.(row);

        return (
          <Space>
            {isDownloadAble ? (
              <Button type="link" size="small" onClick={() => onDownload(row)}>
                下载
              </Button>
            ) : null}
            {isPreviewAble ? <ImagePreviewButton url={previewUrl} fileName={fileName} /> : null}
            {readonly || !isDeleteAble ? null : (
              <Popconfirm
                title="是否删除该条记录？"
                onConfirm={() => {
                  onDelete(row);
                }}
              >
                <Button type="link" size="small">
                  删除
                </Button>
              </Popconfirm>
            )}
          </Space>
        )
      },
    },
  ];

  return (
    <Table
      rowKey={'id'}
      columns={columns}
      dataSource={data as unknown as Record<string, unknown>[]}
      loading={loading}
      scroll={{ y: 400 }}
      pagination={{ hideOnSinglePage: true, simple: true, size: 'small' }}
    />
  );
};
