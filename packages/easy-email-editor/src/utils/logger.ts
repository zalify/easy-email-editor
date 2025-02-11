const originalErrorLog = console.error;

// ignore expected error logs from easy-email
export const overrideErrorLog = () => {
  console.error = (message?: any, ...optionalParams: any[]) => {
    if (
      typeof message === 'string' &&
      [
        'Unsupported vendor-prefixed style property',
        'validateDOMNesting',
        'Invalid DOM',
        'You provided a `checked` prop to a form field without an `onChange` handler',
      ].some((item) => message.includes(item))
    ) {
      // no console
    } else {
      originalErrorLog(message, ...optionalParams);
    }
  };
}

export const restoreErrorLog = () => {
  console.error = originalErrorLog;
}