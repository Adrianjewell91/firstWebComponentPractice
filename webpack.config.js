path = require('path');

module.exports = {
  context: __dirname,
  entry: './scripts/entry.js',
  output: {
    path: path.resolve(__dirname, 'scripts'),
    filename: 'bundle.js'
  },
  // module: {
  //   loaders: [
  //     {
  //       exclude: /(node_modules)/,
  //       loader: 'babel-loader',
  //       query: {
  //         plugins: ['transform-runtime'],
  //         presets: ['env']
  //       }
  //     }
  //   ]
  // },
  watch: true,
  devtool: 'source-maps'
}
