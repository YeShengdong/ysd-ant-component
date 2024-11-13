export const filterByMaxLength = (
  source?: unknown[],
  maxLength?: number,
): unknown[] => {
  if (!source?.length || !maxLength) {
    return [];
  }

  return source.filter((_, index) => index + 1 <= maxLength);
};
