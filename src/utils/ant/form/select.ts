import { pick } from 'lodash-es';

export const getOptionsFromData = (
  data: Record<string, any>[] | null,
  options: { labelKey: string; valueKey: string; otherKeys?: string[] | null },
): { label: string; value: string | number; [key: string]: any }[] => {
  if (!data || !options) {
    return [];
  }

  const { labelKey, valueKey, otherKeys = null } = options || {};

  return data.map((item) => {
    const result = {
      label: item[labelKey],
      value: item[valueKey],
    };

    if (otherKeys) {
      return { ...pick(item, otherKeys), ...result };
    }

    return result;
  });
};
