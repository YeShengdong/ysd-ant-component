import { Button, Modal, Spin, Typography, Upload } from "antd";
import { CloudDownloadOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import React, { Children, cloneElement, useState } from "react";
import { fisAlert, fisMessage, getPrefixCls } from "../../../utils";
import { DEFAULT_MAX_FILE_SIZE, defaultExcelAccept } from "../config";
import {
  checkFileSizeLimit,
  getAcceptDisplayText,
  showFileSizeLimitMessage,
} from "../utils";
import "./index.less";
import { UploadFileByTemplateProps } from "./interface";

const { Text, Paragraph } = Typography;
const COMPONENT_CLASS = "import-excel";

export const UploadFileByTemplate = ({
  name = "导入",
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  accept = defaultExcelAccept,
  children,
  onDownloadClick,
  onDone,
  onError,
  ...restUploadProps
}: UploadFileByTemplateProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const prefixCls = getPrefixCls(COMPONENT_CLASS);
  const maxFileSizeWithUnit = `${maxFileSize}MB`;

  const handleButtonClick = () => {
    setOpen(true);
  };

  const handleDownloadClick = async () => {
    setIsLoading(true);

    await onDownloadClick();

    setIsLoading(false);
  };

  const handleBeforeUpload = (file: RcFile) => {
    const limit = checkFileSizeLimit(file.size, maxFileSize);

    if (!limit) {
      showFileSizeLimitMessage(maxFileSizeWithUnit);
    } else {
      setIsLoading(true);
    }

    return limit;
  };

  const handleUploadChange = async (info: UploadChangeParam) => {
    const { file } = info;
    const { status } = file;

    if (status === "uploading") {
      return;
    }

    if (status === "done") {
      const { isSuccess, message } = await onDone(file);

      if (isSuccess) {
        fisMessage.success(message || "文件已上传，请等待系统校验");
        setOpen(false);
      } else {
        fisAlert.error(message || "上传失败！");
      }

      setIsLoading(false);
    } else if (status === "error") {
      if (onError) {
        await onError(file);
      } else {
        fisMessage.error("上传失败！");
      }

      setIsLoading(false);
    }
  };

  const renderButton = () => {
    if (!children) {
      return (
        <Button type="primary" onClick={handleButtonClick}>
          {name}
        </Button>
      );
    }

    try {
      Children.only(children);

      return Children.map(children, (child: any) => {
        return cloneElement(child, {
          onClick: () => {
            child.props.onClick?.();
            handleButtonClick();
          },
        });
      });
    } catch (error) {
      console.error(error);
    }

    return null;
  };

  return (
    <>
      {renderButton()}
      <Modal
        title={name}
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        width={760}
        footer={null}
      >
        <Spin spinning={isLoading}>
          <div className={`${prefixCls}-action-container`}>
            <div>
              <Paragraph type="secondary">
                <span className={`${prefixCls}-step-wrap`}>1</span>下载模板
              </Paragraph>
              <div className={`${prefixCls}-action-wrap`}>
                <div className={`${prefixCls}-download-area`}>
                  <div
                    className={`${prefixCls}-download-btn`}
                    onClick={handleDownloadClick}
                  >
                    <div className={`${prefixCls}-download-container`}>
                      <p className={`${prefixCls}-download-icon-wrap`}>
                        <CloudDownloadOutlined
                          className={`${prefixCls}-download-icon`}
                        />
                      </p>
                      <p className={`${prefixCls}-download-text`}>
                        点击下载Excel模版
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Paragraph type="secondary">
                <span className={`${prefixCls}-step-wrap`}>2</span>上传文件
              </Paragraph>
              <div className={`${prefixCls}-action-wrap`}>
                <Upload.Dragger
                  {...restUploadProps}
                  name="file"
                  multiple={false}
                  showUploadList={false}
                  beforeUpload={handleBeforeUpload}
                  accept={accept}
                  onChange={handleUploadChange}
                >
                  <p className="ant-upload-drag-icon">
                    <CloudDownloadOutlined />
                  </p>
                  <p className="ant-upload-text">点击或将文件拖拽到这里上传</p>
                  <Text type="secondary" className="tips">
                    只能上传{getAcceptDisplayText(defaultExcelAccept)}
                    文件，且不超过
                    {maxFileSizeWithUnit}
                  </Text>
                </Upload.Dragger>
              </div>
            </div>
          </div>
          <div className={`${prefixCls}-guide-container`}>
            <h4>导入引导</h4>
            <Text type="secondary">1. 下载Excel模板</Text>
            <Text type="secondary">2. 填写Excel表格</Text>
            <Text type="secondary">
              3. 将文件拖动到虚线框 -&gt; 系统校验 -&gt; 导入成功
            </Text>
            <Text type="secondary">
              4. 单次最多导入2000条，超过2000条可分多次导入
            </Text>
          </div>
        </Spin>
      </Modal>
    </>
  );
};
