module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  transform: {
    "^.+\\.vue$": "vue-jest",
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  snapshotSerializers: [
    'jest-serializer-vue',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,ts,vue}',
    '!**/node_modules/**',
    '!src/assets/*',
    '!src/main.js',
  ],
};
