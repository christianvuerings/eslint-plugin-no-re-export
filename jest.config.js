// @ts-check

/** @type {import('jest').Config} */
module.exports = {
  projects: [
    {
      moduleDirectories: ["node_modules", "src"],
      transform: {
        "^.+\\.[jt]sx?$": [
          "esbuild-jest",
          {
            sourcemap: true,
          },
        ],
      },
      testEnvironment: "node",
      testMatch: ["<rootDir>/src/**/*.test.ts"],
    },
  ],
  clearMocks: true,
  restoreMocks: true,
  resetMocks: true,
  verbose: true,
  watchman: false,
};
