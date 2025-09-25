module.exports = {
  ignores: ['node_modules/**', 'playwright-report/**', 'tests/generated-petstore.spec.ts'],
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname
      },
      plugins: ['@typescript-eslint'],
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
        '@typescript-eslint/explicit-module-boundary-types': 'off'
      }
    }
  ]
};
