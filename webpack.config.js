const path = require('path')

module.exports = [
  {
    target: "electron-renderer",
    entry: "./src/renderer.tsx",
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: "renderer.js"
    },
    module: {
      rules: [
        { test: /\.css$/, use: ["style-loader", "css-loader"] },
        { test: /\.ts$/, use: "ts-loader" },
        { test: /\.tsx$/, use: "ts-loader" }
      ]
    }
  },
  {
    target: "electron-main",
    entry: "./src/main.ts",
    resolve: {
      extensions: [".ts"]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: "main.js"
    },
    module: {
      rules: [
        { test: /\.ts$/, use: "ts-loader" },
      ]
    }
  }
];
