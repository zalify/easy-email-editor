const mockFn = () => {
  console.warn('fs should not be used in browser build') // eslint-disable-line no-console
  return null
}

export default {
  parse: mockFn,
  resolve: mockFn,
  join: mockFn,
  dirname: mockFn,
  isAbsolute: mockFn,
}
