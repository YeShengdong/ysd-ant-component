// 枚举转换

export function enumToMapping<T extends Record<string, string | number>>(
  enumData: T,
): Record<string, string> {
  const result: Record<string, string> = {};
  const data = Object.entries(enumData).filter(([value]) =>
    isNaN(Number(value)),
  );

  for (const [key, value] of data) {
    result[value] = key;
  }

  return result;
}

export function enumToTableFilters<T extends Record<string, string | number>>(
  enumData: T,
): { text: string; value: number | string }[] {
  return Object.entries(enumData)
    .filter(([key]) => isNaN(Number(key)))
    .map(([text, value]) => ({ text, value }));
}

export function enumToOptions<T extends Record<string, string | number>>(
  enumData: T,
): { label: string; value: string | number }[] {
  return Object.entries(enumData)
    .filter(([key]) => isNaN(Number(key)))
    .map(([label, value]) => ({ label, value }));
}
