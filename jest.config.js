module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  moduleNameMapper: {
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg|ico|mp3)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/example/node_modules/',
  ],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/src', '<rootDir>/example/src'],
};
