import {
  GithubOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Divider, Drawer, Empty, Spin, StepProps, Steps } from "antd";
import cn from "classnames";
import React, { memo, useMemo, useState } from "react";
import { dateFormat, filterByMaxLength, getPrefixCls } from "../../utils";
import "./index.less";
import { ApproveStepListData, ApproveStepListProps } from "./interface";

const COMPONENT_CLASS = "approve-step";

export const ApproveStepList = memo((props: ApproveStepListProps) => {
  const {
    title = "处理进展",
    data,
    loading = false,
    isExpand = true,
    onExpandClick,
  } = props;
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const prefixCls = getPrefixCls(COMPONENT_CLASS);

  const { stepItems, simplifiedItems, current } = useMemo(() => {
    const maxSimplifiedItemLength = 5;
    let stepItems: StepProps[] = [];
    let simplifiedItems: StepProps[] = [];
    let current = 0;

    if (data?.length) {
      stepItems = data.map((item) => {
        const { taskName, assigneeName, comment, endTime, durationDesc } = item;

        return {
          title: taskName,
          description: (
            <div>
              {assigneeName ? <div>操作人：{assigneeName}</div> : null}
              {comment ? <div>操作意见：{comment}</div> : null}
              {endTime ? <div>操作时间：{endTime}</div> : null}
              {durationDesc ? <div>耗时：{durationDesc}</div> : null}
            </div>
          ),
        };
      });

      simplifiedItems = (
        filterByMaxLength(data, maxSimplifiedItemLength) as ApproveStepListData
      ).map((item) => {
        const { taskName, assigneeName, endTime, action, actionName } = item;
        const isReturn = action === "return";

        return {
          title: taskName,
          description: (
            <div>
              {assigneeName ? (
                <div>
                  <GithubOutlined className={`${prefixCls}-icon`} />
                  {assigneeName}
                </div>
              ) : null}
              {endTime ? (
                <div>
                  <GithubOutlined className={`${prefixCls}-icon`} />
                  {dateFormat(endTime)}
                </div>
              ) : null}
              {isReturn && actionName ? (
                <div>操作意见：{actionName}</div>
              ) : null}
            </div>
          ),
        };
      });

      // current = data.findLastIndex((opt) => opt.endTime) + 1;
      current = parseInt(data[data.length - 1].endTime || "") + 1;
    }

    return {
      stepItems,
      simplifiedItems,
      current,
    };
  }, [data]);

  const isAutoHeight = !isExpand;

  const renderSteps = (items: StepProps[]) => (
    <Steps
      rootClassName={`${prefixCls}-steps`}
      size="small"
      direction="vertical"
      current={current}
      items={items}
    />
  );

  const ExpandIcon = isExpand ? MenuUnfoldOutlined : MenuFoldOutlined;

  const handleExpandClick = () => {
    onExpandClick?.(!isExpand);
  };

  return (
    <div
      className={cn(
        `${prefixCls}-root`,
        isAutoHeight && `${prefixCls}-auto-height`,
        !isExpand && `${prefixCls}-hide`
      )}
    >
      <div className={`${prefixCls}-layout`}>
        <div className={`${prefixCls}-header`}>
          {isExpand && <span>{title}</span>}
          <a title={title}>
            <ExpandIcon onClick={handleExpandClick} />
          </a>
        </div>
        {isExpand && (
          <>
            <div className={`${prefixCls}-content`}>
              {simplifiedItems.length ? (
                <Spin spinning={loading}>{renderSteps(simplifiedItems)}</Spin>
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </div>
            <div className={`${prefixCls}-footer`}>
              <Divider className={`${prefixCls}-divider`} />
              <Button type="link" onClick={() => setIsOpenDetail(true)}>
                查看详情
              </Button>
            </div>
          </>
        )}
      </div>
      <Drawer
        title={title}
        open={isOpenDetail}
        onClose={() => setIsOpenDetail(false)}
      >
        {stepItems.length ? (
          renderSteps(stepItems)
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Drawer>
    </div>
  );
});
