module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.js', '.d.ts'],
      },
    },
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-console': 0,
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'operator-linebreak': 0,
    'import/extensions': [
      'error',
      {
        ts: 'never',
        'd.ts': 'never',
      },
    ],
    'import/prefer-default-export': 0,
    '@typescript-eslint/prefer-function-type': 2,
    '@typescript-eslint/no-unused-vars': 2,
    'consistent-return': 0,
    'implicit-arrow-linebreak': 0,
    'function-paren-newline': 0,
    'import/no-extraneous-dependencies': 0,
  },
};
