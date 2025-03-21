export const calculateWrapperStyle = (options: any) => {
  const { width, height, minHeight, gridColumns, containerRef, wrapperStyle } = options;
  const containerRect = containerRef.current?.getBoundingClientRect();
  const { width: containerWith = 0 } = containerRect || {};
  const columnWidth = containerWith / gridColumns;
  let spanColumns = Math.ceil(width / columnWidth);

  if (spanColumns > gridColumns) {
    spanColumns = gridColumns;
  } else if (spanColumns < 1) {
    spanColumns = 1;
  }

  const newWrapperStyle = { ...wrapperStyle, gridColumnStart: `span ${spanColumns}`, height };

  if (height <= minHeight) {
    delete newWrapperStyle.height;
  }

  return newWrapperStyle;
};
