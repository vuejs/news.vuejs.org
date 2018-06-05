const { createClient } = require('contentful')
const apiConfig = require('./api/config')
const { flattenIssue } = require('./helpers/parsers')

function getIssues () {
  const client = createClient({
    space: apiConfig.space,
    accessToken: apiConfig.accessToken,
    host: apiConfig.host
  })

  return client.getEntries({
    content_type: apiConfig.contentTypes.issues
  })
}

const create = async feed => {
  feed.options = {
    title: 'Vue.js News',
    link: 'https://news.vuejs.org/feed.xml',
    description: 'The Official Vue.js News',
    image: 'http://news.vuejs.org/logo.png',
    favicon: 'http://news.vuejs.org/logo.png',
    author: {
      name: 'Damian Dulisz',
      email: 'damian@dulisz.com',
      link: 'https://twitter.com/damiandulisz'
    }
  }

  const { items } = await getIssues()

  items.map(flattenIssue).forEach(issue => {
    feed.addItem({
      title: issue.name,
      id: issue.issueNumber,
      link: `https://news.vuejs.org/issues/${issue.issueNumber}`,
      description: issue.description
    })
  })
}

let modules = [
  ['@nuxtjs/google-analytics', { id: 'UA-78373326-4' }],
  '@nuxtjs/onesignal',
  '@nuxtjs/pwa',
  '@nuxtjs/feed'
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
    }
  },
  manifest: {
    name: 'Official Vue.js News',
    short_name: 'Vue.js News',
    lang: 'en',
    display: 'standalone',
    background: '#fff',
    description: ''
  },
  generate: {
    routes () {
      return getIssues().then(data =>
        data.items.map(item => `/issues/${item.fields.issueNumber}/`)
      )
    }
  },
  feed: [
    {
      path: 'feed.xml',
      create,
      cacheTime: 1000 * 60 * 10,
      type: 'rss2'
    }
  ],
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
