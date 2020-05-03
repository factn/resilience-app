// Snippet from https://stackoverflow.com/a/54432326
type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export default PropType;
