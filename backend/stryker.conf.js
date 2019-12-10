module.exports = function(config) {
  config.set({
    mutator: "javascript",
    packageManager: "npm",
    reporters: ["html", "clear-text", "progress", "dashboard"],
    testRunner: "jest",
    transpilers: [],
    coverageAnalysis: "off",
    files: [
      "src/tests/functionalTests/app.test.js",
      "src/app.js"
    ],
    mutate: [
      "./src/app.js"
    ]
  });
};
