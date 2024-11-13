import { Button, Image } from 'antd';
import React, { useState } from 'react';
import { checkIsImageFileUrl, fisAlert } from '../../utils';
import { ImagePreviewButtonProps } from './interface';

export * from './interface';

export const ImagePreviewButton = (props: ImagePreviewButtonProps) => {
  const { url, fileName, buttonProps = {} } = props;
  const [visible, setVisible] = useState<boolean>(false);

  const handleClick = () => {
    if (!checkIsImageFileUrl(url, fileName)) {
      fisAlert.info('只有图片支持预览！');

      return;
    }

    setVisible(true);
  };

  return (
    <>
      <Button type="link" size="small" onClick={handleClick} {...buttonProps}>
        预览
      </Button>
      <Image
        style={{ display: 'none' }}
        height={0}
        width={0}
        preview={{ visible, src: url, onVisibleChange: setVisible }}
      />
    </>
  );
};
