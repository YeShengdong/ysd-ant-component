import React, { forwardRef } from 'react';

import styles from './gridContainer.less';

export interface GridContainerProps {
  children: React.ReactNode;
  columns: number;
  gridGap?: string;
}

export const GridContainer = forwardRef<HTMLUListElement, GridContainerProps>(
  ({ children, columns, gridGap = '16px' }, ref) => {
    return (
      <ul
        ref={ref}
        className={styles.gridContainer}
        style={
          {
            '--col-count': columns,
            '--grid-gap': gridGap,
          } as React.CSSProperties
        }
      >
        {children}
      </ul>
    );
  }
);
