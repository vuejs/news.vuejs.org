const { createClient } = require('contentful')
const apiConfig = require('./api/config')

module.exports = {
  modules: process.env.NODE_ENV !== 'production'
    ? ['@nuxtjs/dotenv', ['@nuxtjs/google-analytics', { id: 'UA-78373326-4' }]]
    : [['@nuxtjs/google-analytics', { id: 'UA-78373326-4' }]],
  env: {
    SPACE: process.env.SPACE,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    HOST: process.env.HOST
  },
  generate: {
    routes () {
      const client = createClient({
        space: apiConfig.space,
        accessToken: apiConfig.accessToken,
        host: apiConfig.host
      })

      return client.getEntries({
        content_type: apiConfig.contentTypes.issues
      }).then(data =>
        data.items.map(item => `/issues/${item.fields.issueNumber}/`)
      )
    }
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'news.vuejs.org',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Official Vue.js News' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Dosis:500|Source+Sans+Pro:400,600', media: 'screen' }
    ]
  },
  plugins: [
    '~/plugins/font-awesome'
  ],
  css: [
    '@fortawesome/fontawesome/styles.css'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
