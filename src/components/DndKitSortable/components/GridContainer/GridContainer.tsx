import React, { forwardRef } from "react";
import { getPrefixCls } from "../../../../utils";
import "./gridContainer.less";

export interface GridContainerProps {
  children: React.ReactNode;
  columns: number;
  gridGap?: string;
}

const COMPONENT_CLASS = "grid-container";

export const GridContainer = forwardRef<HTMLUListElement, GridContainerProps>(
  ({ children, columns, gridGap = "16px" }, ref) => {
    const prefixCls = getPrefixCls(COMPONENT_CLASS);

    return (
      <ul
        ref={ref}
        className={prefixCls}
        style={
          {
            "--col-count": columns,
            "--grid-gap": gridGap,
          } as React.CSSProperties
        }
      >
        {children}
      </ul>
    );
  }
);
