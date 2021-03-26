
export function getFormatVariable(group: string, name: string) {
  return group + '.' + name;
}

export function getParseVariable(variable: string) {
  const [group, name] = variable.split('.');
  return {
    group,
    name
  };
}
