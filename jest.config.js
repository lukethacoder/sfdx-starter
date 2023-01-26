const { jestConfig } = require('@salesforce/sfdx-lwc-jest/config')

// TODO: re-enable once https://github.com/salesforce/sa11y/issues/356 is resolved
// const setupFilesAfterEnv = jestConfig.setupFilesAfterEnv || []
// setupFilesAfterEnv.push('<rootDir>/jest-sa11y-setup.js')

/** @type {import('jest').Config} */
const config = {
  ...jestConfig,
  testRegex: '/__tests__/.*.test.js$',
  moduleNameMapper: {
    '^@salesforce/apex$': '<rootDir>/mocks/apex',
    '^@salesforce/community/(.*)':
      '<rootDir>/mocks/lwc/@salesforce/community/$1.js',
  },

  // setupFilesAfterEnv,
}

module.exports = config
