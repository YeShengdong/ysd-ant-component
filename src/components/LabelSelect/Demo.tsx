import { LabelSelect, restCode } from 'founderintl-fis-components';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState<number | any>(3);

  const getLabelListService = (): any => {
    return Promise.resolve({
      code: restCode.success,
      data: [
        {
          id: 1,
          labelName: '模拟标签1',
          labelColour: 'gold',
          labelBelongModule: '1',
        },
        {
          id: 2,
          labelName: '模拟标签2',
          labelColour: 'green',
          labelBelongModule: '1',
        },
        {
          id: 3,
          labelName: '模拟标签3',
          labelColour: 'cyan',
          labelBelongModule: '1',
        },
      ],
      message: null,
    });
  };

  const removeLabelService = (): any => {
    return Promise.resolve({
      code: restCode.success,
      data: '',
      message: null,
    });
  };

  const getLabelColorListService = (): any => {
    return Promise.resolve({
      code: restCode.success,
      data: [
        {
          id: 1,
          labelColour: 'magenta',
        },
        {
          id: 2,
          labelColour: 'red',
        },
        {
          id: 3,
          labelColour: 'volcano',
        },
        {
          id: 4,
          labelColour: 'orange',
        },
        {
          id: 5,
          labelColour: 'gold',
        },
        {
          id: 6,
          labelColour: 'lime',
        },
        {
          id: 7,
          labelColour: 'green',
        },
        {
          id: 8,
          labelColour: 'cyan',
        },
        {
          id: 9,
          labelColour: 'blue',
        },
        {
          id: 10,
          labelColour: 'geekblue',
        },
        {
          id: 11,
          labelColour: 'purple',
        },
      ],
      message: null,
    });
  };

  const saveLabelService = (): any => {
    return Promise.resolve({
      code: restCode.success,
      data: '',
      message: null,
    });
  };

  const handleChange = (value: any) => {
    setValue(value);
  }

  return (
    <>
      <h4>现有公共API:</h4>
      <ul>
        <li>
          查询公告标签列表接口：https://tfistoe.hwwt2.com/fis-toe-messagecenter/api/v1/system/notice/label/list
        </li>
        <li>
          新增公告标签接口：https://tfistoe.hwwt2.com/fis-toe-messagecenter/api/v1/system/notice/label/save
        </li>
        <li>
          删除公告标签接口：https://tfistoe.hwwt2.com/fis-toe-messagecenter/api/v1/system/notice/label/del?id=1
        </li>
        <li>
          查询公告标签查询颜色列表接口：https://tfistoe.hwwt2.com/fis-toe-messagecenter/api/v1/system/notice/information/label/colour
        </li>
      </ul>
      <LabelSelect
        moduleType={1}
        getLabelListService={getLabelListService}
        removeLabelService={removeLabelService}
        getLabelColorListService={getLabelColorListService}
        saveLabelService={saveLabelService}
        value={value}
        onChange={handleChange}
      />
    </>
  );
};
