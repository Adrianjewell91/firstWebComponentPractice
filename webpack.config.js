path = require('path');

module.exports = {
  context: __dirname,
  entry: './scripts/entry.js',
  output: {
    path: path.resolve(__dirname, 'scripts','bundle'),
    filename: 'bundle.js'
  },
  mode: "development",
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        use: 'babel-loader',
      }
    ]
  },
  devtool: 'source-maps'
  //devServer: {
  //   port: 8000,
  //   hot: true
  // }
}
