import { ButtonProps } from 'antd';
import { RestResponse } from '../../constants';

export interface LabelSelectProps {
  value?: number | number[];
  onChange?: (value: number | number[]) => void;
  isMultiple?: boolean; // TODO
  moduleType: number;
  getLabelListService: (
    params: { moduleType: number; labelName?: string },
    options: any,
  ) => Promise<RestResponse>;
  removeLabelService: (id: number) => Promise<RestResponse>;
  getLabelColorListService: () => Promise<RestResponse>;
  saveLabelService: (params: any) => Promise<RestResponse>;
  buttonProps?: ButtonProps;
}
