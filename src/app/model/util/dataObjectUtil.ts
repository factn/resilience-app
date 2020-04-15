export function merge<T>(data: unknown, defaultData: T): T {
  return rMerge(data, defaultData) as T;
}

function rMerge(data: any, defaultData: any) {
  if (Array.isArray(data) || (typeof defaultData !== "object" && data !== undefined)) return data;

  if (!data || !Object.keys(data).length) return defaultData;

  const mergedObject: any = {};

  Object.keys(defaultData).forEach(
    (key) => (mergedObject[key] = rMerge(data[key], defaultData[key]))
  );

  return mergedObject;
}

export function sanitize<T>(data: unknown, defaultScheme: T): T {
  return rSanitize(data, defaultScheme) as T;
}

function rSanitize(data: any, defaultData: any) {
  if (data === undefined) return undefined;

  if (typeof data !== typeof defaultData) {
    throw new Error(
      `Type ${typeof data} does not match expected type of ${typeof defaultData} for value ${data}`
    );
  }

  if (typeof data !== "object") return data;

  const sanitizedObject: any = {};

  Object.keys(defaultData).forEach((key) => {
    const val = rSanitize(data[key], defaultData[key]);

    if (val !== undefined) sanitizedObject[key] = val;
  });

  return sanitizedObject;
}
