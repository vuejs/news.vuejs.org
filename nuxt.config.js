const { createClient } = require('contentful')
const apiConfig = require('./api/config')

let modules = [
  ['@nuxtjs/google-analytics', { id: 'UA-78373326-4' }],
  '@nuxtjs/onesignal',
  '@nuxtjs/pwa'
]

if (process.env.NODE_ENV !== 'production') {
  modules.push('@nuxtjs/dotenv')
}

module.exports = {
  modules,
  env: {
    SPACE: process.env.SPACE,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    HOST: process.env.HOST
  },
  oneSignal: {
    init: {
      appId: 'ec6b9be4-7cba-4a9a-bab3-224696be93c8',
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
        disable: true
      }
    },
    cnd: true
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
