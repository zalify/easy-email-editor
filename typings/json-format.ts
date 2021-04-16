
declare module 'json-format' {
  const transform: (val: { [key: string]: any; }, options?: {
    type: any;
    size: number;
  }) => string;
  export default transform;
}