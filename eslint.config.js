// Minimal ESLint configuration compatible with ESLint v9+ and the project's .eslintrc.json
import fs from 'fs';

// Load existing .eslintrc.json if present
let baseConfig = {};
try {
  baseConfig = JSON.parse(fs.readFileSync(new URL('./.eslintrc.json', import.meta.url)));
} catch (e) {
  // fallback minimal config
  baseConfig = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier']
  };
}

export default [
  // files to lint
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: baseConfig.parser || '@typescript-eslint/parser',
      parserOptions: baseConfig.parserOptions || { project: './tsconfig.json' }
    },
    plugins: { '@typescript-eslint': baseConfig.plugins ? {} : {} },
    rules: baseConfig.rules || {}
  }
];
