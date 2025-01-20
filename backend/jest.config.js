/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Map @/alias to the src folder
  }
};