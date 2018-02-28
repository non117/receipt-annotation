module.exports = {
  target: 'electron-renderer',
  entry: ['./src/renderer.tsx'],
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  output: {
    filename: 'renderer.js'
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.ts$/, use: 'ts-loader' },
      { test: /\.tsx$/, use: 'ts-loader' }
    ]
  }
};