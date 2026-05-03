module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      tsconfig: {
        types: ["jest", "node"],
        rootDir: "."
      }
    }
  },
  testMatch: ["**/tests/**/*.test.ts"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/index.ts", "!src/**/*.d.ts"],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: { branches: 80, functions: 80, lines: 80, statements: 80 }
  },
  setupFilesAfterEnv: []
};
