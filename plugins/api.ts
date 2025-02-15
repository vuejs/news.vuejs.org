import { createClient } from 'contentful'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const client = createClient({
    space: config.public.space,
    accessToken: config.public.accessToken,
    host: config.public.host
  })

  nuxtApp.provide('api', {
    async getIssues() {
      const data = await client.getEntries({
        content_type: 'issueNumber'
      })
      return data.items
    },
    async getPodcasts() {
      const data = await client.getEntries({
        content_type: 'podcast'
      })
      return data.items
    },
    async getIssueByNumber(issueNumber) {
      const data = await client.getEntries({
        content_type: 'issueNumber',
        'fields.issueNumber': issueNumber
      })
      return data.items[0]
    },
    async getAuthors() {
      const data = await client.getEntries({
        content_type: 'authors'
      })
      return data.items
    },
    async getTags() {
      const data = await client.getEntries({
        content_type: 'tag'
      })
      return data.items
    },
    async getStoriesByContent(query = '', tags = []) {
      let params = {
        content_type: 'stories',
        'query': query
      }
      if (tags.length) {
        params = {
          ...params,
          'fields.tags[exists]': true,
          'fields.tags.sys.id': tags.map(tag => tag.id).join(',')
        }
      }

      const data = await client.getEntries(params)

      return data.items
    }
  })
})
