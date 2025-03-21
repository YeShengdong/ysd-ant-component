import React from "react";
import classNames from "classnames";
import { getPrefixCls } from "../../../../utils";
import "./wrapper.less";

interface Props {
  children: React.ReactNode;
  center?: boolean;
  style?: React.CSSProperties;
}

const COMPONENT_CLASS = "dnd-kit-wrapper";

export function Wrapper({ children, center, style }: Props) {
  const prefixCls = getPrefixCls(COMPONENT_CLASS);

  return (
    <div className={classNames(prefixCls, center && "center")} style={style}>
      {children}
    </div>
  );
}
