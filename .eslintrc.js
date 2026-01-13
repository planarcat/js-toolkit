module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-unsupported-version": "off", // 忽略 TypeScript 版本警告
    "no-useless-escape": "off", // 允许转义字符
  },
  env: {
    node: true,
    jest: true,
  },
  overrides: [
    {
      files: ["**/*.js"], // 针对 JavaScript 文件（如 dist 目录）
      rules: {
        "@typescript-eslint/no-var-requires": "off", // 关闭 require 检查
        "no-useless-escape": "off", // 关闭不必要的转义检查
      },
    },
  ],
  // 关键：忽略 dist 目录
  ignorePatterns: [
    "dist/**", // 构建产物
    "node_modules/**", // 依赖
    "coverage/**", // 测试覆盖率报告
    "**/*.d.ts", // TypeScript 声明文件
  ],
};
