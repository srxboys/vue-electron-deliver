
const isProd = process.env.VUE_APP_ENV === 'deploy';

module.exports = {
  publicPath: isProd ? '/vue-electron-deliver/' : '/',
  outputDir: isProd ? 'docs' : 'dist',
}