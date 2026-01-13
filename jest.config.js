module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  
  // 关键：确保测试文件能被找到
  testMatch: [
    '<rootDir>/__tests__/**/*.test.ts',
    '<rootDir>/__tests__/**/*.spec.ts',
    '<rootDir>/src/**/*.test.ts',
    '<rootDir>/src/**/*.spec.ts'
  ],
  
  // TypeScript 支持
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  
  // 需要测试的文件类型
  moduleFileExtensions: ['ts', 'js', 'json'],
  
  // 忽略的目录
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ],
  
  // 收集测试覆盖率
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts'
  ],
  
  // 覆盖率的目录
  coverageDirectory: 'coverage',
  
  // 覆盖率报告格式
  coverageReporters: ['text', 'lcov', 'html'],
  
  // 模块别名映射
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};