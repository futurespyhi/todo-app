module.exports = {
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    moduleDirectories: ["node_modules", "src"],
    testPathIgnorePatterns: ["/node_modules/"],
    transformIgnorePatterns: [
      "/node_modules/(?!react-router|react-router-dom/).+\\.js$"
    ]
  }