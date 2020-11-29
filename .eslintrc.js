module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint', // @typescript-eslint/eslint-plugin
    'unicorn',
    // 'jest', // eslint-plugin-jest
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // 'prettier',
    // 'prettier/@typescript-eslint',
    // 'plugin:jest/recommended',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
    'no-constant-condition': 1,
  },
};
