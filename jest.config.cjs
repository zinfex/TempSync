module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest'
    },
    moduleFileExtensions: ['js', 'jsx', 'json'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testMatch: ['<rootDir>/src/components/tests/**/*.(test|spec).(js|jsx)'],

    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    }

  }
  