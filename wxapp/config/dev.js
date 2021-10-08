module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  defineConstants: {
  },
  mini: {},
  h5: {}
}

