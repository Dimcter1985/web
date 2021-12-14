module.exports = {
  cacheDirectory: '.jest/cache',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  transform: {
    "^.+\\.tsx?$": "babel-jest",
    "\\.js$": "babel-jest",
  },
  moduleDirectories: ['node_modules', 'src', 'src/core/'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/test/__mocks__/styleMock.ts',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/test/__mocks__/fileMock.ts',
  },
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
}