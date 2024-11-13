export const removeNull = (object: Record<string, any>) => {
  const newObject: Record<string, any> = {};

  for (let key in object) {
    if (Object.hasOwn(object, key)) {
      const value = object[key];

      if (value !== null) {
        newObject[key] = value;
      }
    }
  }

  return newObject;
};

export const jsonToString = (value?: Partial<Record<string, unknown>> | null): string => {
  if (!value) {
    return '';
  }

  try {
    return JSON.stringify(value);
  } catch (error) {
    console.error('[jsonToString]', error);

    return '';
  }
};

export const stringToJson = (value?: string | null): Partial<Record<string, unknown>> => {
  if (!value) {
    return {};
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    console.error('[stringToJson]', error);

    return {};
  }
};
