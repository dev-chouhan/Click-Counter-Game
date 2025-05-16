import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // Customize no-unused-vars to ignore variables starting with capital letters or underscore (React components, constants)
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' }],

      // React Refresh plugin rule to warn if non-component exports are detected
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Additional rules to improve code quality and consistency
      'react-hooks/rules-of-hooks': 'error', // Enforce rules of hooks
      'react-hooks/exhaustive-deps': ['warn', {
        additionalHooks: '(useMyCustomHook|useAnotherHook)', // if you have custom hooks, add here
      }],

      // Recommend using === and !== over == and !=
      'eqeqeq': ['error', 'always'],

      // Disallow console.log in production, allow during development only
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

      // Enforce consistent return statements in functions
      'consistent-return': 'error',

      // Prevent usage of variables before they are defined
      'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],

      // Prefer const over let when variables are never reassigned
      'prefer-const': ['error', {
        destructuring: 'all',
        ignoreReadBeforeAssign: true,
      }],
    },
  },
];
