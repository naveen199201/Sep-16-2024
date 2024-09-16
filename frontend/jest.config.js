// jest.config.js
module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios)/', // Transform `axios` in `node_modules`
    ],
    testEnvironment: 'jsdom',
  };