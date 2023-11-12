module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential', // 或者 vue3-recommended 根据严格程度选择
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier', // 确保prettier在最后一个，以覆盖其他配置的格式规则
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    // 在这里覆盖或添加规则
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // TypeScript 的特定规则可以在这里配置
    '@typescript-eslint/no-explicit-any': 'off',
    // 其他规则...
  },
};
