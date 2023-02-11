const path = require('path')

module.exports = {
  reactStrictMode: true,
  trailingSlash : true,
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'scss')],
  }
}
