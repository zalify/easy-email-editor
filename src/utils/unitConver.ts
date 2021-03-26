
export interface ICssRulesOptions {
  originUnit?: string;
  replaceUnit?: string;
  precision?: number;
  times?: number;
}

export function unitConver(declaration: string, options: ICssRulesOptions) {
  const {
    originUnit = 'px',
    replaceUnit = 'px',
    precision = 2,
    times = 1
  } = options;
  if (typeof declaration !== 'string') {
    return declaration;
  }
  const pattern = new RegExp(`(\\d+(\\.\\d+)?)(${originUnit})\\b`, 'mig');
  return declaration.replace(pattern, function (
    group1: string,
    group2: string,
    group3: string,
    group4: string
  ) {
    const newText =
      parseFloat((Number(group2) * times).toFixed(precision)) + replaceUnit;
    return newText;
  });
}