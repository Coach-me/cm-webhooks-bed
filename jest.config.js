module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  globalSetup: './src/utils/test/globalSetup.ts',
  setupFiles: ['./src/utils/test/modulesForTest.ts'],
  globalTeardown: './src/utils/test/globalTeardown.ts',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['node_modules/', 'dist/'],
  preset: 'ts-jest',
  verbose: false,
  collectCoverage: false,
  coverageReporters: ['text', 'json', 'html'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
};
