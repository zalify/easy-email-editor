
export function getFormatAction(group: string, name: string) {
  return group + '-' + name;
}

export function getParseAction(variable: string) {
  const [group, name] = variable.split('-');
  return {
    group,
    name
  };
}
