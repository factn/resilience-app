export default function mergeDataObject<T>(data: unknown, defaultData: T): T {
  return rMerge(data, defaultData) as T;
}

function rMerge(data: any, defaultData: any) {
  if (Array.isArray(data)) return data;

  if (!data || !Object.keys(data).length) return defaultData;

  const keys = Object.keys(defaultData);

  const mergedObject: any = {};

  keys.forEach((key) => {
    const val =
      typeof defaultData[key] === "object"
        ? rMerge(data[key], defaultData[key])
        : data[key] ?? defaultData[key];

    mergedObject[key] = val;
  });

  return mergedObject;
}
