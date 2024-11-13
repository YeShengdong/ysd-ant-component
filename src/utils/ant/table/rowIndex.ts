export const getRowBaseIndex = (
  pagination?: {
    current: number;
    pageSize: number;
  } | null,
) => {
  if (!pagination) {
    return 0;
  }

  const { current, pageSize } = pagination;

  return (current - 1) * pageSize;
};
