module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/styles/index.scss";`,
      },
    },
  },
}
