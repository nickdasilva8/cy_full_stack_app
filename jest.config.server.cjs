// jest.config.server.cjs
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.server.cjs'],
  testEnvironment: 'jest-environment-node', // Use node environment for server-side tests
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'], // Ignore .next and node_modules
  testMatch: ['<rootDir>/server/**/*.test.ts'],
};

// const customJestConfig = { setupFilesAfterEnv: ['/jest.setup.server.cjs'], testEnvironment: 'jest-environment-node', // Use node environment for server-side tests
// testPathIgnorePatterns: ['/.next/', '/node_modules/'], // Ignore .next and node_modules directories
// testMatch: ['/tests/**/*.test.js'], // Only run tests in the 'tests' directory
// };
module.exports = createJestConfig(customJestConfig);
