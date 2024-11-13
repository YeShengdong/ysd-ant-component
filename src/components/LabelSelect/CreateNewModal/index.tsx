import { Col, Form, Input, Modal, Radio, Row, Spin, Tag } from 'antd';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  DEFAULT_INPUT_PLACEHOLDER,
  REQUIRED_RULE,
  alertErrorMessage,
  fisMessage,
  isSuccessResponse,
} from '../../../utils';

interface CreateNewModalProps {
  onModalHide?: () => void;
  moduleType: number;
  getLabelColorListService: any;
  saveLabelService: any;
}

export const CreateNewModal = forwardRef(
  (
    {
      onModalHide,
      moduleType,
      getLabelColorListService,
      saveLabelService,
    }: CreateNewModalProps,
    ref: any,
  ) => {
    const [isLoading, setIsLoading] = useState(true);
    const [colorList, setColorList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
      if (!isOpen || colorList?.length) {
        return;
      }

      const initColorList = async () => {
        setIsLoading(true);

        try {
          const res = await getLabelColorListService();

          if (!isSuccessResponse(res)) {
            throw new Error(res.message);
          }

          setColorList(res.data || []);
        } catch (error) {
          alertErrorMessage(error);
        } finally {
          setIsLoading(false);
        }
      };

      initColorList();
    }, [isOpen]);

    const showModal = () => {
      form.resetFields();
      setIsOpen(true);
    };

    const hideModal = () => {
      setIsOpen(false);
      onModalHide?.();
    };

    useImperativeHandle(ref, () => ({
      show: showModal,
    }));

    const handleFinish = async (values: any) => {
      setIsLoading(true);

      try {
        const params = {
          ...values,
          labelBelongModule: moduleType,
        };
        const res = await saveLabelService(params);

        if (!isSuccessResponse(res)) {
          throw new Error(res.message);
        }

        fisMessage.success('创建成功！');
        hideModal();
      } catch (error) {
        alertErrorMessage(error);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <Modal
        title="新建标签"
        open={isOpen}
        onCancel={hideModal}
        cancelText="返回"
        okText="创建"
        onOk={form.submit}
        okButtonProps={{ disabled: isLoading }}
      >
        <Spin spinning={isLoading}>
          <Form
            form={form}
            name="createNewLabelForm"
            onFinish={handleFinish}
            labelAlign="right"
            labelCol={{ span: 4 }}
          >
            <Form.Item
              name="labelName"
              label="标签名称"
              rules={[REQUIRED_RULE]}
            >
              <Input placeholder={DEFAULT_INPUT_PLACEHOLDER} maxLength={10} />
            </Form.Item>
            <Form.Item
              name="labelColour"
              label="标签样式"
              rules={[REQUIRED_RULE]}
            >
              <Radio.Group>
                <Row gutter={[8, 8]}>
                  {colorList.map(({ id, labelColour }) => (
                    <Col key={id} span={8}>
                      <Radio value={labelColour}>
                        <Tag color={labelColour}>{labelColour}</Tag>
                      </Radio>
                    </Col>
                  ))}
                </Row>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(p, c) =>
                p.labelName !== c.labelName || p.labelColour !== c.labelColour
              }
            >
              {({ getFieldValue }) => {
                const labelName = getFieldValue('labelName');
                const labelColour = getFieldValue('labelColour');

                if (!labelName || !labelColour) {
                  return null;
                }

                return (
                  <Form.Item label="预览效果">
                    <Tag color={labelColour}>{labelName}</Tag>
                  </Form.Item>
                );
              }}
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    );
  },
);
