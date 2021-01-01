import { flattenIssue } from './helpers/parsers'
import { createClient } from 'contentful'
import apiConfig from './api/config'

let modules = [
  ['@nuxtjs/google-analytics', { id: 'UA-78373326-4' }],
  // '@nuxtjs/onesignal',
  '@nuxtjs/pwa',
  '@nuxtjs/feed'
]

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
  modules.push('@nuxtjs/dotenv')
}

function getIssues () {
  const client = createClient({
    space: process.env.SPACE,
    accessToken: process.env.ACCESS_TOKEN,
    host: process.env.HOST,
    contentTypes: {
      issues: 'issueNumber',
      stories: 'stories',
      authors: 'authors',
      podcasts: 'podcast',
      tags: 'tag'
    }
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
      title: `#${issue.issueNumber} - ${issue.title}`,
      date: new Date(issue.publishedOn),
      id: issue.issueNumber,
      link: `https://news.vuejs.org/issues/${issue.issueNumber}`,
      description: issue.description,
      content: issue.description
    })
  })
}

module.exports = {
  modules,
  env: {
    SPACE: process.env.SPACE,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    HOST: process.env.HOST
  },
  // oneSignal: {
  //   init: {
  //     appId: 'ef270e2f-4469-4a50-965f-0ba7ea1d936f',
  //     allowLocalhostAsSecureOrigin: true,
  //     welcomeNotification: {
  //       disable: true
  //     }
  //   }
  // },
  manifest: {
    name: 'Official Vue.js News',
    short_name: 'Vue.js News',
    lang: 'en',
    display: 'standalone',
    background: '#fff',
    description: 'Official Vue.js News'
  },
  generate: {
    interval: 100,
    routes () {
      return getIssues().then(data =>
        data.items.map(item => `/issues/${item.fields.issueNumber}/`)
      )
    }
  },
  feed: [
    {
      path: '/feed.xml',
      create,
      cacheTime: 1000 * 60 * 10,
      type: 'rss2'
    }
  ],
  /*
  ** Headers of the page
  */
  head: {
    title: 'Vue.js News',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Read or listen the latest Vue.js news and discover resources.' },
      { property: 'og:title', content: 'Official Vue.js News' },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: 'https://news.vuejs.org' },
      { property: 'og:image', content: 'https://news.vuejs.org/logo.png' },
      { property: 'og:description', content: 'Read or listen the latest Vue.js news and discover resources.' },
      { 'name': 'twitter:card', content: 'summary' },
      { 'name': 'twitter:site', content: '@VueNewsletter' },
      { 'name': 'twitter:title', content: 'Official Vue.js News' },
      { 'name': 'twitter:description', content: 'Read or listen the latest Vue.js news and discover resources.' },
      { 'name': 'twitter:image', content: 'https://news.vuejs.org/logo.png' }

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Dosis:500|Source+Sans+Pro:400,600', media: 'screen' }
    ]
  },
  plugins: [
    '@/plugins/font-awesome'
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
