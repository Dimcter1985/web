// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaults: tsjPreset } = require('ts-jest/presets')

module.exports = {
  ...tsjPreset,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    ...tsjPreset.transform,
    '^.+\\.(js)$': '<rootDir>/node_modules/babel-jest',
    '\\.(ts|tsx)$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/'],
  cacheDirectory: '.jest/cache',
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/spec/__mocks__/styleMock.ts',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/spec/__mocks__/fileMock.ts',
    '\\.(eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/spec/setup.ts'],
  modulePaths: ['<rootDir>/'],
  transformIgnorePatterns: [
    'node_modules/(?!()/)',
  ],
}
