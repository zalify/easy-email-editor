
export type ClassNameValue = string | false | null | undefined | 0;

export function classnames(...rest: ClassNameValue[]) {
  return rest.filter((item): item is string => typeof item === 'string').join(' ');
}
