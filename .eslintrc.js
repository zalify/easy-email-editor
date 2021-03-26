module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'object-curly-spacing': [2, 'always'],
    quotes: ['error', 'single'],
    'no-unused-vars': 0,
    camelcase: 0,
    'guard-for-in': 0,
    'linebreak-style': 'off',
    'indent': 0,
    'operator-linebreak': 0,
    'no-console': 0,
    'class-methods-use-this': 0,
    'prefer-destructuring': 0,
    'dot-notation': 0,
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1, 'maxBOF': 1 }],
    // react 相关
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'react/jsx-closing-tag-location': 'error',

    'react/jsx-curly-spacing': ['error', 'never', { allowMultiline: true }],
    'react/jsx-key': 'warn',
    'react/jsx-max-props-per-line': ['error', { maximum: 2, when: 'multiline' }],
    'react/jsx-wrap-multilines': ['error', {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      return: 'parens-new-line',
      arrow: 'parens-new-line',
      condition: 'parens-new-line',
      logical: 'parens-new-line',
      prop: 'parens-new-line',
    }],
    'react/self-closing-comp': 'error',
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-tag-spacing': ['error', {
      closingSlash: 'never',
      beforeSelfClosing: 'always',
      afterOpening: 'never',
      beforeClosing: 'never',
    }],
  },
};
// 0 = off, 1 = warn, 2 = error
