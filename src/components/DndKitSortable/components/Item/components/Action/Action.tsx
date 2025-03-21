import React, { forwardRef, CSSProperties } from "react";
import classNames from "classnames";

import "./action.less";
import { getPrefixCls } from "../../../../../../utils";

export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  active?: {
    fill: string;
    background: string;
  };
  cursor?: CSSProperties["cursor"];
}

const COMPONENT_CLASS = "dnd-kit-item-action";

export const Action = forwardRef<HTMLButtonElement, Props>(
  ({ active, className, cursor, style, ...props }, ref) => {
    const prefixCls = getPrefixCls(COMPONENT_CLASS);

    return (
      <button
        type="button"
        ref={ref}
        {...props}
        className={classNames(prefixCls, className)}
        tabIndex={0}
        style={
          {
            ...style,
            cursor,
            "--fill": active?.fill,
            "--background": active?.background,
          } as CSSProperties
        }
      />
    );
  }
);
