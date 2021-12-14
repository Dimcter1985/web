const withImages = require('next-images')
const path = require('path')

module.exports = withImages({
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
    prependData: '@import "mixins.scss"; @import "variables.scss"; @import "functions.scss";',
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: 'https://staging.snailzapp.com/uploads/:path*',
      },
    ]
  },
  webpack(config) {
    config.module.rules.unshift({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
})
