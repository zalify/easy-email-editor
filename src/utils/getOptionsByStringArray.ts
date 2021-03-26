export function getOptionsByStringArray(list: Array<string>) {
  return list.map(item => ({ value: item, label: item }));
}