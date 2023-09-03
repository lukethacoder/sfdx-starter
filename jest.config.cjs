// TODO: re-enable once https://github.com/salesforce/sa11y/issues/356 is resolved
// const setupFilesAfterEnv = jestConfig.setupFilesAfterEnv || []
// setupFilesAfterEnv.push('<rootDir>/jest-sa11y-setup.js')

console.log(`Using "jest.config.cjs"`)

/** @type {import('jest').Config} */
function integration({ nativeShadow }) {
  return {
    rootDir: './force-app/',
    displayName: {
      name: `integration (${nativeShadow ? 'native' : 'synthetic'} shadow)`,
      color: nativeShadow ? 'blue' : 'cyan'
    },
    transform: {
      '^.+\\.(js|html|css)$': require.resolve('@lwc/jest-transformer'),
    },
  
    preset: '@lwc/jest-preset',
    moduleNameMapper: {
      "^@salesforce/community/Id": "<rootDir>/../__mocks__/lwc/@salesforce/community/Id.js",
      "^c/(.+)$": "<rootDir>/main/default/lwc/$1/$1"
    },
  
    globals: {
      'lwc-jest': {
        nativeShadow
      }
    },
  }
}

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['./**'],
  coverageReporters: ['json', 'html', 'lcov'],
  coverageThreshold: {
    global: {
      lines: 90,
    },
  },
  projects: [    
    integration({ nativeShadow: false }),
    integration({ nativeShadow: true }),
  ],
}