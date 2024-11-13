import { DeleteOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Spin,
  Tag,
  Typography,
} from 'antd';
import { isArray } from 'lodash-es';
import React, {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  alertErrorMessage,
  fisMessage,
  getPrefixCls,
  isSuccessResponse,
} from '../../utils';
import { CreateNewModal } from './CreateNewModal';
import './index.less';
import { LabelSelectProps } from './interface';

const { Text } = Typography;

const COMPONENT_CLASS = 'label-select';

export const LabelSelect = ({
  value,
  onChange,
  moduleType,
  isMultiple = false,
  getLabelListService,
  removeLabelService,
  getLabelColorListService,
  saveLabelService,
  buttonProps = {},
}: LabelSelectProps) => {
  const createNewModalRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [labelList, setLabelList] = useState<any[]>([]);
  const prevSearchValue = useRef('');
  const [searchValue, setSearchValue] = useState('');
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<number[]>([]);

  const prefixCls = getPrefixCls(COMPONENT_CLASS);

  const updateValue = (newValue: any) => {
    const newConfirmedValue = isMultiple ? newValue : newValue?.[0];

    onChange?.(newConfirmedValue);
  };

  const selectedLabels = useMemo(() => {
    if (!value) {
      return [];
    }

    const selectedValues = (isArray(value) ? value : [value]) as number[];

    return labelList.filter(({ id }) => selectedValues.includes(id));
  }, [labelList, value]);

  const queryLabelList = async (options = {}) => {
    setLoading(true);

    try {
      const res = await getLabelListService(
        { moduleType, labelName: searchValue },
        options,
      );

      if (!isSuccessResponse(res)) {
        throw new Error(res.message);
      }

      setLabelList(res.data || []);
    } catch (error) {
      alertErrorMessage(error);
    } finally {
      setLoading(false);

      if (!isInitialized) {
        setIsInitialized(true);
      }
    }
  };

  useEffect(() => {
    queryLabelList();
  }, [])

  useEffect(() => {
    if (!isListModalOpen) {
      return;
    }

    let abortController: AbortController | null = null;
    let delay = 0;

    if (searchValue !== prevSearchValue.current) {
      prevSearchValue.current = searchValue;
      delay = 500;
    }

    const timer = setTimeout(() => {
      abortController = new AbortController();

      const options = { signal: abortController.signal };
      queryLabelList(options);
    }, delay);

    return () => {
      abortController?.abort();
      clearTimeout(timer);
    };
  }, [isListModalOpen, searchValue]);

  useEffect(() => {
    if (!value) {
      setSelectedValues([]);

      return;
    }

    const newSelectedValues = (isArray(value) ? value : [value]) as number[];

    setSelectedValues(newSelectedValues);
  }, [value]);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    if (value && !selectedLabels.length) {
      // 清除已选中但是已删除的标签
      console.log('[LabelSelect]clear value')
      updateValue(void 0);
    }
  }, [value, selectedLabels, isInitialized])

  const showListModal = () => {
    setIsListModalOpen(true);
  };

  const hideListModal = () => {
    setIsListModalOpen(false);
  };

  const handleSelectButtonClick = async () => {
    showListModal();
  };

  const handleCreateButtonClick = () => {
    hideListModal();
    createNewModalRef.current?.show();
  };

  const handleSelectConfirmClick = () => {
    updateValue(selectedValues);
    hideListModal();
  };

  const handleRadioLabelChange = (e: RadioChangeEvent) => {
    const newValue = e.target.value;

    setSelectedValues([newValue]);
  };

  const handleRemove = async (id: number) => {
    setLoading(true);

    try {
      const res = await removeLabelService(id);

      if (!isSuccessResponse(res)) {
        throw new Error(res.message);
      }

      fisMessage.success('删除成功！');
      const newLabelList = labelList.filter(
        ({ id: currentId }) => currentId !== id,
      );
      const newSelectedValues = selectedValues.filter(
        (currentId) => currentId !== id,
      );

      setLabelList(newLabelList);
      setSelectedValues(newSelectedValues);
      updateValue(newSelectedValues);
    } catch (error) {
      alertErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewModalHide = () => {
    showListModal();
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setSearchValue(newValue);
  };

  return (
    <>
      <Button type="primary" {...buttonProps} onClick={handleSelectButtonClick}>
        选择标签
      </Button>
      {selectedLabels?.length ? (
        <div className={`${prefixCls}-label-info-container`}>
          <Text>已选标签：</Text>
          {selectedLabels.map(({ id, labelName, labelColour }) => (
            <Tag key={id} color={labelColour}>
              {labelName}
            </Tag>
          ))}
        </div>
      ) : null}
      <Modal
        title="选择标签"
        open={isListModalOpen}
        onCancel={hideListModal}
        footer={[
          <Button
            key="new"
            type="primary"
            loading={loading}
            onClick={handleCreateButtonClick}
          >
            新建标签
          </Button>,
          <Button key="cancel" loading={loading} onClick={hideListModal}>
            取消
          </Button>,
          <Button
            key="confirm"
            type="primary"
            loading={loading}
            onClick={handleSelectConfirmClick}
          >
            确定
          </Button>,
        ]}
      >
        <Input
          placeholder="搜索标签"
          maxLength={10}
          onChange={handleSearchChange}
          value={searchValue}
        />
        <Spin spinning={loading}>
          <div>
            <p className={`${prefixCls}-choose-text`}>请选择：</p>
            <Radio.Group
              className={`${prefixCls}-radio-group`}
              onChange={handleRadioLabelChange}
              value={selectedValues[0]}
            >
              <Row gutter={[4, 8]}>
                {labelList.map(({ id, labelName, labelColour }) => (
                  <Col key={id} span={12}>
                    <Radio value={id}>
                      <Tag color={labelColour}>{labelName}</Tag>
                    </Radio>
                    <DeleteOutlined
                      className={`${prefixCls}-delete`}
                      onClick={() => handleRemove(id)}
                    />
                  </Col>
                ))}
              </Row>
            </Radio.Group>
          </div>
        </Spin>
      </Modal>
      <CreateNewModal
        ref={createNewModalRef}
        moduleType={moduleType}
        onModalHide={handleCreateNewModalHide}
        getLabelColorListService={getLabelColorListService}
        saveLabelService={saveLabelService}
      />
    </>
  );
};
