var path = require('path');

module.exports = {
  entry: './src/app/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          'style-loader',
          'css-loader?sourceMap&-minimize',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.(woff2|woff|ttf|eot|svg|otf)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        include: path.resolve(__dirname, 'src'),
        loader: ["url-loader?name=fonts/[name].[hash].[ext]"]
      }
    ]
  },
  externals: {
    'react': 'commonjs react'
  }
};
